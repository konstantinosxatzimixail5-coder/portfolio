// The writing shelf. Every sample the site publishes, in the order it should be
// read, plus the three groups the index page sets them in.
//
// A sample is a document, not a field, so these live in the repository rather
// than in the Studio. Retyping a ninety-second script into a rich text box is
// how a script quietly loses the column that makes it a script.

import type { WritingSample, WritingCategory } from '../../lib/types';

import { xAllVsl } from './x-all-vsl';
import { espressoScripts } from './espresso-scripts';
import { mariposaVsl } from './mariposa-vsl';
import { linkedinPosts } from './linkedin-posts';
import { videoGameLaundering } from './video-game-laundering';
import { complianceEbook, knowledgeAssistantBrochure, caseStudyBrochure } from './regtech-collateral';

export const writingSamples: WritingSample[] = [
  espressoScripts,
  xAllVsl,
  mariposaVsl,
  linkedinPosts,
  videoGameLaundering,
  complianceEbook,
  knowledgeAssistantBrochure,
  caseStudyBrochure,
];

export interface WritingGroup {
  key: WritingCategory;
  num: string;
  title: string;
  note: string;
  samples: WritingSample[];
}

// The three groups the shelf is set in. Scripts first, because that is the work
// the rest of the site is about, and the long form last, because it is the part
// a reader arrives at already convinced.
const GROUPS: { key: WritingCategory; title: string; note: string }[] = [
  {
    key: 'scripts',
    title: 'Direct response and VSL',
    note: 'Ninety-second scripts, hook batteries and the cutdowns marked inside them.',
  },
  {
    key: 'social',
    title: 'Feed writing',
    note: 'Ghostwritten posts, written against a voice file rather than from a blank page.',
  },
  {
    key: 'longform',
    title: 'Long form and editorial',
    note: 'White papers, ebooks and product collateral, mostly for regulated readers.',
  },
];

export const writingGroups: WritingGroup[] = GROUPS.map((g, i) => ({
  ...g,
  num: String(i + 1).padStart(2, '0'),
  samples: writingSamples.filter((s) => s.category === g.key),
})).filter((g) => g.samples.length > 0);

// The two that stand on the front page. Kept to two on purpose: a front page
// that lists eight samples has stopped recommending anything.
export const featuredWriting = writingSamples.filter((s) => s.featured);

export const findSample = (slug: string): WritingSample | undefined =>
  writingSamples.find((s) => s.slug === slug);

// A sample with no group would be published and unreachable, which is the kind
// of thing nobody notices for a year. Fail the build instead.
{
  const grouped = new Set(writingGroups.flatMap((g) => g.samples.map((s) => s.slug)));
  const orphans = writingSamples.filter((s) => !grouped.has(s.slug));
  if (orphans.length) {
    throw new Error(
      `Writing samples with no group: ${orphans.map((s) => s.slug).join(', ')}. ` +
        `Add the category to GROUPS in src/data/writing/index.ts.`
    );
  }
  if (featuredWriting.length === 0) {
    throw new Error('No writing sample is marked featured, so the front page section would be empty.');
  }
}
