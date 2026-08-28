// A development fixture. Not content.
//
// Every word on the public site is edited in Sanity, and a checkout with no
// project id cannot read a single one of them, so it cannot render a page, and
// nobody can work on the layout or the styling without credentials. That is a
// bad trade for a static site whose CSS is most of its craft.
//
// Setting SANITY_FIXTURE=1 makes the build read this file instead of the
// dataset. The shapes are exactly the shapes the real queries return, so a page
// that renders against this renders against production. The prose is
// deliberately flat and says what it is, because a fixture that reads like copy
// is a fixture that ends up deployed.
//
// It is opt-in and it fails closed: with the variable unset the site still
// refuses to build without SANITY_PROJECT_ID, which is the behaviour a deploy
// host needs. The pictures are real, committed derivatives, so the layout is
// exercised at true aspect ratios rather than against grey boxes.

const img = (assetId: string, alt: string, label?: string) => ({
  alt,
  label,
  assetId,
  hotspot: null,
});

// Real asset ids for pictures already committed under public/img/cms/. Only the
// hash in the middle is read, so the dimensions here are nominal.
const A = {
  tall: 'image-08719975482e7a5d6091175be6647dab51ade6b1-472x850-jpg',
  tall2: 'image-739860636a8b8a6ca658b31c70984631d8c9a5ed-480x860-jpg',
  portrait: 'image-2d17ac694a9e340a975ca2019173e51bb1a0880e-960x1280-jpg',
  portrait2: 'image-233b510f6f747f15a7a078d60f84307f3a151426-960x1200-jpg',
  square: 'image-5688dad221bd28b765839cb34f9426743f0a7b89-1600x1600-jpg',
  square2: 'image-b04d78a7bdf7490009423d754587f5a92eba0641-960x960-jpg',
  wide: 'image-0ff77e7158415bce8679af3106a399ea59582683-1600x900-jpg',
  wide2: 'image-7d81ba6d62e40960dc01c38cd50d5e424996e994-1600x900-jpg',
  landscape: 'image-634548ee8cb159250b59514fc13a9a91542c77dd-960x640-jpg',
};

const ALT = 'Fixture picture standing in for a photograph edited in the Studio.';

const blocks = (...paragraphs: string[]) =>
  paragraphs.map((text, i) => ({
    _type: 'block',
    _key: `b${i}`,
    children: [{ _type: 'span', _key: `s${i}`, text, marks: [] }],
    markDefs: [],
  }));

export const settings = {
  name: 'Konstantinos Chatzimichail',
  role: 'Fixture role line, replaced by Site settings in the Studio',
  base: 'Fixture location',
  email: 'konstantinos.xatzimixail5@gmail.com',
  monogram: 'K/C',
  footerNote: 'Development fixture. Not the published content.',
  domain: 'http://localhost:4321',
  cv: '/Konstantinos_Chatzimichail_CV.pdf',
  studio: { label: 'talecrafters.studio', href: 'https://talecrafters.studio/' },
  links: [
    { label: 'Email', href: 'mailto:konstantinos.xatzimixail5@gmail.com' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/konstantinos-chatzimichail/' },
  ],
  navLinks: [
    { label: 'Work', href: '/#work', key: 'work' },
    { label: 'Pipelines', href: '/#pipelines', key: 'pipelines' },
    { label: 'Captures', href: '/#captures', key: 'captures' },
    { label: 'Spec', href: '/#spec', key: 'spec' },
    { label: 'Writing', href: '/writing/', key: 'writing' },
    { label: 'About', href: '/#about', key: 'about' },
  ],
};

export const home = {
  headline: 'Fixture headline, one line, set from the Studio.',
  lede: 'Fixture lede. Two sentences of about the length the real one runs to, so the column width is exercised honestly rather than optimistically.',
  note: 'Fixture note, the quiet line under the lede.',
  openImage: img(A.tall, ALT, 'fixture'),
  contents: [
    { num: '01', href: '#reel', label: 'Reel', rail: 'Reel', note: 'Fixture note' },
    { num: '02', href: '#work', label: 'Selected work', rail: 'Selected work', note: '{count} projects' },
    { num: '03', href: '#pipelines', label: 'Pipelines', rail: 'Pipelines', note: 'Fixture note' },
    { num: '04', href: '#captures', label: 'Captures', rail: 'Captures', note: 'Fixture note' },
    { num: '05', href: '#spec', label: 'Spec shelf', rail: 'Spec shelf', note: 'Fixture note' },
    { num: '06', href: '#writing', label: 'Writing', rail: 'Writing', note: 'Fixture note' },
    { num: '07', href: '#about', label: 'About and contact', rail: 'About', note: 'Fixture note' },
  ],
  reelHeading: 'Ninety seconds',
  reelBadgePlay: 'Play the cut',
  reelBadgePending: 'The cut, piece by piece',
  reelNote: 'Fixture note under the reel trio.',
  workHeading: 'Selected work',
  workMore: blocks('Fixture paragraph under the work grid.'),
  pipelinesHeading: 'Pipelines',
  pipelinesIntro:
    '{pipelines} of the seven are on this page in full, with the stages, what runs each one and the control gates.',
  writingHeading: 'Writing',
  writingItems: [{ title: 'Fixture entry', note: 'Fixture note' }],
  writingMore: 'Fixture line under the writing list.',
  aboutHeading: 'About and contact',
  aboutBody: blocks(
    'Fixture paragraph one, carrying the section.',
    'Fixture paragraph two, quieter, a footnote to the first.'
  ),
  seoTitle: 'Fixture title',
  seoDescription: 'Fixture description.',
};

export const reel = {
  title: 'Fixture reel',
  duration: '1:30',
  host: 'vimeo',
  videoId: '',
  heading: 'Fixture reel heading',
  lede: 'Fixture reel lede.',
  pendingNote: 'Fixture pending note.',
  poster: img(A.wide, ALT),
  trio: [img(A.portrait, ALT), img(A.portrait2, ALT), img(A.square, ALT)],
  shotsHeading: 'Running order',
  shotsRail: 'Shots',
  shots: [
    { num: '01', what: 'Fixture shot', kind: 'Client', pipeline: 'Fixture pipeline', did: 'Fixture credit' },
  ],
  seoTitle: 'Fixture reel title',
  seoDescription: 'Fixture reel description.',
};

export const specPage = {
  flag: 'Spec, self-initiated',
  heading: 'Fixture spec shelf',
  lede: '{brands} brands and {count} frames, none of them a client.',
  note: 'Fixture note.',
  seoTitle: 'Fixture spec title',
  seoDescription: 'Fixture spec description.',
};

// The five case study sections are rich text in the schema, so they are rich
// text here. Handing a string to RichText fails at render rather than at type
// check, which is exactly the class of drift a fixture is supposed to catch.
const section = (name: string) =>
  blocks(
    `Fixture ${name}. Long enough to fill a paragraph and short enough to read, so the measure and the rhythm of the case study page are exercised at something like real length.`,
    `Fixture ${name}, second paragraph, so the spacing between two of them is exercised too.`
  );

export const work = [1, 2, 3, 4, 5, 6].map((n) => ({
  slug: `fixture-${n}`,
  title: `Fixture project ${n}`,
  client: `Fixture client ${n}`,
  kind: n === 6 ? 'Spec, self-initiated' : 'Client',
  year: '2026',
  place: 'Fixture place',
  order: n,
  problem: `Fixture problem line for project ${n}, set in the display face.`,
  brief: section('brief'),
  constraint: section('constraint'),
  built: section('what was built'),
  how: section('how it was built'),
  landed: section('where it landed'),
  hero: img(n % 2 ? A.landscape : A.wide2, ALT),
  gallery: [img(A.square, ALT), img(A.square2, ALT), img(A.portrait, ALT)],
  video: null,
  stack: ['Fixture tool', 'Fixture tool'],
  links: [{ label: 'Fixture link', href: 'https://example.com/' }],
}));

export const pipelines = [
  { id: 'fixture-03', num: '03', title: 'Fixture pipeline three' },
  { id: 'fixture-05', num: '05', title: 'Fixture pipeline five' },
  { id: 'fixture-07', num: '07', title: 'Fixture pipeline seven' },
].map((p) => ({
  ...p,
  mechanism: 'Fixture mechanism',
  summary: 'Fixture summary of what this line does and what arrives at the end of it.',
  loop: 'Fixture loop length.',
  stages: ['One', 'Two', 'Three', 'Four', 'Five', 'Six'].map((name) => ({
    name,
    model: 'Fixture tool',
    fixes: 'Fixture description of what this stage fixes, at roughly the length the real ones run to.',
    time: 'Fixture time',
  })),
  gates: ['Fixture gate A', 'Fixture gate B', 'Fixture gate C', 'Fixture gate D'].map((name) => ({
    name,
    test: 'Fixture test.',
    fail: 'Fixture failure mode.',
  })),
}));

export const specBrands = [1, 2, 3, 4].map((n) => ({
  id: `fixture-brand-${n}`,
  num: String(n).padStart(2, '0'),
  name: `Fixture brand ${n}`,
  product: 'Fixture product',
  proves: `Fixture line saying which control gate brand ${n} was built to break.`,
  note: 'Fixture note.',
  pipeline: { label: 'Fixture pipeline', href: '/#pipelines' },
  shots: [img(A.square, ALT), img(A.portrait2, ALT), img(A.tall2, ALT), img(A.square2, ALT)],
}));

// The fixture answers by document id, the same way the real queries select. A
// query this does not recognise throws, rather than returning an empty array
// that would look like an empty dataset.
export function fetchFixture<T>(query: string): T {
  if (query.includes('"siteSettings"')) return settings as T;
  if (query.includes('"homePage"')) return home as T;
  if (query.includes('"reelPage"')) return reel as T;
  if (query.includes('"specPage"')) return specPage as T;
  if (query.includes('_type == "work"')) return work as T;
  if (query.includes('_type == "pipeline"')) return pipelines as T;
  if (query.includes('_type == "specBrand"')) return specBrands as T;
  throw new Error(
    `SANITY_FIXTURE is on and src/lib/fixture.ts has no answer for this query:\n${query}\n` +
      `Add one, or unset SANITY_FIXTURE and build against the dataset.`
  );
}
