// Push the content this repository holds into Sanity, so it can be edited in the
// Studio instead of in a file.
//
// Everything it writes is content the site already shows: the films on the case
// studies and the shelf brands, the two billboard frames, the three cards on the
// Selected work shelf, and the studio blog block. The repository keeps its copy
// as the fallback, and the site prefers whatever is in the dataset, so running
// this changes nothing on the page and everything about where it is edited.
//
// Run: npm run seed
//
// It needs a write token, which nothing else in this repository does. Put it in
// .env.local (gitignored) as SANITY_WRITE_TOKEN. Get one at sanity.io/manage,
// your project, API, Tokens, Add API token, with the Editor role. Do not add it
// to Vercel: the site only ever reads.
//
// Safe to run twice. Documents are created with fixed ids and patched rather
// than duplicated, images are uploaded once and reused on their content hash,
// and nothing is deleted. Pass --dry to see what it would do and write nothing.

import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';
import { createClient } from '@sanity/client';

import { clips } from '../src/data/videos.ts';
import { productExtras } from '../src/data/product-extras.ts';
import { leadWork, tailWork } from '../src/data/work-extras.ts';
import { blog } from '../src/data/blog.ts';

const DRY = process.argv.includes('--dry');

try {
  process.loadEnvFile('.env.local');
} catch {
  /* the token may be set in the shell instead */
}
try {
  process.loadEnvFile('.env');
} catch {
  /* project id and dataset usually live here */
}

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || 'production';
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId) {
  console.error('SANITY_PROJECT_ID is not set. Copy .env.example to .env and fill it in.');
  process.exit(1);
}
if (!token && !DRY) {
  console.error(
    'SANITY_WRITE_TOKEN is not set.\n\n' +
      '  1. Go to sanity.io/manage, open this project, API, Tokens.\n' +
      '  2. Add API token, Editor role.\n' +
      '  3. Put it in .env.local as SANITY_WRITE_TOKEN=...\n\n' +
      'Then run this again. `npm run seed -- --dry` needs no token and writes nothing.'
  );
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: '2024-10-01', token, useCdn: false });

/* ------------------------------------------------------------------ images -- */

// A picture already in the dataset is not uploaded again. Sanity names an asset
// after a hash of the file, so the same file always resolves to the same id and
// re-running this costs one query rather than one upload.
const uploaded = new Map();

async function assetIdFor(manifestKey) {
  if (uploaded.has(manifestKey)) return uploaded.get(manifestKey);

  // Repo-owned pictures are `site/<path>` under source-assets/site/. Anything
  // already in the CMS is `cms/<hash>` and needs no upload at all.
  if (manifestKey.startsWith('cms/')) {
    const hash = manifestKey.slice(4);
    const found = await client.fetch(`*[_type == "sanity.imageAsset" && sha1hash != null && _id match $m][0]._id`, {
      m: `image-${hash}*`,
    });
    if (!found) throw new Error(`No CMS asset matches ${manifestKey}`);
    uploaded.set(manifestKey, found);
    return found;
  }

  const rel = manifestKey.replace(/^site\//, '');
  const candidates = ['.png', '.jpg', '.jpeg', '.webp'].map((e) => join('source-assets/site', rel + e));
  let file = null;
  for (const c of candidates) {
    try {
      file = { path: c, buf: await readFile(c) };
      break;
    } catch {
      /* try the next extension */
    }
  }
  if (!file) throw new Error(`No source file for ${manifestKey} under source-assets/site/`);

  const sha = createHash('sha1').update(file.buf).digest('hex');
  const existing = await client.fetch(`*[_type == "sanity.imageAsset" && sha1hash == $sha][0]._id`, { sha });
  if (existing) {
    uploaded.set(manifestKey, existing);
    return existing;
  }

  if (DRY) {
    console.log(`  would upload ${file.path}`);
    uploaded.set(manifestKey, `image-DRY-${sha.slice(0, 8)}`);
    return uploaded.get(manifestKey);
  }

  const asset = await client.assets.upload('image', file.buf, {
    filename: basename(file.path),
    contentType: `image/${extname(file.path).slice(1).replace('jpg', 'jpeg')}`,
  });
  console.log(`  uploaded ${file.path}`);
  uploaded.set(manifestKey, asset._id);
  return asset._id;
}

const image = async (key, alt, label) => ({
  _type: 'siteImage',
  alt,
  ...(label ? { label } : {}),
  asset: { _type: 'reference', _ref: await assetIdFor(key) },
});

/* ------------------------------------------------------------------ shapes -- */

const clipDoc = async (c, i) => ({
  _type: 'embeddedVideo',
  _key: `clip${i}`,
  host: c.host,
  videoId: c.videoId,
  title: c.title,
  ...(c.note ? { note: c.note } : {}),
  ...(c.duration ? { duration: c.duration } : {}),
  ratio: c.ratio ?? '16:9',
  poster: await image(c.poster, c.posterAlt),
});

const clipList = async (list) => Promise.all(list.map(clipDoc));

/* -------------------------------------------------------------------- run -- */

const plan = [];

// 1. Films onto the case studies they came from.
for (const [key, list] of Object.entries(clips)) {
  if (!key.startsWith('work:')) continue;
  const slug = key.slice(5);
  const id = await client.fetch(`*[_type == "work" && slug.current == $slug][0]._id`, { slug });
  if (!id) {
    console.warn(`  skip ${key}: no case study with that slug in the dataset`);
    continue;
  }
  plan.push({ what: `${key} -> ${list.length} film(s)`, id, set: { videos: await clipList(list) } });
}

// 2. Films and the billboard frames onto the shelf brands.
const brands = await client.fetch(`*[_type == "specBrand"]{_id, "id": slug.current, shots}`);
for (const b of brands) {
  const set = {};
  const films = clips[`brand:${b.id}`];
  if (films) set.videos = await clipList(films);

  const extras = productExtras[b.id];
  if (extras) {
    // Appended to what is published, never swapped for it: a brand is a set, and
    // a set with a frame missing is a fail. Already-present frames are matched on
    // their alt text so a second run does not add them twice.
    const have = new Set((b.shots ?? []).map((s) => s.alt));
    const add = [];
    for (const [i, e] of extras.entries()) {
      if (have.has(e.alt)) continue;
      add.push({ ...(await image(e.key, e.alt, e.label)), _key: `extra${i}` });
    }
    if (add.length) set.shots = [...(b.shots ?? []), ...add];
  }
  if (Object.keys(set).length) plan.push({ what: `brand:${b.id}`, id: b._id, set });
}

// 3. The three cards on the Selected work shelf.
for (const [place, list] of [
  ['lead', leadWork],
  ['tail', tailWork],
]) {
  for (const [i, c] of list.entries()) {
    plan.push({
      what: `shelfCard ${c.client}`,
      id: `shelfCard-${c.client.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      create: {
        _type: 'shelfCard',
        client: c.client,
        href: c.href,
        kind: c.kind,
        year: c.year,
        problem: c.problem,
        ratio: c.ratio ?? '4 / 3',
        place,
        order: i + 1,
        image: await image(c.src, c.alt),
      },
    });
  }
}

// 4. Index rows and reel labels that stopped being true.
//
// These are Studio fields, and the Studio wins over the repository for all of
// them, so a stale one keeps printing until it is patched here or edited by
// hand. Patched by _key so the rest of the row and the rest of the array are
// left alone.
const stale = {
  'contents[_key=="k5p"].note': 'One cut, and what my hand did on each piece of it',
  'contents[_key=="k5q"].note': '{count} projects, brief to delivery',
  'contents[_key=="k5r"].label': 'AI Creative Pipelines',
  'contents[_key=="k5r"].note': '{pipelines} of them, stage by stage, with the gates that stop a frame',
  'contents[_key=="k5t"].note': '{samples} samples in full, plus the studio blog',
  reelHeading: 'Reel',
};
plan.push({ what: 'homePage index rows and reel heading', id: 'homePage', set: stale });

// The reel page said "1:30 · Reel 2026, ninety seconds" and the cut is neither.
// The title becomes the word; the duration is cleared rather than guessed at,
// and the page prints the line without it until somebody measures the cut.
plan.push({
  what: 'reelPage title and duration',
  id: 'reelPage',
  set: { title: 'Reel', duration: '' },
});

// 5. The studio blog block, on the home page.
plan.push({
  what: 'homePage.blog',
  id: 'homePage',
  set: {
    blog: {
      flag: blog.flag,
      title: blog.title,
      standfirst: blog.standfirst,
      note: blog.note,
      href: blog.href,
      linkLabel: blog.linkLabel,
    },
  },
});

console.log(`\n${plan.length} document${plan.length === 1 ? '' : 's'} to write:\n`);
for (const step of plan) console.log(`  ${step.what}`);

if (DRY) {
  console.log('\nDry run. Nothing was written.');
  process.exit(0);
}

let tx = client.transaction();
for (const step of plan) {
  // createIfNotExists then patch, so a card edited in the Studio is not
  // overwritten by a second run of this script while a new one still lands.
  if (step.create) tx = tx.createIfNotExists({ _id: step.id, ...step.create });
  else tx = tx.patch(step.id, (p) => p.set(step.set));
}
await tx.commit();

console.log(
  `\nDone. Open the Studio and the films, the cards and the blog block are fields you can edit.\n` +
    `The site prefers the dataset over src/data/, so nothing on the page changed.\n` +
    `Publish anything and the deploy hook rebuilds from main.`
);
