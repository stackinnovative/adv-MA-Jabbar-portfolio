/**
 * Imports the local content (src/content/site.ts) and photos into Sanity.
 *
 *   npm run seed              creates documents that don't exist yet (safe to re-run)
 *   npm run seed -- --replace overwrites all four documents with the local content
 *
 * Runs through `sanity exec --with-user-token`, so it uses your `sanity login`.
 */
import { createReadStream } from 'node:fs';
import { basename, join } from 'node:path';
import { getCliClient } from 'sanity/cli';
import { siteContent } from '../src/content/site';
import type { ImageRef } from '../src/lib/types';

const client = getCliClient({ apiVersion: '2025-10-01' });
const replace = process.argv.includes('--replace');

const uploaded = new Map<string, string>();
async function uploadImage(publicPath: string): Promise<string> {
  const cached = uploaded.get(publicPath);
  if (cached) return cached;
  const file = join(process.cwd(), 'public', publicPath);
  const asset = await client.assets.upload('image', createReadStream(file), { filename: basename(file) });
  console.log(`  uploaded ${publicPath}`);
  uploaded.set(publicPath, asset._id);
  return asset._id;
}

const imageRef = (assetId: string) => ({ _type: 'image', asset: { _type: 'reference', _ref: assetId } });

async function image(img: ImageRef) {
  return { ...imageRef(await uploadImage(img.src)), alt: img.alt, position: img.position };
}

/** Array of objects -> Sanity array members with _type and stable _key. */
const members = <T extends object>(type: string, items: T[]) =>
  items.map((item, i) => ({ _type: type, _key: `${type}-${i}`, ...item }));

async function main() {
  const { settings, home, disclaimer, privacy } = siteContent;
  console.log(`Seeding project ${client.config().projectId} / ${client.config().dataset}${replace ? ' (replace)' : ''}`);

  const docs: { _id: string; _type: string; [field: string]: unknown }[] = [
    {
      _id: 'siteSettings',
      _type: 'siteSettings',
      ...settings,
      seo: { ...settings.seo, ogImage: imageRef(await uploadImage(settings.seo.ogImage)) },
      offices: members('office', settings.offices),
      mapEmbedUrl: settings.mapEmbedUrl || undefined,
      formEndpoint: settings.formEndpoint || undefined,
    },
    {
      _id: 'homePage',
      _type: 'homePage',
      hero: { ...home.hero, image: await image(home.hero.image), highlights: members('highlight', home.hero.highlights) },
      about: {
        ...home.about,
        portrait: await image(home.about.portrait),
        facts: members('fact', home.about.facts),
        roles: {
          ...home.about.roles,
          items: members(
            'role',
            home.about.roles.items.map((r) => ({ ...r, facts: members('fact', r.facts) })),
          ),
        },
      },
      quote: { ...home.quote, image: await image(home.quote.image) },
      practice: { ...home.practice, areas: members('area', home.practice.areas) },
      panels: home.panels,
      process: { ...home.process, steps: members('step', home.process.steps) },
      beyond: { ...home.beyond, image: await image(home.beyond.image), timeline: members('entry', home.beyond.timeline) },
      contact: home.contact,
    },
    { _id: 'disclaimer', _type: 'disclaimer', ...disclaimer },
    { _id: 'privacyPage', _type: 'privacyPage', ...privacy },
  ];

  const tx = client.transaction();
  for (const doc of docs) (replace ? tx.createOrReplace(doc) : tx.createIfNotExists(doc));
  await tx.commit();
  console.log(`Done: ${docs.map((d) => d._id).join(', ')}${replace ? '' : ' (existing documents left unchanged)'}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
