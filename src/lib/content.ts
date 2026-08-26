import { sanity, QUERIES, toImage, toImages, toVideo } from './sanity';

// Every page and both shared components need the settings, and Astro renders
// each page in its own pass. Without a cache the navigation alone would be
// fetched once per page. These promises are created once per build and awaited
// as many times as needed.
const once = <T>(fn: () => Promise<T>) => {
  let p: Promise<T> | undefined;
  return () => (p ??= fn());
};

// A missing singleton is usually a wiring problem, not a content one: the site
// is pointed at the wrong dataset, or the document was never published. Failing
// here with the document id in the message beats rendering a page of undefined.
async function singleton<T>(query: string, id: string): Promise<T> {
  const doc = await sanity.fetch<T>(query);
  if (!doc) {
    throw new Error(
      `No "${id}" document found in the ${import.meta.env.SANITY_DATASET || 'production'} dataset. ` +
        `Check SANITY_DATASET, then open the Studio and publish it.`
    );
  }
  return doc;
}

export const getSettings = once(() => singleton<any>(QUERIES.settings, 'siteSettings'));

export const getHome = once(async () => {
  const d = await singleton<any>(QUERIES.home, 'homePage');
  return { ...d, openImage: toImage(d.openImage) };
});

export const getReel = once(async () => {
  const d = await singleton<any>(QUERIES.reel, 'reelPage');
  return { ...d, poster: toImage(d.poster), trio: toImages(d.trio) };
});

export const getSpecPage = once(() => singleton<any>(QUERIES.specPage, 'specPage'));

export const getWork = once(async () => {
  const list = await sanity.fetch<any[]>(QUERIES.work);
  return list.map((w) => ({
    ...w,
    hero: toImage(w.hero),
    gallery: toImages(w.gallery),
    video: toVideo(w.video),
    stack: w.stack ?? [],
    links: w.links ?? [],
  }));
});

export const getPipelines = once(() => sanity.fetch<any[]>(QUERIES.pipelines));

export const getSpecBrands = once(async () => {
  const list = await sanity.fetch<any[]>(QUERIES.specBrands);
  return list.map((b) => ({ ...b, shots: toImages(b.shots) }));
});
