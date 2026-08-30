// Product and UGC pairs for the front page shelf.
//
// Three of the brands show two frames on the card instead of one: the studio
// capture of the object on its own, and the same product held, used or worn in
// a creator-style capture. The pair sits inside one card under one caption,
// because the comparison is the point and two separate cards would let a reader
// scroll past the argument.
//
// Matched on the brand name rather than the slug. The names are fixed and known;
// the slugs live in the Studio and this file has no way to check them.
//
// A brand with no entry here keeps the single image the CMS gives it. That is
// the documented fallback, not a bug: the shelf renders either way, so a missing
// file costs a second frame and never a broken card.

export interface ProductPair {
  product: { key: string; alt: string };
  ugc: { key: string; alt: string };
}

// Empty until the six files land in source-assets/site/product/. Add an entry
// keyed by the brand name in capitals and the card grows its second frame on the
// next build. Nothing else needs editing.
//
// Expected keys, once the masters are in place:
//   site/product/feral-product     site/product/feral-ugc
//   site/product/grain01-product   site/product/grain01-ugc
//   site/product/slab-product      site/product/slab-ugc
export const productPairs: Record<string, ProductPair> = {};

const normalise = (name: string) => name.trim().toUpperCase().replace(/\s+/g, ' ');

export const pairFor = (brandName: string): ProductPair | undefined =>
  productPairs[normalise(brandName)];
