import { createClient } from '@sanity/client';
import { fetchFixture } from './fixture';

// Vite inlines the keys it knows about from .env at build time, and leaves the
// ones that only exist in the shell to process.env. A deploy host sets its
// variables the second way and a checkout sets them the first, so both are read
// or the same value is present in one place and missing in the other.
//
// Coerced to a string on the way out. Vite inlines a bare numeric value as a
// number rather than as the string the shell actually held, so SANITY_FIXTURE=1
// arrives here as 1 and a strict comparison against '1' silently fails.
const env = (key: string): string | undefined => {
  const raw = (import.meta.env as Record<string, unknown>)[key] ?? process.env[key];
  return raw === undefined || raw === null || raw === '' ? undefined : String(raw);
};

const projectId = env('SANITY_PROJECT_ID');
const dataset = env('SANITY_DATASET') || 'production';
const token = env('SANITY_READ_TOKEN') || undefined;

// Opt in, never inferred. A checkout with no credentials can render the site
// against src/lib/fixture.ts, which is what makes the layout workable without a
// project id. It has to be asked for explicitly: a deploy that lost its
// environment variables must fail loudly rather than quietly ship placeholder
// prose that looks almost like the real thing.
const useFixture = env('SANITY_FIXTURE') === '1';

if (!projectId && !useFixture) {
  throw new Error(
    'SANITY_PROJECT_ID is not set. Copy .env.example to .env and fill it in, or add the variable in the deploy host settings. ' +
      'To work on the layout without credentials, set SANITY_FIXTURE=1 instead.'
  );
}

export const sanity = useFixture
  ? { fetch: async <T,>(query: string): Promise<T> => fetchFixture<T>(query) }
  : createClient({
      projectId,
      dataset,
      apiVersion: '2024-10-01',
      // The site is built once and served as files, so there is no request to
      // keep fresh and every read is a build-time read. The CDN copy is cheaper
      // and it lags the live dataset by seconds, which does not matter to a
      // static build.
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
    stack, links
  }`,

  pipelines: `*[_type == "pipeline"] | order(order asc){
    "id": slug.current,
    num, title, mechanism, summary, loop, stages, gates
  }`,

  specBrands: `*[_type == "specBrand"] | order(order asc){
    "id": slug.current,
    num, name, product, proves, note, pipeline,
    shots[] ${IMAGE}
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
  };
}
