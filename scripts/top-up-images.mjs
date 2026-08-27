// Fetches and builds any picture the CMS references that is not already in this
// repository, then stops. Runs automatically before every build, here and on the
// deploy host.
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
import { derive, download, isBuilt, readManifest, usedAssets, writeManifest } from './lib/images.mjs';

const manifest = await readManifest();
const { assets, unreadable } = await usedAssets(client());

const missing = [];
for (const asset of assets) {
  if (!(await isBuilt(manifest, asset.key))) missing.push(asset);
}

if (missing.length === 0 && unreadable.length === 0) {
  console.log(`images: ${assets.length} in use, all built.`);
  process.exit(0);
}

const failed = unreadable.map((id) => `${id} (unreadable asset id)`);
let added = 0;

for (const asset of missing) {
  try {
    await download(asset);
    const result = await derive(asset.file, asset.key);
    if (!result) {
      failed.push(`${asset.key} (no readable dimensions)`);
      continue;
    }
    manifest[asset.key] = result.entry;
    added++;
    console.log(`  built  ${asset.key}`);
  } catch (err) {
    failed.push(`${asset.key} (${err.message})`);
  }
}

if (added > 0) await writeManifest(manifest);

console.log(`images: ${assets.length} in use, ${added} newly built.`);

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
