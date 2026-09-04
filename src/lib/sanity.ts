import { createClient } from '@sanity/client';

const projectId = import.meta.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET || 'production';
const token = import.meta.env.SANITY_READ_TOKEN || undefined;

if (!projectId) {
  throw new Error(
    'SANITY_PROJECT_ID is not set. Copy .env.example to .env and fill it in, or add the variable in the deploy host settings.'
  );
}

export const sanity = createClient({
  projectId,
  dataset,
  apiVersion: '2024-10-01',
  // The site is built once and served as files, so there is no request to keep
  // fresh and every read is a build-time read. The CDN copy is cheaper and it
  // lags the live dataset by seconds, which does not matter to a static build.
  useCdn: !token,
  token,
  perspective: 'published',
});

// --- types ------------------------------------------------------------------

export interface CmsImage {
  key: string; // the manifest key, e.g. cms/8f3a1c...
  alt: string;
  label?: string;
  focus?: string; // css object-position, from the hotspot
}

export interface CmsVideo {
  host: 'vimeo' | 'youtube';
  videoId: string;
  poster: CmsImage | null;
  title: string;
  duration?: string;
  note?: string;
  ratio?: '16:9' | '9:16';
}

// --- image projection -------------------------------------------------------

// Pulled into every query that returns a picture. The asset id is what the sync
// script names the downloaded file after, so it doubles as the manifest key.
// The hotspot comes back as fractions and becomes object-position on the page.
const IMAGE = `{
  alt,
  label,
  "assetId": asset._ref,
  "hotspot": hotspot{x, y}
}`;

const VIDEO = `{
  host,
  videoId,
  title,
  duration,
  note,
  ratio,
  poster ${IMAGE}
}`;

// --- queries ----------------------------------------------------------------

export const QUERIES = {
  settings: `*[_id == "siteSettings"][0]{
    name, role, base, email, monogram, footerNote, domain,
    "cv": cv.asset->url,
    studio,
    links,
    navLinks
  }`,

  home: `*[_id == "homePage"][0]{
    headline, lede, note,
    openImage ${IMAGE},
    contents,
    reelHeading, reelBadgePlay, reelBadgePending, reelNote,
    workHeading, workMore,
    pipelinesHeading, pipelinesIntro,
    writingHeading, writingItems, writingMore,
    aboutHeading, aboutBody,
    seoTitle, seoDescription
  }`,

  reel: `*[_id == "reelPage"][0]{
    title, duration, host, videoId, heading, lede, pendingNote,
    poster ${IMAGE},
    trio[] ${IMAGE},
    shotsHeading, shotsRail, shots,
    seoTitle, seoDescription
  }`,

  specPage: `*[_id == "specPage"][0]{
    flag, heading, lede, note, seoTitle, seoDescription
  }`,

  work: `*[_type == "work" && draft != true] | order(order asc){
    "slug": slug.current,
    title, client, kind, year, place, order, problem,
    brief, constraint, built, how, landed,
    hero ${IMAGE},
    gallery[] ${IMAGE},
    video ${VIDEO},
    videos[] ${VIDEO},
    stack, links
  }`,

  pipelines: `*[_type == "pipeline"] | order(order asc){
    "id": slug.current,
    num, title, mechanism, summary, loop, stages, gates,
    film ${VIDEO}
  }`,

  specBrands: `*[_type == "specBrand"] | order(order asc){
    "id": slug.current,
    num, name, product, proves, note, pipeline,
    shots[] ${IMAGE},
    videos[] ${VIDEO}
  }`,
};

// --- helpers ----------------------------------------------------------------

// Sanity asset ids look like image-8f3a1c...-1920x1080-jpg. The middle part is a
// hash of the file itself, so it is stable, unique, and unchanged by a rename.
// The sync script saves each original as source-assets/cms/<hash>.<ext>, which
// the image build then turns into the manifest key cms/<hash>.
export const assetKey = (assetId: string): string => `cms/${assetId.split('-')[1]}`;

// A hotspot is a point on the picture that must survive a crop. It arrives as
// two fractions and leaves as a css object-position. Centre is the default, and
// when it is the default it is left off so the page does not carry dead style.
export function toImage(raw: any): CmsImage | null {
  if (!raw?.assetId) return null;
  const { x, y } = raw.hotspot ?? {};
  const centred = x == null || y == null || (Math.abs(x - 0.5) < 0.02 && Math.abs(y - 0.5) < 0.02);
  return {
    key: assetKey(raw.assetId),
    alt: raw.alt ?? '',
    label: raw.label ?? undefined,
    focus: centred ? undefined : `${(x * 100).toFixed(1)}% ${(y * 100).toFixed(1)}%`,
  };
}

export const toImages = (list: any[] | null | undefined): CmsImage[] =>
  (list ?? []).map(toImage).filter((i): i is CmsImage => i !== null);

export function toVideo(raw: any): CmsVideo | null {
  if (!raw?.videoId) return null;
  return {
    host: raw.host ?? 'vimeo',
    videoId: raw.videoId,
    poster: toImage(raw.poster),
    title: raw.title ?? '',
    duration: raw.duration ?? undefined,
    note: raw.note ?? undefined,
    // A missing shape is a wide one, which is what every film on the site was
    // before the field existed.
    ratio: raw.ratio === '9:16' ? '9:16' : '16:9',
  };
}

export const toVideos = (list: any[] | null | undefined): CmsVideo[] =>
  (list ?? []).map(toVideo).filter((v): v is CmsVideo => v !== null);
