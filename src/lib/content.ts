import { sanity, QUERIES, toImage, toImages, toVideo, toVideos } from './sanity';
import { clips as repoClips, type Clip } from '../data/videos';
import { leadWork, tailWork } from '../data/work-extras';
import { blog as repoBlog } from '../data/blog';
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

// A clip as the Studio stores it, in the shape the players take. One with no
// poster has nothing to sit behind, so it is dropped rather than rendered as a
// grey box.
const clipsFromCms = (list: any): Clip[] =>
  toVideos(list)
    .filter((v) => !!v.poster)
    .map((v) => ({
      host: v.host === 'vimeo' ? ('vimeo' as const) : ('youtube' as const),
      videoId: v.videoId,
      title: v.title,
      note: v.note,
      duration: v.duration,
      ratio: v.ratio,
      // A CMS picture carries its key and its alt on the object itself.
      poster: v.poster!.key,
      posterAlt: v.poster!.alt,
    }));

export const getWork = once(async () => {
  const list = await sanity.fetch<any[]>(QUERIES.work);
  return list.map((w) => ({
    ...w,
    hero: toImage(w.hero),
    gallery: toImages(w.gallery),
    video: toVideo(w.video),
    // Films published in the Studio for this case study. They take over from
    // the repository's list for that case; see getClips below.
    videos: clipsFromCms(w.videos),
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
  return list.map((b) => ({ ...b, shots: toImages(b.shots), videos: clipsFromCms(b.videos) }));
});

/**
 * Every clip on the site, keyed by what it belongs to.
 *
 * The Studio wins per key. A case study or a brand with films published against
 * it replaces the repository's list for that one key and leaves every other key
 * alone, so filling one in does not empty the rest. src/data/videos.ts is what
 * the site shows until each is filled in, and it is what these were seeded from.
 */
export const getClips = once(async () => {
  const [work, brands] = await Promise.all([getWork(), getSpecBrands()]);
  const all: Record<string, Clip[]> = { ...repoClips };
  for (const w of work) if (w.videos.length) all[`work:${w.slug}`] = w.videos;
  for (const b of brands) if (b.videos.length) all[`brand:${b.id}`] = b.videos;
  return all;
});

export const clipsForAsync = async (key: string): Promise<Clip[]> => (await getClips())[key] ?? [];

/**
 * The Selected work shelf, either side of the case studies. Cards published in
 * the Studio replace the repository's list wholesale, because this one is short
 * and a merge would mean a card deleted in the Studio quietly coming back.
 */
export const getShelfCards = once(async () => {
  const docs = await sanity.fetch<any[]>(QUERIES.shelfCards);
  const mapped = docs
    .map((c) => ({ ...c, image: toImage(c.image) }))
    .filter((c) => !!c.image);
  if (mapped.length === 0) return { lead: leadWork, tail: tailWork };
  return {
    lead: mapped.filter((c) => c.place === 'lead'),
    tail: mapped.filter((c) => c.place !== 'lead'),
  };
});

/** The studio blog block. The Studio's version wins once it has one. */
export const getBlog = once(async () => {
  const d = await getHome();
  const b = d.blog;
  return b?.href ? { ...repoBlog, ...Object.fromEntries(Object.entries(b).filter(([, v]) => v)) } : repoBlog;
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
export { clips, clipsFor, clipFor } from '../data/videos';
export type { Clip } from '../data/videos';
export { captures } from '../data/captures';
export { pairFor } from '../data/product-pairs';
export { extrasFor, extraShotCount } from '../data/product-extras';
export { leadWork, tailWork } from '../data/work-extras';
export { faqs } from '../data/faq';
export { blog } from '../data/blog';
export {
  writingSamples,
  writingGroups,
  featuredWriting,
  findSample,
} from '../data/writing/index';
export { profile, whatsappHref } from '../data/profile';
