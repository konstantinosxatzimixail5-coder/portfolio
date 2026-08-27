// Pulls every image the CMS actually uses down into source-assets/cms/, so the
// existing sharp pipeline can turn it into AVIF and WebP and the site can serve
// its own files.
//
// Serving straight off the Sanity CDN would be less work. It would also put
// every image on a metered third-party domain with a bandwidth ceiling that
// bites exactly when the site starts getting traffic. This costs one build step
// and removes that ceiling.
//
// This is the full pass: it downloads everything and deletes what the CMS no
// longer references. The build does not run it. `npm run top-up` runs there
// instead, and only fetches what is missing.
//
// Run: npm run sync   (then npm run images)

import { readdir, unlink, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { client } from './sanity-env.mjs';
import { SRC, download, usedAssets } from './lib/images.mjs';

const { assets, unreadable } = await usedAssets(client());

if (assets.length === 0 && unreadable.length === 0) {
  console.log('No images referenced by any document yet. Nothing to pull down.');
  process.exit(0);
}

let downloaded = 0;
let cached = 0;
const keep = new Set();
const failed = unreadable.map((id) => `${id} (unreadable asset id)`);

for (const asset of assets) {
  keep.add(`${asset.hash}.${asset.ext}`);

  // The hash in the id is a digest of the file itself, so a file already on disk
  // under that name is byte for byte the file the CMS is pointing at. Nothing to
  // re-check and nothing to invalidate.
  try {
    await stat(asset.file);
    cached++;
    continue;
  } catch {
    // not cached, fall through and fetch it
  }

  try {
    await download(asset);
    downloaded++;
    console.log(`  pulled  ${asset.hash}.${asset.ext}`);
  } catch (err) {
    failed.push(`${asset.key} (${err.message})`);
  }
}

// Drop anything left over from an image that has since been deleted or replaced
// in the Studio. Without this the manifest keeps growing and the deploy carries
// pictures no page has referenced for months.
let pruned = 0;
for (const name of await readdir(SRC).catch(() => [])) {
  if (!keep.has(name)) {
    await unlink(join(SRC, name));
    pruned++;
    console.log(`  pruned  ${name}`);
  }
}

console.log(
  `\n${assets.length} images in use: ${downloaded} pulled, ${cached} already local, ${pruned} pruned.`
);

if (failed.length) {
  console.error(`\n${failed.length} failed:`);
  for (const f of failed) console.error(`  ${f}`);
  process.exit(1);
}

console.log('Now run `npm run images` to build the AVIF and WebP versions.');
