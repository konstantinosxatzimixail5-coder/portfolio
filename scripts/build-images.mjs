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
// Run: npm run images

import { readdir, mkdir, writeFile, stat, unlink, rmdir } from 'node:fs/promises';
import { join, relative, extname, dirname } from 'node:path';
import sharp from 'sharp';

// Keys are relative to SRC, not to WALK, so a picture keeps the key cms/<hash>
// that sanity.ts builds from the asset id. Narrowing the walk must not quietly
// rename every image.
const SRC = 'source-assets';
const WALK = 'source-assets/cms';
const OUT = 'public/img';
const MANIFEST = 'src/image-manifest.json';
const WIDTHS = [480, 960, 1600];
const INPUT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tif', '.tiff']);

async function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (INPUT.has(extname(e.name).toLowerCase())) out.push(p);
  }
  return out;
}

const slug = (s) =>
  s
    .toLowerCase()
    .replace(extname(s).toLowerCase(), '')
    .replace(/[^a-z0-9/]+/g, '-')
    .replace(/^-|-$/g, '')
    .replace(/-+/g, '-');

const files = await walk(WALK);
if (files.length === 0) {
  console.log(`No images found in ${WALK}/. Run \`npm run sync\` and try again.`);
  process.exit(0);
}

const manifest = {};
let written = 0;

for (const file of files) {
  const rel = relative(SRC, file);
  const key = slug(rel);
  const outPath = join(OUT, key);
  await mkdir(dirname(outPath), { recursive: true });

  const image = sharp(file, { failOn: 'none' });
  const meta = await image.metadata();
  const srcW = meta.width ?? 0;
  const srcH = meta.height ?? 0;
  if (!srcW || !srcH) {
    console.warn(`skip (no dimensions): ${rel}`);
    continue;
  }

  const widths = WIDTHS.filter((w) => w <= srcW);
  if (widths.length === 0) widths.push(srcW);

  const sources = { avif: [], webp: [] };

  for (const w of widths) {
    for (const fmt of ['avif', 'webp']) {
      const dest = `${outPath}-${w}.${fmt}`;
      let skip = false;
      try {
        const [a, b] = await Promise.all([stat(dest), stat(file)]);
        skip = a.mtimeMs > b.mtimeMs;
      } catch {
        skip = false;
      }
      if (!skip) {
        const pipe = sharp(file, { failOn: 'none' }).resize({ width: w, withoutEnlargement: true });
        if (fmt === 'avif') await pipe.avif({ quality: 58, effort: 6 }).toFile(dest);
        else await pipe.webp({ quality: 78 }).toFile(dest);
        written++;
      }
      sources[fmt].push({ w, src: `/img/${key}-${w}.${fmt}` });
    }
  }

  const widest = widths[widths.length - 1];
  manifest[key] = {
    key,
    width: widest,
    height: Math.round((srcH / srcW) * widest),
    aspect: +(srcW / srcH).toFixed(4),
    avif: sources.avif,
    webp: sources.webp,
    fallback: sources.webp[sources.webp.length - 1].src,
  };
}

await mkdir(dirname(MANIFEST), { recursive: true });
await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');

// Delete derivatives whose source has gone. This script used to only ever add
// files, so deleting a source left its AVIF and WebP behind to be deployed
// forever: 321 KB of pictures no page referenced had built up before anyone
// noticed. Only files this script could have written are touched, matched on
// the -<width>.<format> suffix it names them with.
const wanted = new Set();
for (const entry of Object.values(manifest)) {
  for (const s of [...entry.avif, ...entry.webp]) wanted.add(join('public', s.src.slice(1)));
}

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
console.log(`manifest: ${MANIFEST} (${Object.keys(manifest).length} entries)`);
