// What this repository adds to the spec shelf.
//
// ADD, DO NOT REPLACE. The six brands and their frames are the dataset's and
// the wording under each heading is the dataset's. Overlaying a paragraph here
// does not edit it in the Studio, it hides it, so nothing below rewrites one.
//
// Missing from the dataset were the two out-of-home pieces, which are the
// hardest exam on the shelf and were also the two films the shelf could not
// play. Both are added. The rest is two empty fields filled in and a slug that
// shipped as a digit.

import { local, type Film } from './video';
import type { CmsImage } from '../lib/sanity';

export interface BrandPatch {
  /** Replaces the anchor and the URL fragment. */
  id?: string;
  /** Only ever filled in where the dataset left it empty. */
  pipeline?: { label: string; href: string };
  /** Appended to the frames already in the dataset, in this order. */
  shots?: CmsImage[];
  films?: Film[];
}

export const patch: Record<string, BrandPatch> = {
  feral: {
    shots: [
      local(
        'spec/feral/billboard',
        'A night-city billboard for FERAL Yuzu Static, the can breaking out of the board in front of the artwork with lime slices and green liquid crossing the frame, graffiti reading STAY WILD on the hoarding below.',
        'the same plate, on a billboard'
      ),
    ],
    films: [
      {
        host: 'youtube',
        videoId: '5VgtoylYaFw',
        title: 'Anamorphic billboard',
        note: 'The hardest delivery for this can. A break-out board asks the viewer to read the same object as flat artwork and as a solid thing in the same second, so any wobble in the label or the light shows immediately. Same locked plate as the product sets above.',
        duration: '0:08',
        ratio: '16:9',
        poster: local(
          'spec/feral/billboard',
          'The FERAL Yuzu Static can breaking out of a lit billboard over a wet night street.'
        ),
      },
    ],
  },

  'grain-01': {
    shots: [
      local(
        'spec/grain-01/billboard',
        'A daylight city billboard for GRAIN 01 on an acid-green ground, the translucent camera bursting through the board in a spray of magenta shards under the line SHOOT OUTSIDE THE FRAME.',
        'the same body, on a billboard'
      ),
    ],
    films: [
      {
        host: 'youtube',
        videoId: 'laoB3HnoxHs',
        title: 'Anamorphic billboard',
        note: 'The camera coming through the board in daylight, which is the unforgiving version: no night city to hide the seam, and a translucent body with a visible circuit board and lens barrel that has to stay the same object as it crosses the edge.',
        duration: '0:08',
        ratio: '16:9',
        poster: local(
          'spec/grain-01/billboard',
          'The GRAIN 01 camera bursting out of an acid-green city billboard in daylight under the line SHOOT OUTSIDE THE FRAME.'
        ),
      },
    ],
  },

  // Two brands were published without a "runs on" line, so the page left the
  // line off. Filling an empty field takes nothing away.
  kilnwork: {
    pipeline: { label: 'Phantom Set', href: '/#phantom-set' },
  },

  // The slug went in as "6", so this brand answered to /spec/#6 and the
  // contents index pointed at a number instead of a name.
  '6': {
    id: 'soie',
    pipeline: { label: 'Phantom Set', href: '/#phantom-set' },
  },
};
