import { sanity, QUERIES, toImage, toImages, toVideo } from './sanity';
import { profile } from '../data/profile';
import { navLinks } from '../data/sections';
import { morePipelines } from '../data/pipelines';

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
    // Defined in the repository, not the Studio. Seven labels, in this order,
    // is a constraint the acceptance checks test; see src/data/sections.ts.
    navLinks,
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

// All seven, in one list, ordered by their sheet number. Three are edited in the
// Studio and four are transcribed in src/data/pipelines.ts, and a reader has no
// reason to care which is which: they are the same object with the same rules,
// and the repository copies simply carry the extra fields the front page had no
// room for. Every page that lists or looks one up reads this.
export const getAllPipelines = once(async () => {
  const fromCms = await getPipelines();
  const all = [...fromCms, ...morePipelines];
  const seen = new Set<string>();
  for (const p of all) {
    if (!p.id) throw new Error(`A pipeline has no slug: ${p.title ?? 'untitled'}`);
    if (seen.has(p.id)) throw new Error(`Two pipelines share the slug "${p.id}".`);
    seen.add(p.id);
  }
  return all.sort((a, b) => String(a.num).localeCompare(String(b.num)));
});

export const findPipeline = async (id: string) =>
  (await getAllPipelines()).find((p: any) => p.id === id);

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

export { morePipelines, HOME_PIPELINE } from '../data/pipelines';
export { films, findFilm } from '../data/films';
export { captures } from '../data/captures';
export { pairFor } from '../data/product-pairs';
export { faqs } from '../data/faq';
export {
  writingSamples,
  writingGroups,
  featuredWriting,
  findSample,
} from '../data/writing/index';
export { profile, whatsappHref } from '../data/profile';
