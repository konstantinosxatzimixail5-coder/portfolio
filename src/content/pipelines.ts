// The fourth workflow, and the films that show what each of them produces.
//
// Three of the seven lines are published in the dataset. The animation line was
// not one of them, because until Mars Drop there was nothing finished to point
// at. There is now, so it is written out here on the same terms as the other
// three: the stages, what runs each one, what gets fixed there, and the gates
// that stop a shot from reaching a cut.
//
// The films are attached by anchor. A workflow with a film under it is a claim
// with a receipt, which is the whole argument of this section.

import { local, type Film } from './video';

export interface Stage {
  name: string;
  model: string;
  fixes: string;
  time: string;
}

export interface Gate {
  name: string;
  test: string;
  fail: string;
}

export interface Line {
  id: string;
  num: string;
  title: string;
  mechanism: string;
  summary: string;
  loop: string;
  stages: Stage[];
  gates: Gate[];
  film?: Film;
}

/* ------------------------------------------------------------------ added -- */

export const added: Line[] = [
  {
    id: 'scene-engine',
    num: '04',
    title: 'A scene, not four clips',
    mechanism: 'The episodic engine',
    summary:
      'Animation where the characters hold across shots and the performances are directed at the person listening. For work that has to carry dialogue rather than spectacle: an explainer with two people in it, an episodic strand, a short that has to be funny on a face.',
    loop:
      'A week from a written scene to a cut. Most of that week is writing, casting and timing. Two stages of it are generation.',
    stages: [
      {
        name: 'Scene',
        model: 'Written first, in full',
        fixes:
          'Every exchange, in order, before a frame exists. A dialogue scene assembled from whatever the model happened to produce is a montage with subtitles, and no amount of grading rescues it later.',
        time: 'One to two days',
      },
      {
        name: 'Beats',
        model: 'Fixed as blocks',
        fixes:
          'The scene is cut into beats and each beat gets one camera position it keeps. The cutting pattern is decided here rather than in the edit, which is what stops the piece reaching for coverage it does not need.',
        time: 'Half a day',
      },
      {
        name: 'Designs',
        model: 'Nano Banana 2, ChatGPT Image 2',
        fixes:
          'Reference sheets for every character and for the location, generated and approved before any shot. After this stage nothing in any prompt describes a character in words.',
        time: 'One day',
      },
      {
        name: 'Scene build',
        model: 'Showrunner',
        fixes:
          'The episodic engine carries the scene and the character continuity across the beats. This is the stage that makes a two-hander possible at all: the same people, in the same place, from one beat to the next.',
        time: 'One day',
      },
      {
        name: 'Performance',
        model: 'Higgsfield',
        fixes:
          'Motion on each block, directed at the listening rather than the speaking. The reaction is generated first and the line is timed to it, because a character idling through somebody else’s line is the fastest way to lose an audience.',
        time: 'One to two days',
      },
      {
        name: 'Voice and cut',
        model: 'ElevenLabs, CapCut',
        fixes:
          'Reads cut against picture rather than under it, retimed after the motion pass. Room tone, and burned-in speaker-labelled subtitles when more than one voice shares a wide.',
        time: 'One day',
      },
    ],
    gates: [
      {
        name: 'Listening gate',
        test: 'Watch the character who is not speaking, with the sound off.',
        fail: 'If they are idling rather than reacting, the beat goes back regardless of how the line reads.',
      },
      {
        name: 'Design gate',
        test: 'Cut from the wide to a single and compare proportions. The jaw is where a fail shows first.',
        fail: 'Back to the reference sheet. Never a description in words, which is what caused the drift.',
      },
      {
        name: 'Eyeline gate',
        test: 'Lay the singles side by side. Two characters in conversation have to face each other across the cut.',
        fail: 'Reshoot from the assigned camera position. Each position owns a side and nothing else gets shot.',
      },
      {
        name: 'Likeness gate',
        test: 'If a character resembles a real person, the piece has to read as parody and nothing they say can be presented as something that person said.',
        fail: 'Redesign, or the piece does not go out.',
      },
    ],
    film: {
      host: 'youtube',
      videoId: 'SjxaPMoyBSo',
      title: 'Mars Drop, the line running end to end',
      note: 'One hundred and seven seconds, two characters, one location, no action, so there is nowhere for the pipeline to hide. Watch the one who is not talking.',
      duration: '1:47',
      ratio: '16:9',
      poster: local(
        'films/mars-drop/md-poster',
        'The wide Mars colony frame: two figures in front of a landed rocket and a domed habitat.'
      ),
    },
  },
];

/** Where the new line sits. Anything not named keeps its dataset order. */
export const order = ['identity-lock', 'phantom-set', 'scene-engine', 'operator-stack'];

/* ---------------------------------------------------------------- patches -- */

export const patch: Record<string, { film?: Film }> = {
  'phantom-set': {
    film: {
      host: 'youtube',
      videoId: '5VgtoylYaFw',
      title: 'Phantom Set, taken to a billboard',
      note: 'One master plate of an invented can, then five sets, then a break-out board over a wet night street. The label gate is the whole pipeline in one test: read every printed word, at full resolution, in every frame.',
      duration: '0:08',
      ratio: '16:9',
      poster: local(
        'spec/feral/billboard',
        'The FERAL Yuzu Static can breaking out of a lit billboard over a wet night street.'
      ),
    },
  },
  'identity-lock': {
    film: {
      host: 'youtube',
      videoId: 'IDGUGwGrUCo',
      title: 'Identity Lock, one trained face on a winter path',
      note: 'One of three cuts built on the same trained identity for the same client, each aimed at a different audience. Variant forty costs what variant ten did, because the casting already exists.',
      duration: '0:13',
      ratio: '9:16',
      poster: local(
        'amino-alliance/presenter-03',
        'A man in a charcoal running top holding an Amino Alliance shaker on a park path in winter.'
      ),
    },
  },
};
