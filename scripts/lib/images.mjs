// The parts of the image pipeline that more than one script needs: finding out
// which pictures the CMS actually uses, and turning one of them into the AVIF
// and WebP files a page serves.
//
// Three scripts use this. `sync` and `images` are the full local pass, run by
// `npm run content`. `top-up` is the incremental pass that runs before every
// build, including on the deploy host.

import { mkdir, writeFile, readFile, stat } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import sharp from 'sharp';
import { projectId, dataset } from '../sanity-env.mjs';

export const SRC = 'source-assets/cms';
export const OUT = 'public/img';
export const MANIFEST = 'src/image-manifest.json';
export const WIDTHS = [480, 960, 1600];

// Every type that can hold a picture. A type missing from this list means its
// images are never downloaded and the build fails on a missing manifest key,
// which is loud, so this is the one line to check when that happens.
export const TYPES = [
  'siteSettings',
  'homePage',
  'reelPage',
  'specPage',
  'work',
  'pipeline',
  'specBrand',
];

// Walk the whole document tree looking for asset references. Doing it in
// JavaScript rather than in the query means a new image field anywhere in the
// schema is picked up without editing this file.
export function collectAssetIds(node, found = new Set()) {
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
export function parseAssetId(id) {
  const m = /^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/.exec(id);
  if (!m) return null;
  const [, hash, dims, ext] = m;
  return {
    hash,
    ext,
    key: `cms/${hash}`,
    // The originals live on the CDN under hash-dimensions.extension.
    url: `https://cdn.sanity.io/images/${projectId}/${dataset}/${hash}-${dims}.${ext}`,
    file: join(SRC, `${hash}.${ext}`),
  };
}

export async function usedAssets(sanity) {
  const docs = await sanity.fetch(`*[_type in $types]`, { types: TYPES });
  const ids = [...collectAssetIds(docs)];
  const assets = [];
  const unreadable = [];
  for (const id of ids) {
    const asset = parseAssetId(id);
    if (asset) assets.push(asset);
    else unreadable.push(id);
  }
  return { assets, unreadable };
}

export async function readManifest() {
  try {
    return JSON.parse(await readFile(MANIFEST, 'utf8'));
  } catch {
    return {};
  }
}

export async function writeManifest(manifest) {
  await mkdir(dirname(MANIFEST), { recursive: true });
  // Sorted, so two runs over the same dataset produce the same file and a
  // manifest diff shows the picture that changed instead of a reshuffle.
  const sorted = Object.fromEntries(Object.keys(manifest).sort().map((k) => [k, manifest[k]]));
  await writeFile(MANIFEST, JSON.stringify(sorted, null, 2) + '\n');
}

export function entryFiles(entry) {
  return [...entry.avif, ...entry.webp].map((s) => join('public', s.src.slice(1)));
}

const exists = (p) => stat(p).then(() => true, () => false);

// Is this picture already built and on disk? The manifest alone is not enough,
// because the entry can survive a file that was never committed.
export async function isBuilt(manifest, key) {
  const entry = manifest[key];
  if (!entry) return false;
  const checks = await Promise.all(entryFiles(entry).map(exists));
  return checks.every(Boolean);
}

// Turn one source file into the ladder of AVIF and WebP files, and return its
// manifest entry. Returns null for a file sharp cannot read dimensions from.
export async function derive(file, key) {
  const outPath = join(OUT, key);
  await mkdir(dirname(outPath), { recursive: true });

  const meta = await sharp(file, { failOn: 'none' }).metadata();
  const srcW = meta.width ?? 0;
  const srcH = meta.height ?? 0;
  if (!srcW || !srcH) return null;

  const widths = WIDTHS.filter((w) => w <= srcW);
  if (widths.length === 0) widths.push(srcW);

  const sources = { avif: [], webp: [] };
  let written = 0;

  for (const w of widths) {
    for (const fmt of ['avif', 'webp']) {
      const dest = `${outPath}-${w}.${fmt}`;
      // A file already at this path is the right file. These names carry the
      // Sanity hash, which is a digest of the source, so a derivative cannot go
      // stale: replacing the picture in the Studio produces a new hash and a new
      // name. This is what keeps a deploy from re-encoding sixty-four images to
      // publish a one-word change.
      if (!(await exists(dest))) {
        const pipe = sharp(file, { failOn: 'none' }).resize({ width: w, withoutEnlargement: true });
        if (fmt === 'avif') await pipe.avif({ quality: 58, effort: 6 }).toFile(dest);
        else await pipe.webp({ quality: 78 }).toFile(dest);
        written++;
      }
      sources[fmt].push({ w, src: `/img/${key}-${w}.${fmt}` });
    }
  }

  const widest = widths[widths.length - 1];
  return {
    entry: {
      key,
      width: widest,
      height: Math.round((srcH / srcW) * widest),
      aspect: +(srcW / srcH).toFixed(4),
      avif: sources.avif,
      webp: sources.webp,
      fallback: sources.webp[sources.webp.length - 1].src,
    },
    written,
  };
}

export async function download(asset) {
  await mkdir(SRC, { recursive: true });
  const res = await fetch(asset.url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  await writeFile(asset.file, Buffer.from(await res.arrayBuffer()));
}
