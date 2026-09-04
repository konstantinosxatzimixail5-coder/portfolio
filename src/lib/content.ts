import { sanity, QUERIES, toImage, toImages, toVideo, toVideos } from './sanity';
import type { CmsImage } from './sanity';
import type { Film } from '../content/video';
import * as copy from '../content/copy';
import * as workContent from '../content/work';
import * as specContent from '../content/spec';
import * as lineContent from '../content/pipelines';

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

/* ------------------------------------------------------------ the overlay -- */

// The site reads two sources. Sanity is the first one and stays the place words
// and pictures are edited. src/content/ is the second: whole documents the
// dataset does not have yet, and named fields laid over documents it does.
//
// The rule is one line long, and it is the same rule everywhere below. A field
// the overlay names wins. A field it does not name comes off the dataset
// untouched.
//
// Which is why the overlay only ever ADDS. Naming a field here does not edit it
// in the Studio, it hides it, and a paragraph hidden this way is off the site
// without being deleted from anywhere anyone would think to look. That happened
// once, to the published wording on five case studies and most of the front
// page, and it is the reason the files in src/content/ now carry nothing but
// new documents, films, pictures, stale numbers and two fields with an order
// number typed into them.
//
// The overlay exists because the dataset could not be written to when this
// content was added, not because the repository is a better home for it. The
// README, under "The overlay", says how to retire it: retype a document in the
// Studio and delete it from src/content/, one at a time, until the folder is
// empty and the dataset is the only version of the site again.

/** Fields with a value replace theirs. `undefined` keeps the dataset's. */
const over = <T extends object>(doc: T, patch: Partial<T> | undefined): T => {
  if (!patch) return doc;
  const defined = Object.fromEntries(Object.entries(patch).filter(([, v]) => v !== undefined));
  return { ...doc, ...defined };
};

/**
 * Sort by a list of ids. Anything the list does not name keeps the order the
 * dataset gave it and lands on the end, so publishing a new case study in the
 * Studio puts it on the page without an edit here to let it in.
 */
const inOrder = <T>(list: T[], ids: string[], idOf: (item: T) => string): T[] => {
  const rank = (item: T) => {
    const i = ids.indexOf(idOf(item));
    return i === -1 ? ids.length : i;
  };
  return list
    .map((item, i) => ({ item, i }))
    .sort((a, b) => rank(a.item) - rank(b.item) || a.i - b.i)
    .map(({ item }) => item);
};

/** The films the Studio holds, in the shape the rest of the site takes. A player
 *  with no poster frame has nothing to sit behind, so it is dropped rather than
 *  rendered as a grey box. `video` is the older single field and comes first;
 *  `videos` is the list that replaced it. */
const filmsFromCms = (doc: any): Film[] =>
  [toVideo(doc?.video), ...toVideos(doc?.videos)]
    .filter((v): v is NonNullable<typeof v> => !!v && !!v.poster)
    .map((v) => ({
      host: v.host,
      videoId: v.videoId,
      title: v.title,
      note: v.note,
      duration: v.duration,
      ratio: v.ratio,
      poster: v.poster!,
    }));

/** The Studio's film first, then the repository's, one entry per video id. */
const films = (fromCms: Film[], fromRepo: Film[] = []): Film[] => {
  const seen = new Set<string>();
  return [...fromCms, ...fromRepo].filter((f) => !seen.has(f.videoId) && seen.add(f.videoId));
};

/* ---------------------------------------------------------------- singles -- */

export const getSettings = once(() => singleton<any>(QUERIES.settings, 'siteSettings'));

export const getHome = once(async () => {
  const d = await singleton<any>(QUERIES.home, 'homePage');
  return { ...over(d, copy.home as any), openImage: toImage(d.openImage) };
});

export const getReel = once(async () => {
  const d = await singleton<any>(QUERIES.reel, 'reelPage');
  const merged = over(d, copy.reelPage as any);
  return {
    ...merged,
    // The overlay's poster is already a picture. The dataset's is a reference
    // that has to be resolved first, so the two cannot share one line.
    poster: (copy.reelPage as any).poster ?? toImage(d.poster),
    trio: toImages(d.trio),
  };
});

export const getSpecPage = once(async () =>
  over(await singleton<any>(QUERIES.specPage, 'specPage'), copy.specPage as any)
);

/* ----------------------------------------------------------------- lists -- */

export const getWork = once(async () => {
  const fromCms = (await sanity.fetch<any[]>(QUERIES.work)).map((w) => {
    const p = workContent.patch[w.slug];
    return over(
      {
        ...w,
        hero: toImage(w.hero),
        gallery: toImages(w.gallery),
        films: films(filmsFromCms(w), p?.films),
        stack: w.stack ?? [],
        links: w.links ?? [],
      },
      // The films are merged above rather than replaced, so they are taken off
      // the patch before the rest of it is laid down.
      p && ({ ...p, films: undefined } as any)
    );
  });

  // A case study written here only appears while the dataset has no document
  // for its slug. Publish one in the Studio and it takes over, without anything
  // in this repository needing to know.
  const published = new Set(fromCms.map((w) => w.slug));
  const added = workContent.added
    .filter((c) => !published.has(c.slug))
    .map((c) => ({ ...c, video: null }));

  return inOrder([...fromCms, ...added], workContent.order, (w: any) => w.slug);
});

export const getPipelines = once(async () => {
  const fromCms = (await sanity.fetch<any[]>(QUERIES.pipelines)).map((p) => ({
    ...p,
    // A film published in the Studio wins. The overlay only fills a gap.
    film: filmsFromCms(p)[0] ?? lineContent.patch[p.id]?.film,
  }));

  const published = new Set(fromCms.map((p) => p.id));
  const added = lineContent.added.filter((l) => !published.has(l.id));

  return inOrder([...fromCms, ...added], lineContent.order, (p: any) => p.id);
});

export const getSpecBrands = once(async () => {
  const list = await sanity.fetch<any[]>(QUERIES.specBrands);
  return list.map((b) => {
    const p = specContent.patch[b.id];
    return over(
      {
        ...b,
        // Extra frames are appended to the published ones, never swapped for
        // them: a brand is a set, and a set with a picture missing is a fail.
        shots: [...toImages(b.shots), ...((p?.shots ?? []) as CmsImage[])],
        films: films(filmsFromCms(b), p?.films),
      },
      p && ({ ...p, shots: undefined, films: undefined } as any)
    );
  });
});
