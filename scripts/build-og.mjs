// Builds public/og.jpg, the picture every link preview shows.
//
// Run by hand, not by the build. It renders text, which means it needs Redaction
// and Recursive installed as system fonts, and a deploy host has neither. The
// output is committed instead, which is the right trade for a file that changes
// when the role line changes and at no other time.
//
// To run it: install public/fonts/*.woff2 as system fonts (convert with
// fonttools, `font.flavor = None`), then `node scripts/build-og.mjs`.

import sharp from 'sharp';

const W = 1200;
const H = 630;
const PLATE = 'site/capture-crossing'; // the frame with the most going on at small sizes
const SOURCE = 'source-assets/site/capture-crossing.jpg';

const INK = '#131820';
const NEWSPRINT = '#e5e2d8';
const RED = '#e8455e';
const CYAN = '#35c4e0';
const FAINT = '#828e9d';

// The picture takes the right of the frame and fades into the ground rather than
// stopping at an edge, so the card reads as one object at thumbnail size.
const PHOTO_W = 560;

// The crop is stated rather than found. Both of sharp's automatic strategies
// put the walking figure half off the right edge, because the brightest and the
// busiest part of this frame is the reflected light on the road rather than the
// person standing in it. 683 by 768 is the same 0.889 the card needs, so this
// takes the region and the resize does no second crop of its own.
const photo = await sharp(SOURCE)
  .extract({ left: 474, top: 0, width: 683, height: 768 })
  .resize({ width: PHOTO_W, height: H })
  .modulate({ saturation: 0.72, brightness: 0.82 })
  .toBuffer();

const fade = Buffer.from(`
<svg width="${PHOTO_W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="f" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="${INK}" stop-opacity="1"/>
      <stop offset="42%"  stop-color="${INK}" stop-opacity="0.42"/>
      <stop offset="100%" stop-color="${INK}" stop-opacity="0.08"/>
    </linearGradient>
  </defs>
  <rect width="${PHOTO_W}" height="${H}" fill="url(#f)"/>
</svg>`);

const type = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .display { font-family: 'Redaction'; fill: ${NEWSPRINT}; }
    .mono {
      font-family: 'Recursive Sans Linear Light';
      font-variation-settings: 'MONO' 1, 'CASL' 0;
      letter-spacing: 2.4px;
      text-transform: uppercase;
    }
  </style>

  <!-- monogram -->
  <text class="display" x="72" y="104" font-size="44">K<tspan fill="${RED}">/</tspan>C</text>

  <!-- name -->
  <text class="display" x="72" y="300" font-size="66">Konstantinos</text>
  <text class="display" x="72" y="372" font-size="66">Chatzimichail</text>

  <!-- role -->
  <text class="mono" x="72" y="432" font-size="17" fill="${CYAN}">AI-ENABLED MARKETING DESIGNER</text>
  <text class="mono" x="72" y="460" font-size="17" fill="${CYAN}">CREATIVE PRODUCER</text>
  <text class="mono" x="72" y="488" font-size="17" fill="${CYAN}">CONTENT AND GROWTH STRATEGIST</text>

  <!-- rule and base -->
  <rect x="72" y="530" width="64" height="2" fill="${RED}"/>
  <text class="mono" x="72" y="568" font-size="15" fill="${FAINT}">BASED IN GREECE, WORKING INTERNATIONALLY</text>
</svg>`);

await sharp({ create: { width: W, height: H, channels: 3, background: INK } })
  .composite([
    { input: photo, left: W - PHOTO_W, top: 0 },
    { input: fade, left: W - PHOTO_W, top: 0 },
    { input: type, left: 0, top: 0 },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile('public/og.jpg');

const { size } = await sharp('public/og.jpg').metadata().then(async (m) => ({
  size: m.size,
}));

console.log(`public/og.jpg written, ${W}x${H}, ${Math.round((size ?? 0) / 1024)}KB (plate: ${PLATE})`);
