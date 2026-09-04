// What this repository adds to the spec shelf.
//
// The six brands and most of their frames live in Sanity and are edited there.
// Missing from the dataset were the two out-of-home pieces, which are the
// hardest exam on the shelf and were also the two films the shelf could not
// play. Both are added here, along with the "runs on" line for the brands that
// never got one and a fix for a slug that shipped as a digit.
//
// Keyed by the id the page already uses, which is the slug. Anything a patch
// does not name comes off the dataset unchanged.

import { local, type Film } from './video';
import type { CmsImage } from '../lib/sanity';

export interface BrandPatch {
  /** Replaces the anchor and the URL fragment. */
  id?: string;
  proves?: string;
  note?: string;
  pipeline?: { label: string; href: string };
  /** Appended to the frames already in the dataset, in this order. */
  shots?: CmsImage[];
  films?: Film[];
}

export const patch: Record<string, BrandPatch> = {
  feral: {
    proves:
      'One label held across five sets, one creator held across three rooms, and the same can walking off a billboard',
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
    note: 'This set exists to test drift. The same creator appears in warm string lights, in red club light with a flash, and in low sun on a roof. Nothing about the face is allowed to move between them, and the camera in her hand has to stay the same object in all three. Stack the frames, flick through at speed, and the jaw is where a fail shows first. The billboard puts the camera through the same test in daylight: a translucent body with a visible board, battery and lens barrel, breaking the edge of a flat surface with nothing to hide the seam.',
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

  kilnwork: {
    pipeline: { label: 'Phantom Set', href: '/#phantom-set' },
  },

  // The slug went in as "6", so this brand answered to /spec/#6 and the contents
  // index pointed at a number instead of a name.
  '6': {
    id: 'soie',
    pipeline: { label: 'Phantom Set', href: '/#phantom-set' },
    proves:
      'Frosted glass with liquid behind it, and a drop caught on its way out of the pipette',
  },
};
