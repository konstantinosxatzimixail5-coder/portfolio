// Pulls every image the CMS actually uses down into source-assets/cms/, so the
// existing sharp pipeline can turn it into AVIF and WebP and the site can serve
// its own files.
//
// Serving straight off the Sanity CDN would be less work. It would also put
// every image on a metered third-party domain with a bandwidth ceiling that
// bites exactly when the site starts getting traffic. This costs one build step
// and removes that ceiling.
//
// Run: npm run sync   (then npm run images)

import { mkdir, writeFile, readdir, unlink, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { client, projectId, dataset } from './sanity-env.mjs';

const OUT = 'source-assets/cms';

// Every type that can hold a picture. A type missing from this list means its
// images are never downloaded and the build fails on a missing manifest key,
// which is loud, so this is the one line to check when that happens.
const TYPES = ['siteSettings', 'homePage', 'reelPage', 'specPage', 'work', 'pipeline', 'specBrand'];

// Walk the whole document tree looking for asset references. Doing it in
// JavaScript rather than in the query means a new image field anywhere in the
// schema is picked up without editing this file.
function collectAssetIds(node, found = new Set()) {
  if (Array.isArray(node)) {
    for (const item of node) collectAssetIds(item, found);
    return found;
  }
  if (node && typeof node === 'object') {
    for (const [key, value] of Object.entries(node)) {
      if (key === '_ref' && typeof value === 'string' && value.startsWith('image-')) {
        found.add(value);
      } else {
        collectAssetIds(value, found);
      }
    }
  }
  return found;
}

// image-8f3a1c9e...-1920x1080-jpg
//        hash        dimensions  ext
function parseAssetId(id) {
  const m = /^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/.exec(id);
  if (!m) return null;
  const [, hash, dims, ext] = m;
  return {
    hash,
    ext,
    // The originals live on the CDN under hash-dimensions.extension.
    url: `https://cdn.sanity.io/images/${projectId}/${dataset}/${hash}-${dims}.${ext}`,
    file: join(OUT, `${hash}.${ext}`),
  };
}

const sanity = client();

const docs = await sanity.fetch(`*[_type in $types]`, { types: TYPES });
const assetIds = [...collectAssetIds(docs)];

if (assetIds.length === 0) {
  console.log('No images referenced by any document yet. Nothing to pull down.');
  process.exit(0);
}

await mkdir(OUT, { recursive: true });

let downloaded = 0;
let cached = 0;
const keep = new Set();
const failed = [];

for (const id of assetIds) {
  const asset = parseAssetId(id);
  if (!asset) {
    failed.push(`${id} (unreadable asset id)`);
    continue;
  }
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

  const res = await fetch(asset.url);
  if (!res.ok) {
    failed.push(`${id} (${res.status} ${res.statusText})`);
    continue;
  }
  await writeFile(asset.file, Buffer.from(await res.arrayBuffer()));
  downloaded++;
  console.log(`  pulled  ${asset.hash}.${asset.ext}`);
}

// Drop anything left over from an image that has since been deleted or replaced
// in the Studio. Without this the manifest keeps growing and the deploy carries
// pictures no page has referenced for months.
let pruned = 0;
for (const name of await readdir(OUT).catch(() => [])) {
  if (!keep.has(name)) {
    await unlink(join(OUT, name));
    pruned++;
    console.log(`  pruned  ${name}`);
  }
}

console.log(
  `\n${assetIds.length} images in use: ${downloaded} pulled, ${cached} already local, ${pruned} pruned.`
);

if (failed.length) {
  console.error(`\n${failed.length} failed:`);
  for (const f of failed) console.error(`  ${f}`);
  process.exit(1);
}

console.log('Now run `npm run images` to build the AVIF and WebP versions.');
