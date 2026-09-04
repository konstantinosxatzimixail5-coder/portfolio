// The words on the three pages that are not a case study.
//
// Field by field, laid over whatever the dataset holds. A field named here is
// the version that renders; a field left out comes off Sanity untouched. That
// rule is deliberately narrow, so publishing in the Studio keeps working for
// everything this file does not have an opinion about.
//
// Two of the sentences below are also a bug fix. The counted numbers on the
// front page and the spec shelf are written as {tokens} and filled in at build
// time, and three of them had been typed as their answers instead: {3} where
// {pipelines} belonged, {Six} and {31} where {brands} and {count} belonged. An
// unknown token is left on the page rather than blanked, which is how they were
// spotted, and it is why they read as punctuation to anyone who saw the page.

import { blocks } from './blocks';
import { local } from './video';

export const home = {
  headline: 'I make the films and the pictures a shoot could not pay for.',

  lede: 'Generated product photography, synthetic creators, and the production lines that keep both of them honest. I write the brief, build the line, run the gates, and hand over the folder with the working files still in it.',

  note: 'Athens, in Greek and English, under my own studio. Every piece below says on its face whether somebody paid for it or I set the brief myself.',

  contents: [
    {
      _key: 'k5p',
      _type: 'object',
      num: '01',
      label: 'Reel',
      rail: 'Reel',
      href: '#reel',
      note: 'Ninety seconds, and what my hand actually did on each piece',
    },
    {
      _key: 'k5q',
      _type: 'object',
      num: '02',
      label: 'Selected work',
      rail: 'Selected work',
      href: '#work',
      note: '{count} projects, brief to delivery, films included',
    },
    {
      _key: 'k5r',
      _type: 'object',
      num: '03',
      label: 'AI filmmaking workflows',
      rail: 'Workflows',
      href: '#pipelines',
      note: 'Stage by stage, tools named, with the gates that stop a frame',
    },
    {
      _key: 'k5s',
      _type: 'object',
      num: '04',
      label: 'Spec shelf',
      href: '/spec/',
      note: 'Brands I invented so the label had nowhere to hide',
    },
    {
      _key: 'k5t',
      _type: 'object',
      num: '05',
      label: 'Writing',
      rail: 'Writing',
      href: '#writing',
      note: 'Scripts, ghostwriting, and fifteen posts for the studio',
    },
    {
      _key: 'k5u',
      _type: 'object',
      num: '06',
      label: 'About and contact',
      rail: 'About',
      href: '#about',
      note: 'CV, the studio, and the fastest way to reach me',
    },
  ],

  reelHeading: 'Ninety seconds',
  reelNote:
    'One cut, and underneath it every shot in order: what it came from, which line made it, and what I did on it. Client work and spec work are marked apart in that list, because a reel that blurs the two is asking you to credit me for a budget I never had.',

  workHeading: 'Selected work',
  workMore: blocks(
    'Client engagements, my own studio, and the pieces nobody asked for, each labelled as what it is. The invented brands keep a shelf of their own.'
  ),

  pipelinesHeading: 'AI filmmaking workflows',
  pipelinesIntro:
    'Seven of these exist. {pipelines} are on this page in full: the stages, what runs each one, what gets fixed there, and the control gates that stop a frame from shipping. The tools are named. So are the ways each line fails, because that is the part you cannot find out from a showreel.',

  writingHeading: 'Writing',
  writingMore: 'Samples on request, in either language.',

  // The one body of writing with a public address, so it gets a block of its
  // own under the list rather than a fifth row inside it. Set at the size of
  // the titles above it: it is another kind of writing, not a louder one.
  writingStudio: {
    flag: 'Ongoing, published',
    title: 'SEO & AIO blog posts for TaleCrafters Studio',
    note: 'Fifteen posts so far, each one written against a question somebody types: what generative video costs in 2026, what the EU AI Act now makes an advertiser label, how a master plate holds one product across a hundred shots. Written for search and for the answer engines reading over its shoulder, with the sources cited and the numbers sourced.',
    link: { label: 'Read them', href: 'https://talecrafters.studio/blog' },
  },

  aboutHeading: 'About and contact',
  aboutBody: blocks(`I am a writer and director in Athens, and I run TaleCrafters, a synthetic media and creative systems studio registered in London.

Most of my week goes on generated stills and film for brands that need volume: product sets, creator ads, explainers, and the scripts underneath them. The rest goes on building the lines that produce them, so a team can keep running the work after I have left the room.

The thing I care about is the gate. Anyone can generate a frame that looks right at thumbnail size. What makes it work is a written test the frame has to pass before anybody sees it, and the discipline to send it back when it fails instead of retouching it into shape.

Learn the rules like a pro so you can break them like an artist. I have run that as a production method for long enough that it now shows up in the work as a naming convention and a run log.`),

  seoTitle: 'Konstantinos Chatzimichail, AI-Enabled Marketing Designer & Creative Producer',
  seoDescription:
    'Writer and director in Athens. Generated product photography, synthetic creators and brand films, with the production lines and control gates behind them written out in full.',
};

export const settings = {
  navLinks: [
    { _key: 'k5k', _type: 'object', key: 'work', label: 'Work', href: '/#work' },
    { _key: 'k5l', _type: 'object', key: 'pipelines', label: 'Workflows', href: '/#pipelines' },
    { _key: 'k5m', _type: 'object', key: 'spec', label: 'Spec', href: '/spec/' },
    { _key: 'k5n', _type: 'object', key: 'writing', label: 'Writing', href: '/#writing' },
    { _key: 'k5o', _type: 'object', key: 'about', label: 'About', href: '/#about' },
  ],
};

export const specPage = {
  lede: '{brands} brands that do not exist, {count} frames, every one of them set by me. Nobody commissioned any of it and nobody paid for it.',
  note: 'Each one was built to break something specific. A wordmark that has to survive five sets. A pack claim a model would happily invent. One face under three different light sources. Two of them end on a billboard, which is the exam that punishes a wobble hardest, because the viewer has to read the same object as flat artwork and as a solid thing in the same second. The brand is the excuse. The gate underneath it is the point.',
  seoTitle: 'Spec shelf, Konstantinos Chatzimichail',
  seoDescription:
    'Six invented brands, built to break a specific failure. Product sets, creator ads and two anamorphic billboards, self-initiated, each with the control gate it was made to prove.',
};

// The cut is up. Setting the id here does two things on its own: /reel swaps
// the three standing-in frames for a player, and the badge on the front page
// stops saying the cut is coming and starts saying play it.
//
// The poster is the cover of the upload rather than a frame from inside it, so
// what a visitor clicks and what they get are the same picture. Swap it for a
// still from the cut in the Studio if you would rather the page stayed quiet.
export const reelPage = {
  host: 'youtube',
  videoId: '96fsW49yKuo',
  poster: local(
    'reel/poster',
    'The showreel cover: an illustrated portrait of me pointing at camera over a night city, surrounded by an edit timeline, a clapperboard, a camera body and a growth chart, under the word SHOWREEL in yellow brush type.'
  ),
  lede: 'One cut. Under it, every shot in order, with the piece it came from, the line that made it, and what I actually did on it.',
};
