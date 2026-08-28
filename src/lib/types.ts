// Shapes for the content this repository owns rather than the CMS.
// Anything Sanity supplies is typed where it is queried, in src/lib/sanity.ts.

// --- pipelines ---------------------------------------------------------------

export interface Stage {
  name: string;
  model: string; // what runs this stage
  fixes: string; // what gets fixed here
  time: string; // roughly how long
}

export interface Gate {
  name: string;
  test: string;
  fail: string;
}

export interface Pipeline {
  id: string;
  num: string;
  title: string;
  mechanism: string;
  summary: string;
  loop: string;
  stages: Stage[];
  gates: Gate[];
  // Present on the sheets, absent from the three the CMS holds. The dedicated
  // page shows them; Strip.astro ignores anything it was not given.
  discipline?: string;
  desire?: string;
  objection?: string;
  stack?: string[];
  delivers?: string[];
}

// --- writing -----------------------------------------------------------------

// A script is not an essay and should not be set like one. These are the blocks
// the writing pages can render, and the renderer refuses anything else rather
// than silently dropping it.
export type Block =
  | { t: 'lead'; text: string }
  | { t: 'p'; text: string }
  | { t: 'h'; text: string }
  | { t: 'quote'; text: string; cite?: string }
  | { t: 'list'; items: string[] }
  | { t: 'spec'; rows: { key: string; value: string }[] }
  | { t: 'beats'; rows: { time?: string; spoken: string; visual: string }[] }
  | { t: 'note'; text: string };

export type WritingCategory = 'scripts' | 'social' | 'longform';

export interface WritingSample {
  slug: string;
  title: string;
  category: WritingCategory;
  // Spec work is labelled spec everywhere it appears. This is the field that
  // does it, and nothing renders a sample without reading it.
  kind: 'Client work' | 'Spec, self-initiated';
  client?: string;
  year: string;
  format: string; // "90-second VSL, vertical, captions burned in"
  standfirst: string; // the one line that sells the piece in an index
  // Two samples sit on the front page. This is which two.
  featured?: boolean;
  // Long-form client documents are described and quoted, not republished whole.
  extractOnly?: boolean;
  meta?: { key: string; value: string }[];
  body: Block[];
}
