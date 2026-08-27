// Converts the images the site actually uses to AVIF + WebP at a fixed ladder of
// widths, and writes src/image-manifest.json with intrinsic dimensions so pages
// can set width/height and avoid layout shift.
//
// It reads source-assets/cms/ and nothing else. That directory is filled by
// `npm run sync` from the pictures published in Sanity, so what gets built is
// exactly what some page references. The other folders under source-assets/ are
// the original masters, kept in the repository so Sanity is not the only copy of
// them. Building those too meant 54 unused image sets in every deploy.
//
// This is the full pass, and the only one that deletes anything. It rebuilds the
// manifest from what is on disk, so run `npm run sync` first or it will drop the
// entries for pictures whose sources are not local.
//
// Run: npm run images

import { readdir, unlink, rmdir } from 'node:fs/promises';
import { join, extname, basename } from 'node:path';
import { OUT, SRC, derive, entryFiles, writeManifest } from './lib/images.mjs';

const INPUT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tif', '.tiff']);

const files = (await readdir(SRC).catch(() => []))
  .filter((name) => INPUT.has(extname(name).toLowerCase()))
  .map((name) => join(SRC, name));

if (files.length === 0) {
  console.log(`No images found in ${SRC}/. Run \`npm run sync\` and try again.`);
  process.exit(0);
}

const manifest = {};
let written = 0;

for (const file of files) {
  // The file is named for the Sanity hash, and that hash is the manifest key
  // every page looks itself up by. It is not derived from the path, so moving
  // this directory cannot quietly rename every image.
  const key = `cms/${basename(file, extname(file))}`;
  const result = await derive(file, key);
  if (!result) {
    console.warn(`skip (no dimensions): ${file}`);
    continue;
  }
  manifest[key] = result.entry;
  written += result.written;
}

await writeManifest(manifest);

// Delete derivatives whose source has gone. This script used to only ever add
// files, so deleting a source left its AVIF and WebP behind to be deployed
// forever: 321 KB of pictures no page referenced had built up before anyone
// noticed. Only files this script could have written are touched, matched on
// the -<width>.<format> suffix it names them with.
const wanted = new Set(Object.values(manifest).flatMap(entryFiles));

async function prune(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return 0;
  }
  let removed = 0;
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      removed += await prune(p);
      await rmdir(p).catch(() => {}); // only succeeds once the directory is empty
    } else if (/-\d+\.(avif|webp)$/.test(e.name) && !wanted.has(p)) {
      await unlink(p);
      removed++;
      console.log(`  pruned ${p}`);
    }
  }
  return removed;
}

const pruned = await prune(OUT);

console.log(`${files.length} source images -> ${written} files written, ${pruned} pruned`);
console.log(`manifest: src/image-manifest.json (${Object.keys(manifest).length} entries)`);
