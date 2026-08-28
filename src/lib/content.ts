import { sanity, QUERIES, toImage, toImages, toVideo } from './sanity';
import { profile } from '../data/profile';
import { mergeNav } from '../data/sections';

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

// Site settings, with the positioning fields from src/data/profile.ts layered
// on top. The CMS still owns the name, the monogram, the navigation, the footer
// and the domain. It does not own the role line, the location or the phone,
// because those three have to agree with a CV and a LinkedIn headline word for
// word and there is no version of that which survives being editable in two
// places. See the note at the top of src/data/profile.ts.
export const getSettings = once(async () => {
  const doc = await singleton<any>(QUERIES.settings, 'siteSettings');
  return {
    ...doc,
    // The pages the front page cannot link to from its own index have to be in
    // the bar across the top or they are unreachable. Merged rather than
    // replaced, so the Studio still owns the order of everything it lists.
    navLinks: mergeNav(doc.navLinks),
    role: profile.role,
    roleShort: profile.roleShort,
    base: profile.base,
    baseShort: profile.baseShort,
    claim: profile.claim,
    phone: profile.phone,
    offDuty: profile.offDuty,
  };
});

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

// --- content this repository owns -------------------------------------------
//
// Everything below is served from src/data/ rather than from Sanity. The reason
// is written at the top of each of those files, and it is the same reason each
// time: these are documents with a shape, not fields with a value, and retyping
// a script or a pipeline sheet into a rich text box loses the thing that made it
// one.

export { morePipelines } from '../data/pipelines';
export { captures } from '../data/captures';
export { faqs } from '../data/faq';
export {
  writingSamples,
  writingGroups,
  featuredWriting,
  findSample,
} from '../data/writing/index';
export { profile, whatsappHref } from '../data/profile';
