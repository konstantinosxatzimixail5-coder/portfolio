// The few words on the three non-case-study pages that this repository sets.
//
// Field by field, laid over whatever the dataset holds. A field named here is
// the version that renders; a field left out comes off Sanity untouched.
//
// The rule this file follows, after getting it wrong once: ADD, DO NOT REPLACE.
// Rewriting a paragraph in the overlay does not edit it in the Studio, it hides
// it, and a sentence hidden here is a sentence nobody can find again. So the
// only things below are numbers that had gone stale, a section that did not
// exist, and the reel id. Everything else on those pages is still the wording
// in the dataset, where it can be edited.
//
// The two token fixes are the reason this file exists at all. Counted numbers
// on the front page and the spec shelf are written as {tokens} and filled in at
// build time, and three had been typed as their answers: {3} where {pipelines}
// belonged, {Six} and {31} where {brands} and {count} belonged. An unknown token
// is left on the page rather than blanked, so those were rendering as
// punctuation. Fixed in place, with the surrounding sentence untouched.

import { blocks } from './blocks';
import { local } from './video';

export const home = {
  // Same six rows, same wording, except where a number went stale or a section
  // was added underneath. `{count}` and `{pipelines}` are filled by the page.
  contents: [
    {
      _key: 'k5p',
      _type: 'object',
      num: '01',
      label: 'Reel',
      rail: 'Reel',
      href: '#reel',
      note: 'Ninety seconds, and what my hand did on each piece',
    },
    {
      _key: 'k5q',
      _type: 'object',
      num: '02',
      label: 'Selected work',
      rail: 'Selected work',
      href: '#work',
      // Was "{count} client projects". The list now carries the studio and two
      // self-initiated pieces as well, so the word client had to go.
      note: '{count} projects, start to delivery',
    },
    {
      _key: 'k5r',
      _type: 'object',
      num: '03',
      label: 'Pipelines',
      rail: 'Pipelines',
      href: '#pipelines',
      // Was "Three of the seven". Counted now, so adding a fourth cannot leave
      // a wrong number behind.
      note: '{pipelines} of the seven, stage by stage, with the gates',
    },
    {
      _key: 'k5s',
      _type: 'object',
      num: '04',
      label: 'Spec shelf',
      href: '/spec/',
      note: 'Invented brands, product sets and creator ads',
    },
    {
      _key: 'k5t',
      _type: 'object',
      num: '05',
      label: 'Writing',
      rail: 'Writing',
      href: '#writing',
      note: 'Direct response scripts, ghostwriting, one article, and the studio blog',
    },
    {
      _key: 'k5u',
      _type: 'object',
      num: '06',
      label: 'About and contact',
      rail: 'About',
      href: '#about',
      note: 'CV, the studio, and how to reach me',
    },
  ],

  // Word for word as published, with {3} corrected to the token it was meant
  // to be. Nothing else in the sentence moved.
  pipelinesIntro:
    'Seven of these exist. {pipelines} are on this page in full: the stages, what runs each one, what gets fixed there, and the control gates that stop a frame from shipping. The tools are named. So are the ways each line fails.',

  // The one body of writing with a public address, so it gets a block of its
  // own under the list rather than a fifth row inside it. Set at the size of
  // the titles above it: another kind of writing, not a louder one.
  writingStudio: {
    flag: 'Ongoing, published',
    title: 'SEO & AIO blog posts for TaleCrafters Studio',
    note: 'Fifteen posts so far, each one written against a question somebody types: what generative video costs in 2026, what the EU AI Act now makes an advertiser label, how a master plate holds one product across a hundred shots. Written for search and for the answer engines reading over its shoulder, with the sources cited.',
    link: { label: 'Read them', href: 'https://talecrafters.studio/blog' },
  },

  // The published paragraph, unchanged, with the studio added after it. The
  // studio is a case study on this site now, so the About section saying so is
  // the one thing that had gone missing from it.
  aboutBody: blocks(`I am a writer and director working out of Athens, Greece. Most of my time goes on generated stills and film for brands that need volume: product sets, creator ads, explainers and the scripts under them. The rest goes on building the lines that produce them, so a team can run the work after I leave.

I run that work as TaleCrafters, a synthetic media and creative systems studio registered in London. The long version of every argument on this page is over there, with the gates written out.`),

  // The motto was the whole description, which reads well and tells a search
  // engine nothing. Kept, with the subject of the page in front of it.
  seoDescription:
    'Writer and director in Athens. Generated product photography, synthetic creators and brand films, with the pipelines and control gates behind them. A storyteller at heart, my motto is "Learn the rules like a pro so you can break them like an artist".',
};

export const specPage = {
  // {Six} and {31} were typed where {brands} and {count} belonged. Same
  // sentence, counted this time, so a brand or a frame added in the Studio
  // keeps the numbers right on its own.
  lede: '{brands} brands that do not exist, {count} frames, all of it set by me. Nobody commissioned any of it and nobody paid for it.',
  // Said four while six were published.
  seoDescription:
    'Six invented brands, built to test a specific failure. Product sets and creator ads, self-initiated, with the control gate each one was made to prove.',
};

// The cut is up. Setting the id does two things on its own: /reel drops the
// three standing-in frames for a player, and the badge on the front page stops
// saying the cut is coming and starts saying play it.
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
};
