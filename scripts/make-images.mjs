// Builds the site's photos from the originals in source-images/.
//
//   node scripts/make-images.mjs
//
// Photos are never cropped: each output keeps the original's proportions, and the
// site sizes every photo box from the image's own width/height, so nothing is cut
// off on any screen.
//
// Outputs go to public/images/ as <prefix>-<source>-<hash>.jpg. The hash comes from
// the file contents, so any change gets a new URL and no browser or Next.js image
// cache can keep serving an old version.
//   hero-…   hero portrait. The original has a near-black studio backdrop; blending it
//            onto the site's ink colour with "lighten" turns the backdrop into exactly
//            --ink (#16130F) while leaving the figure untouched, so the photo has no
//            visible edge on the dark hero.
//   about-…  About section portrait (colour).
//   quote-…  photo beside the first quote (maroon band, after About), colour.
//   quote2-… photo beside the second quote (maroon band, after Areas of Practice), colour.
//   bw-…     black-and-white portrait, "Public service & social engagement".
//   og.jpg   1200×630 social share card (name + hero crop) — the one crop, by design.
// After running, copy the printed paths and sizes into src/content/site.ts.
import { createHash } from 'node:crypto';
import { readdirSync, rmSync, writeFileSync } from 'node:fs';
import { basename } from 'node:path';
import sharp from 'sharp';

const SRC = {
  hero: 'source-images/portrait-seated-side.jpg', // client's 6.jpeg
  about: 'source-images/portrait-headshot-left.jpg', // client's 1.jpeg
  quote: 'source-images/portrait-hands-on-hips.jpg', // client's 5.jpeg
  bw: 'source-images/portrait-seated.jpg', // client's 3.jpeg (black and white)
  quote2: 'source-images/portrait-headshot-front.jpg', // client's 2.jpeg
};
const INK = { r: 22, g: 19, b: 15 };
const jpeg = { quality: 86, mozjpeg: true };

// Remove outputs from earlier runs.
for (const f of readdirSync('public/images')) {
  if (/^(hero|about|bw|beyond|quote|quote2)-.*\.jpg$/.test(f)) rmSync(`public/images/${f}`);
}

async function save(prefix, src, buffer) {
  const hash = createHash('sha1').update(buffer).digest('hex').slice(0, 8);
  const path = `/images/${prefix}-${basename(src, '.jpg')}-${hash}.jpg`;
  writeFileSync(`public${path}`, buffer);
  const { width, height } = await sharp(buffer).metadata();
  console.log(`${prefix.padEnd(6)} ${path}  ${width} x ${height}`);
  return buffer;
}

async function blendOntoInk(src, width) {
  // linear(): darken the darkest tones a little (and lift highlights to compensate) so
  // the whole studio backdrop — including bluish patches up to ~rgb(17,17,25) — falls
  // below the ink colour and vanishes in the blend, instead of showing as a faint box.
  // Never mirror portraits — flipping changes how a face looks.
  const base = await sharp(src).rotate().resize({ width }).linear(1.07, -17).toBuffer();
  const { width: w, height: h } = await sharp(base).metadata();
  const ink = await sharp({ create: { width: w, height: h, channels: 3, background: INK } }).png().toBuffer();
  return sharp(ink).composite([{ input: base, blend: 'lighten' }]).jpeg(jpeg).toBuffer();
}

const hero = await save('hero', SRC.hero, await blendOntoInk(SRC.hero, 1400));
await save('about', SRC.about, await sharp(SRC.about).rotate().resize({ width: 1200 }).jpeg(jpeg).toBuffer());
await save('quote', SRC.quote, await sharp(SRC.quote).rotate().resize({ width: 1000 }).jpeg(jpeg).toBuffer());
await save('quote2', SRC.quote2, await sharp(SRC.quote2).rotate().resize({ width: 1000 }).jpeg(jpeg).toBuffer());
await save('bw', SRC.bw, await sharp(SRC.bw).rotate().resize({ width: 1200 }).grayscale().linear(1.08, -6).jpeg(jpeg).toBuffer());

// Share card
const card = Buffer.from(`<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='630'>
<rect width='1200' height='630' fill='#16130F'/>
<line x1='70' y1='214' x2='110' y2='214' stroke='#C9A24A' stroke-width='2'/>
<text x='124' y='220' font-family='Georgia, serif' font-size='18' letter-spacing='4' fill='#C9A24A'>HIGH COURT OF KERALA</text>
<text x='70' y='326' font-family='Georgia, serif' font-size='60' fill='#F6F1E6'>Adv. M.A. Jabbar</text>
<text x='70' y='416' font-family='Georgia, serif' font-size='21' letter-spacing='3' fill='#CFC5B3'>ADVOCATE · MEDIATOR · ARBITRATOR</text>
<rect y='600' width='1200' height='2' fill='#B08A3E'/><rect y='606' width='1200' height='6' fill='#B08A3E'/><rect y='616' width='1200' height='2' fill='#B08A3E'/>
</svg>`);
const photo = await sharp(hero).resize({ width: 600, height: 596, fit: 'cover', position: 'north' }).toBuffer();
await sharp(card).composite([{ input: photo, left: 600, top: 0 }]).jpeg(jpeg).toFile('public/images/og.jpg');
console.log('og     /images/og.jpg  1200 x 630');
