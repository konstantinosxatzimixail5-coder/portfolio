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

/** Every extra frame, for the counted numbers in the shelf lede. */
export const extraShotCount = Object.values(productExtras).reduce((n, list) => n + list.length, 0);
