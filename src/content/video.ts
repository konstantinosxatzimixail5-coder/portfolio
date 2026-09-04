// The films that are actually watchable, wherever they appear on the site.
//
// One shape for case studies, the spec shelf and the workflows, because a film
// on a case study and a film on a spec shelf have the same duties: a poster the
// page can paint before anything loads, a running time a reader can see before
// committing, and an id nobody has to paste a full URL for.
//
// Every player on this site is a facade. Nothing from YouTube or Vimeo is
// requested until somebody clicks, which is a performance decision and a consent
// one at the same time: an embed that runs on page load sets cookies for a
// visitor who never asked to watch anything.

import type { CmsImage } from '../lib/sanity';

export interface Film {
  host: 'youtube' | 'vimeo';
  /** The id, not a URL. Eleven characters on YouTube, digits on Vimeo. */
  videoId: string;
  title: string;
  /** One or two sentences under the player, in my voice, saying what it proves. */
  note?: string;
  /** Human running time, shown on the play button. */
  duration?: string;
  /** How it was cut. Sets the shape of the poster and of the player. */
  ratio?: '16:9' | '9:16';
  poster: CmsImage;
}

/** A picture this repository owns, addressed by its path under
 *  source-assets/local/. Alt text is not optional here either. */
export const local = (key: string, alt: string, label?: string): CmsImage => ({
  key: `local/${key}`,
  alt,
  label,
});

/** A picture already published in Sanity, addressed by its asset hash. Used when
 *  the right poster frame is one the Studio already holds, so a film can reuse a
 *  picture instead of the repository keeping a second copy of it. */
export const cms = (hash: string, alt: string, label?: string): CmsImage => ({
  key: `cms/${hash}`,
  alt,
  label,
});
