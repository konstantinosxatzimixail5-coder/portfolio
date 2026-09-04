// Builds any picture a page references that is not already built in this
// repository, then stops. Runs automatically before every build, here and on the
// deploy host.
//
// Two sources. Pictures the CMS references are fetched and then built. Pictures
// under source-assets/local/ are already here and only need building, which is
// what makes a repo-owned image work on a clean checkout of a fresh clone.
//
// The point is that publishing in the Studio is enough. Add a picture, publish,
// and the next build brings it down on its own instead of failing and waiting
// for someone to run `npm run content` and commit.
//
// It only ever adds. Deleting a picture in the Studio leaves its files here
// until the full local pass prunes them, which costs a few unused files in a
// deploy and never costs a broken page. Pruning on the host would mean a build
// that cannot reach Sanity deletes the pictures it cannot currently see.
//
// Run: happens on its own via `prebuild`. `npm run top-up` to do it by hand.

import { client } from './sanity-env.mjs';
import {
  derive,
  download,
  isBuilt,
  localImages,
  readManifest,
  usedAssets,
  writeManifest,
} from './lib/images.mjs';

const manifest = await readManifest();
const { assets, unreadable } = await usedAssets(client());
const local = await localImages();

const missing = [];
for (const picture of [...assets, ...local]) {
  if (!(await isBuilt(manifest, picture.key))) missing.push(picture);
}

const inUse = assets.length + local.length;

if (missing.length === 0 && unreadable.length === 0) {
  console.log(`images: ${inUse} in use, all built.`);
  process.exit(0);
}

const failed = unreadable.map((id) => `${id} (unreadable asset id)`);
let added = 0;

for (const picture of missing) {
  try {
    // A CMS picture has a url to fetch first. A local one is already on disk.
    if (picture.url) await download(picture);
    const result = await derive(picture.file, picture.key);
    if (!result) {
      failed.push(`${picture.key} (no readable dimensions)`);
      continue;
    }
    manifest[picture.key] = result.entry;
    added++;
    console.log(`  built  ${picture.key}`);
  } catch (err) {
    failed.push(`${picture.key} (${err.message})`);
  }
}

if (added > 0) await writeManifest(manifest);

console.log(`images: ${inUse} in use, ${added} newly built.`);

if (failed.length) {
  console.error(`\n${failed.length} could not be built:`);
  for (const f of failed) console.error(`  ${f}`);
  console.error(
    `\nThe pages using them will stop the build next. Check the picture in the ` +
      `Studio, then run \`npm run content\`.`
  );
  process.exit(1);
}

if (added > 0) {
  console.log(
    `Commit public/img/ and src/image-manifest.json so the next build does not ` +
      `have to fetch these again.`
  );
}
