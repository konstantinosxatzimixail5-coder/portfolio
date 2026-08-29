// The two original shorts.
//
// Everything here comes from the site update brief or from the frames
// themselves. The sections the brief marks "verbatim from the PDF" are the
// story spine, the pipeline stages, the look, the locks, the shot prompts and
// Skyrunner's route notes. Those process documents were not supplied, and the
// brief is explicit that nothing may claim what the documents do not support,
// so those fields are empty and the template omits the sections they feed. When
// the PDFs arrive this is a data drop and no component changes.

import type { Block } from '../lib/types';

export interface Beat {
  letter: string;
  time: string;
  name: string;
  // The still for this generation block, as a manifest key.
  image: string;
  alt: string;
  // From the process document. Absent until it arrives.
  note?: string;
  prompt?: string;
}

export interface DesignSheet {
  tag: string; // the reference tag the pipeline calls it by, e.g. @shogun_v1
  name: string;
  note?: string;
  image?: string;
  alt?: string;
}

export interface SpineRow {
  key: string;
  value: string;
}

export interface Film {
  slug: string;
  title: string;
  runtime: string;
  standfirst: string; // the card line on the home page
  logline: string;
  hero: string;
  heroAlt: string;
  strip: string;
  stripAlt: string;
  closing: string;
  closingAlt: string;
  spec: { key: string; value: string }[];
  beats: Beat[];
  cast: DesignSheet[];
  stack: { group: string; items: string[] }[];
  // All of the following arrive with the process document.
  spine: SpineRow[];
  pipeline: { num: string; name: string; body: string }[];
  look: { key: string; value: string }[];
  locks: { failure: string; fix: string }[];
  route?: {
    image: string;
    alt: string;
    caption: string;
    waypoints: { num: string; name: string }[];
    body: Block[];
    reference?: string;
  };
  // The process document, once it exists in public/docs/.
  doc?: { path: string; title: string; summary: string };
}

const SHARED_SPEC = [
  { key: 'Format', value: '1920x1080, 30 fps, 16:9' },
  { key: 'Video model', value: 'Seedance 2.0' },
  { key: 'Design', value: 'ChatGPT Image 2' },
  { key: 'Control layer', value: 'Claude x Higgsfield MCP' },
  { key: 'Skills', value: 'tig-scene-engine, tig-acting-task, cinedance' },
];

const SHARED_STACK = [
  { group: 'Generation', items: ['Seedance 2.0', 'ChatGPT Image 2'] },
  { group: 'Control layer', items: ['Claude x Higgsfield MCP'] },
  { group: 'Custom skills', items: ['tig-scene-engine', 'tig-acting-task', 'cinedance'] },
];

export const films: Film[] = [
  {
    slug: 'twin-moons',
    title: 'Twin Moons',
    runtime: '0:35',
    standfirst:
      'A rooftop arena under two moons, a bladesman clearing it, and a phase assassin arriving on a burning wing.',
    logline:
      'A red-armoured bladesman clears a rooftop arena of engineered predators while a phase assassin cuts his way off a burning strike deck above the same city. The two survivors meet on wet metal under twin moons, and the rain does the talking.',
    hero: 'site/twin-moons/tm-hero',
    heroAlt:
      'A red-armoured bladesman in silhouette holds a glowing katana level while an enormous orange fireball fills the sky behind him, a hooded figure with a violet blade below him at the edge of frame.',
    strip: 'site/twin-moons/tm-strip',
    stripAlt:
      'A four frame contact strip from Twin Moons: a pale creature struck by a blue blade, the bladesman standing on a mound of corpses against the moon, two figures squaring up with drawn swords, and a leaping figure against a fireball.',
    closing: 'site/twin-moons/tm-final',
    closingAlt:
      'The two survivors circle each other on a wet, glowing arena floor between the bodies of pale predators, one carrying a violet blade and one a cyan blade.',
    spec: [
      { key: 'Runtime', value: '0:35' },
      { key: 'Blocks', value: '8 generation blocks, 18 internal cuts' },
      ...SHARED_SPEC,
    ],
    stack: SHARED_STACK,
    beats: [
      {
        letter: 'A',
        time: '0:00',
        name: 'Contact',
        image: 'site/twin-moons/tm-a-contact',
        alt: 'A huge pale predator lunges with a burning orange blade while the small red-armoured bladesman crouches under the swing, blood arcing across the rain-soaked arena floor.',
      },
      {
        letter: 'B',
        time: '0:04',
        name: 'The Brute',
        image: 'site/twin-moons/tm-b-brute',
        alt: 'The predator squares up head on with its orange blade held low, two moons behind it, a small armoured figure falling towards it from the top of the frame.',
      },
      {
        letter: 'C',
        time: '0:08',
        name: 'The Mound',
        image: 'site/twin-moons/tm-c-mound',
        alt: 'The bladesman stands on a mound of pale corpses with his sword driven down into them, framed against a full moon in heavy rain.',
      },
      {
        letter: 'D',
        time: '0:11',
        name: 'Shockwave',
        image: 'site/twin-moons/tm-d-shockwave',
        alt: 'Seen from overhead, a hooded figure stands at the centre of a violet shockwave ring with armoured bodies thrown outward across a metal deck.',
      },
      {
        letter: 'E',
        time: '0:15',
        name: 'Tracer Run',
        image: 'site/twin-moons/tm-e-tracer',
        alt: 'The hooded assassin runs across a rooftop trailing a violet blade, a jet banking past neon towers behind him and sparks striking the deck.',
      },
      {
        letter: 'F',
        time: '0:19',
        name: 'The Fireball',
        image: 'site/twin-moons/tm-f-fireball',
        alt: 'A small figure rides the nose of a burning aircraft as it falls through a neon skyline with an enormous fireball behind it.',
      },
      {
        letter: 'G',
        time: '0:22',
        name: 'The Meeting',
        image: 'site/twin-moons/tm-g-meeting',
        alt: 'The hooded assassin and the red-armoured bladesman face each other in close up with a bright blue blade held level between them.',
      },
      {
        letter: 'H',
        time: '0:28',
        name: 'Blade Lock',
        image: 'site/twin-moons/tm-h-lock',
        alt: 'The hooded assassin in three quarter view with the red-armoured bladesman’s shoulder plate filling the right of frame, cyan light streaking the wet deck behind them.',
      },
    ],
    cast: [
      { tag: '@shogun_v1', name: 'Red Moon Shogun' },
      { tag: '@ronin_v1', name: 'Neon Void Ronin' },
      { tag: '@raptor_v1', name: 'Moonclaw predator, raptor form' },
      { tag: '@brute_v1', name: 'Moonclaw predator, brute form' },
      { tag: '@arena_v1', name: 'Twin Moon duel platform' },
      { tag: '@strike_v1', name: 'Strike platform' },
    ],
    spine: [],
    pipeline: [],
    look: [],
    locks: [],
  },

  {
    slug: 'skyrunner',
    title: 'Skyrunner',
    runtime: '0:30',
    standfirst:
      'A glider run through a floating city, flown along a route drawn by hand before a single frame was generated.',
    logline:
      'A pocket-sized scout flies her own glider through a floating spire city, threads the arcane rings and the waterfalls at full speed, drops onto a terrace held by armoured enforcers, and gets off the machine already fighting.',
    hero: 'site/skyrunner/sr-hero',
    heroAlt:
      'The glider seen from behind with its wings spread, diving past a pale tower through blue and violet cloud.',
    strip: 'site/skyrunner/sr-strip',
    stripAlt:
      'A four frame contact strip from Skyrunner: the glider leaving a launch balcony, banking over the spire city, threading a vortex, and the pilot fighting on a terrace.',
    closing: 'site/skyrunner/sr-final',
    closingAlt:
      'The fox pilot squares up to an armoured enforcer on a wet terrace with a blue blade in her hand and a colossal statue standing behind them.',
    spec: [
      { key: 'Runtime', value: '0:30' },
      { key: 'Blocks', value: '6 generation blocks, chase camera' },
      ...SHARED_SPEC,
    ],
    stack: SHARED_STACK,
    beats: [
      {
        letter: 'A',
        time: '0:00',
        name: 'Launch',
        image: 'site/skyrunner/sr-a-launch',
        alt: 'The glider drops away from a stone balcony into a floating city of domes and waterfalls beneath a violet beam.',
      },
      {
        letter: 'B',
        time: '0:05',
        name: 'Ring Run',
        image: 'site/skyrunner/sr-b-rings',
        alt: 'The glider banks hard through arcane rings above the spire city with the towers blurred by speed.',
      },
      {
        letter: 'C',
        time: '0:10',
        name: 'The Canyon',
        image: 'site/skyrunner/sr-c-canyon',
        alt: 'The glider climbs past a tall spire with its wings catching the light and violet streaks crossing the clouds.',
      },
      {
        letter: 'D',
        time: '0:16',
        name: 'The Vortex',
        image: 'site/skyrunner/sr-d-vortex',
        alt: 'The glider threads a narrow gap between a wall of blue water and a face of violet cloud.',
      },
      {
        letter: 'E',
        time: '0:20',
        name: 'Touchdown',
        image: 'site/skyrunner/sr-e-touchdown',
        alt: 'A small fox pilot in goggles leaps clear as the glider skids across a wet terrace in a sheet of spray.',
      },
      {
        letter: 'F',
        time: '0:23',
        name: 'The Terrace',
        image: 'site/skyrunner/sr-f-terrace',
        alt: 'The fox pilot ducks under an armoured enforcer’s swing on a wet terrace with sparks bursting behind her and more enforcers closing in.',
      },
    ],
    cast: [
      {
        tag: '@lyrian_v1',
        name: 'Lyrian, the scout',
        image: 'site/skyrunner/sr-e-dismount',
        alt: 'The fox pilot crouches on a wet terrace with one hand down and the glider hovering behind her beside a waterfall.',
      },
      { tag: '@skyrunner_v1', name: 'The glider' },
      { tag: '@enforcer_v1', name: 'Terrace enforcer' },
      { tag: '@spires_v1', name: 'The spire city' },
    ],
    route: {
      image: 'site/skyrunner/sr-route-map',
      alt: 'The route map: a dashed yellow flight path drawn across a painted plate of the spire city, with six numbered waypoints marked launch, rings, canyon, climb, vortex and terrace.',
      caption: 'Flight path drawn straight onto the city plate.',
      waypoints: [
        { num: '1', name: 'Launch' },
        { num: '2', name: 'Rings' },
        { num: '3', name: 'Canyon' },
        { num: '4', name: 'Climb' },
        { num: '5', name: 'Vortex' },
        { num: '6', name: 'Terrace' },
      ],
      // The two paragraphs and the position reference block come from sheet 04
      // of the process document. The map itself carries them down its right
      // edge, clipped by the crop, so they are not transcribed here.
      body: [],
    },
    spine: [],
    pipeline: [],
    look: [],
    locks: [],
  },
];

export const findFilm = (slug: string): Film | undefined => films.find((f) => f.slug === slug);

// A beat with no still would render an empty block, and Frame would throw with
// a less useful message than this one.
{
  const missing = films.flatMap((f) =>
    f.beats.filter((b) => !b.image || !b.alt).map((b) => `${f.slug}/${b.letter}`)
  );
  if (missing.length) {
    throw new Error(`Film beats with no still or no alt text: ${missing.join(', ')}`);
  }
}
