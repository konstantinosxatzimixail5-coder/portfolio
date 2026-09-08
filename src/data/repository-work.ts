// Elladistan began as a linked film on the work shelf. It now has enough
// process material to earn the same case-study structure as the client work.
// The images and video poster already live in the repository manifest.

const blocks = (paragraphs: string[]) =>
  paragraphs.map((text, i) => ({
    _type: 'block' as const,
    _key: `elladistan-${i}`,
    style: 'normal' as const,
    markDefs: [],
    children: [{ _type: 'span' as const, _key: `elladistan-${i}-span`, text, marks: [] }],
  }));

export const elladistanWork = {
  slug: 'elladistan',
  title: 'Elladistan',
  client: 'Elladistan',
  kind: 'Spec, self-initiated',
  year: '2025',
  place: 'Greece',
  order: 999,
  problem:
    'I turned my lyrics about Greek public life into a vertical musical satire styled after a 1990s Saturday-morning cartoon.',
  cardProblem:
    'My lyrics, a Suno cartoon theme and a vertical short built with Nano Banana, Grok Imagine and CapCut.',
  brief: blocks([
    'I wanted the satire to work as a song first. I wrote the lyrics around recognisable parts of Greek public life, then planned a short cartoon in which each verse could carry its own visual gag.',
    'The final piece had to feel like the opening titles of a 1990s Saturday-morning programme while remaining legible as a vertical social film.',
  ]),
  constraint: blocks([
    'Each scene began as a separate still, so recurring faces, costumes and objects could drift between shots. The music also fixed the duration of every beat before I animated a frame.',
  ]),
  built: blocks([
    'I made one original song and a complete 9:16 film. The cut uses generated cartoon scenes, character animation, timed captions and sound design around the finished track.',
  ]),
  how: blocks([
    'I wrote the lyrics first. I then used Suno to test melodies until the song found the right register, a brassy 1990s Saturday-morning cartoon theme.',
    'Next, I generated every key image in Nano Banana. I treated each picture as a storyboard frame and carried the character details from one scene into the next.',
    'Grok Imagine turned those stills into motion. I selected the takes that preserved the drawing and matched the lyric timing, then assembled the film, captions and final audio in CapCut.',
  ]),
  landed: blocks([
    'I published Elladistan as a self-initiated vertical short. The full film plays on this page.',
  ]),
  hero: {
    key: 'site/video/greece-satire-card',
    alt: 'Two wide-eyed cartoon trains meet head on above a level crossing while their drivers lean from the cabs and the word ΜΠΑΜ fills the sky.',
    label: 'Elladistan, final frame',
  },
  gallery: [],
  video: null,
  videos: [],
  stack: [
    { stage: 'Writing', tool: 'My original lyrics' },
    { stage: 'Music', tool: 'Suno' },
    { stage: 'Key images', tool: 'Nano Banana' },
    { stage: 'Animation', tool: 'Grok Imagine' },
    { stage: 'Edit', tool: 'CapCut' },
  ],
  links: [],
};
