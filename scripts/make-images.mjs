// Builds the site's photos from the originals in source-images/.
//
//   node scripts/make-images.mjs
//
// Outputs (in public/images/) are named after their source photo, so swapping a
// photo always changes the URL and no browser or Next.js image cache serves the old one:
//   hero-<source>.jpg  — hero portrait. The original has a near-black studio backdrop;
//                        blending it onto the site's ink colour with "lighten" turns the
//                        backdrop into exactly --ink (#16130F) while leaving the figure
//                        untouched, so the photo has no visible edge on the dark hero.
//   about-<source>.jpg — About section portrait (colour).
//   bw-<source>.jpg    — black-and-white portrait, "Beyond the Courtroom".
//   quote-<source>.jpg — photo beside the quote (maroon band), 4:5 crop.
//   og.jpg             — 1200×630 social share card (name + hero crop).
// After running, copy the printed paths and sizes into src/content/site.ts.
import { readdirSync, rmSync } from 'node:fs';
import { basename } from 'node:path';
import sharp from 'sharp';

const SRC = {
  hero: 'source-images/portrait-seated.jpg', // client's 3.jpeg
  about: 'source-images/portrait-headshot-left.jpg', // client's 1.jpeg
  quote: 'source-images/portrait-hands-on-hips.jpg', // client's 5.jpeg
  beyond: 'source-images/portrait-seated-side.jpg', // client's 6.jpeg (black and white)
};
const out = (prefix, src) => `public/images/${prefix}-${basename(src, '.jpg')}.jpg`;
const OUT = {
  hero: out('hero', SRC.hero),
  about: out('about', SRC.about),
  beyond: out('bw', SRC.beyond),
  quote: out('quote', SRC.quote),
};

// Remove outputs from earlier runs.
for (const f of readdirSync('public/images')) {
  if (/^(hero|about|bw|beyond|quote)-.*\.jpg$/.test(f)) rmSync(`public/images/${f}`);
}
const INK = { r: 22, g: 19, b: 15 };
const jpeg = { quality: 86, mozjpeg: true };

async function blendOntoInk(src, width) {
  const base = await sharp(src).rotate().resize({ width }).toBuffer();
  const { width: w, height: h } = await sharp(base).metadata();
  const ink = await sharp({ create: { width: w, height: h, channels: 3, background: INK } }).png().toBuffer();
  return sharp(ink).composite([{ input: base, blend: 'lighten' }]).jpeg(jpeg).toBuffer();
}

// Hero
const hero = await blendOntoInk(SRC.hero, 1400);
await sharp(hero).toFile(OUT.hero);

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

// About portrait (colour)
await sharp(SRC.about).rotate().resize({ width: 1200 }).jpeg(jpeg).toFile(OUT.about);

// Black-and-white portrait
await sharp(SRC.beyond).rotate().resize({ width: 1200 }).grayscale().linear(1.08, -6).jpeg(jpeg).toFile(OUT.beyond);

// Quote section photo, cropped to 4:5
await sharp(SRC.quote).rotate().resize({ width: 800, height: 1000, fit: 'cover', position: 'centre' }).jpeg(jpeg).toFile(OUT.quote);

for (const f of [OUT.hero, OUT.about, OUT.beyond, OUT.quote, 'public/images/og.jpg']) {
  const m = await sharp(f).metadata();
  console.log(`${f.replace('public', '')}  ${m.width} x ${m.height}`);
}
