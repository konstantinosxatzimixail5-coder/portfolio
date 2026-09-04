// Converts the images the site actually uses to AVIF + WebP at a fixed ladder of
// widths, and writes src/image-manifest.json with intrinsic dimensions so pages
// can set width/height and avoid layout shift.
//
// It reads two directories and no others. source-assets/cms/ is filled by
// `npm run sync` from the pictures published in Sanity. source-assets/local/
// holds the pictures this repository owns, referenced from src/content/. Both
// are in use by definition, so what gets built is exactly what some page
// references. The remaining folders under source-assets/ are pre-CMS masters,
// kept so Sanity is not the only copy of them, and building those too meant 54
// unused image sets in every deploy.
//
// This is the full pass, and the only one that deletes anything. It rebuilds the
// manifest from what is on disk, so run `npm run sync` first or it will drop the
// entries for pictures whose sources are not local.
//
// Run: npm run images

import { readdir, unlink, rmdir } from 'node:fs/promises';
import { join, extname, basename } from 'node:path';
import { INPUT, OUT, SRC, derive, entryFiles, localImages, writeManifest } from './lib/images.mjs';

// A CMS picture is named for its Sanity hash, and that hash is the manifest key
// every page looks itself up by. It is not derived from the path, so moving the
// directory cannot quietly rename every image. A local picture is the other way
// round: its path is its key, because there is no hash to name it after.
const fromCms = (await readdir(SRC).catch(() => []))
  .filter((name) => INPUT.has(extname(name).toLowerCase()))
  .map((name) => ({ file: join(SRC, name), key: `cms/${basename(name, extname(name))}` }));

const fromLocal = await localImages();
const files = [...fromCms, ...fromLocal];

if (files.length === 0) {
  console.log(`No images found in ${SRC}/ or source-assets/local/. Run \`npm run sync\` and try again.`);
  process.exit(0);
}

const manifest = {};
let written = 0;

for (const { file, key } of files) {
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

console.log(
  `${files.length} source images (${fromCms.length} from the CMS, ${fromLocal.length} local) ` +
    `-> ${written} files written, ${pruned} pruned`
);
console.log(`manifest: src/image-manifest.json (${Object.keys(manifest).length} entries)`);
