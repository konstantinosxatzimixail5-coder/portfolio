// Cards on the Selected work shelf that are not case studies.
//
// Three pieces belong on that shelf and already have a better home than a case
// study would give them: the studio has a live site, FERAL has the whole product
// shelf, and the animation has a film page with its beat map on it. So each one
// gets a card and the card goes where the work actually is. Writing a fourth
// version of any of them here would be the same argument printed twice, and the
// two copies would drift.
//
// The case studies themselves are untouched. They come from the Studio, in the
// order the Studio gives them, and this file adds either side of them.

export interface WorkExtra {
  href: string;
  client: string;
  /** Printed as written. Anything matching spec or original reads gold. */
  kind: string;
  year: string;
  /** The line under the card. One sentence, no wind-up. */
  problem: string;
  /** Manifest key and alt, the pair Frame takes for repo-owned pictures. */
  src: string;
  alt: string;
  ratio?: string;
}

/** Before the case studies, because it is the largest of them. */
export const leadWork: WorkExtra[] = [
  {
    href: 'https://talecrafters.studio/',
    client: 'TaleCrafters',
    kind: 'Content & Growth Strategy, fully functioning SEO & AIO optimised website',
    year: '2026',
    problem:
      'Strategy, build and copy for a synthetic media studio, on a site where every claim carries the pipeline, the gate or the stack that produced it.',
    src: 'site/talecrafters-mark',
    alt: 'The TaleCrafters mark on a near-black ground: two white eyes over a wide grin made of film-strip perforations, with a cyan edge under it.',
    ratio: '4 / 3',
  },
];

/** After them, where the label change reads as a change of section. */
export const tailWork: WorkExtra[] = [
  {
    href: '/product/#feral',
    client: 'FERAL',
    kind: 'Spec, self-initiated',
    year: '2026',
    problem:
      'An energy drink I invented so the label had nowhere to hide, then walked off a billboard over a wet night street.',
    src: 'site/product/feral-billboard',
    alt: 'A night-city billboard for FERAL Yuzu Static, the can breaking out of the board in front of the artwork with lime slices and green liquid crossing the frame.',
    ratio: '16 / 9',
  },
  {
    href: 'https://www.youtube.com/shorts/j_1NQCp2kp0',
    client: 'ΜΠΑΜ',
    kind: 'Spec, self-initiated',
    year: '2025',
    problem:
      'An AI-generated satire of Greece, cut out of Grok Imagine and Suno back when holding a character for nine seconds was the whole difficulty.',
    // The short is vertical and the shelf is not. A 9:16 card left a hole in
    // the column beside it, so the frame is set whole on the page's own ground
    // rather than cropped down to a letterbox of itself.
    src: 'site/video/greece-satire-card',
    alt: 'A cartoon frame from the satire: two wide-eyed trains meeting head on over a level crossing, drivers leaning out of both cabs, the word ΜΠΑΜ across the sky above them.',
    ratio: '4 / 3',
  },
  {
    href: '/films/mars-drop/',
    client: 'Mars Drop',
    kind: 'Original',
    year: '1:47',
    problem:
      'An animated two-hander with no action in it, made to find out whether the pipeline can hold a scene on dialogue alone.',
    src: 'site/mars-drop/md-poster',
    alt: 'A wide animated frame of a Mars colony: two figures standing apart in front of a landed rocket and a domed habitat, orange rock formations behind them.',
    ratio: '16 / 9',
  },
];
