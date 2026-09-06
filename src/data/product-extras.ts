// Frames this repository adds to a shelf brand, after the ones the Studio holds.
//
// The two anamorphic billboards are the hardest exam on the shelf and neither
// was in the dataset, so the page was arguing for the out-of-home work without
// showing it. They are added rather than swapped in: a brand is a set, and a set
// with a frame missing is a fail.
//
// Matched on the brand slug, which is the same id the page anchors on. A brand
// with no entry here renders exactly as it did before, which is the documented
// fallback and not a bug.
//
// This is the same arrangement as src/data/product-pairs.ts, and it exists for
// the same reason: some pictures belong to the repository and some belong to the
// Studio, and the shelf should not care which is which.

export interface ExtraShot {
  /** Manifest key, e.g. site/product/feral-billboard. */
  key: string;
  alt: string;
  label: string;
}

export const productExtras: Record<string, ExtraShot[]> = {
  feral: [
    {
      key: 'site/product/feral-billboard',
      alt: 'A night-city billboard for FERAL Yuzu Static, the can breaking out of the board in front of the artwork with lime slices and green liquid crossing the frame, graffiti reading STAY WILD on the hoarding below and lit towers behind.',
      label: 'the same plate, on a billboard',
    },
  ],
  'grain-01': [
    {
      key: 'site/product/grain01-billboard',
      alt: 'A daylight city billboard for GRAIN 01 on an acid-green ground, the translucent camera bursting through the board in a spray of magenta shards under the line SHOOT OUTSIDE THE FRAME.',
      label: 'the same body, on a billboard',
    },
  ],
};

export const extrasFor = (brandId: string): ExtraShot[] => productExtras[brandId] ?? [];

/**
 * Frames served from a re-cropped copy rather than the file the Studio holds.
 *
 * Four of the SLAB captures carry the generator's watermark, a translucent
 * four-pointed sparkle in the bottom right corner. The picture is otherwise the
 * one that was published, so the fix is a trim rather than a replacement: the
 * foot of each frame is cut off and the rest is untouched.
 *
 * Keyed by the manifest key the CMS picture resolves to, which is its asset
 * hash. Replace the file in the Studio with the trimmed version and delete the
 * entry; nothing else has to change. `npm run seed` does not touch these,
 * because swapping a client's published asset is not something a script should
 * decide to do on its own.
 */
export const trimmedShots: Record<string, string> = {
  'cms/1bdf135e2d2575a80bbfc4a4910a338fae5df43c': 'site/product/slab-gym',
  'cms/6005789ac224db3ae10db166000b762063cd3578': 'site/product/slab-bed',
  'cms/72dd8ed4221b0782b2e9a27804d42cc3a4eb6e46': 'site/product/slab-desk',
  'cms/ce57871c99f4dfb2544473de7b422976241a8d59': 'site/product/slab-tray',
};

/** The same picture, minus the watermarked foot, where there is one. */
export const trimmed = <T extends { key: string }>(shot: T): T =>
  trimmedShots[shot.key] ? { ...shot, key: trimmedShots[shot.key] } : shot;

/** Every extra frame, for the counted numbers in the shelf lede. */
export const extraShotCount = Object.values(productExtras).reduce((n, list) => n + list.length, 0);
