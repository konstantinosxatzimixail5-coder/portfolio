// Some sentences on the site carry a number that has to match what is actually
// published: "six client projects", "three of the seven". Typed by hand those
// numbers go stale the moment a project is added, and nothing complains, because
// a wrong number is still a valid sentence. So the CMS stores a token and the
// build fills it in.

const WORDS = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
];

// Prose spells out small numbers. Past twelve it reads better as digits, which
// is also where the house style of most newsrooms puts the line.
export const words = (n: number): string => WORDS[n] ?? String(n);

// Capitalised for the start of a sentence, e.g. "Four brands that do not exist".
export const Words = (n: number): string => {
  const w = words(n);
  return w.charAt(0).toUpperCase() + w.slice(1);
};

// One rule across every field, so an editor learns it once:
//   {count}                      a figure, for mid-sentence and for captions
//   {brands}, {pipelines}, ...   spelled out with a capital, for opening a sentence
// Naming the second kind after the thing it counts also keeps two different
// numbers on one page from both answering to {count}.

/**
 * Replaces {token} in a string. An unknown token is left alone instead of being
 * blanked, so a typo shows up on the page as {breands} and gets noticed.
 */
export function fill(template: string | null | undefined, values: Record<string, string | number>) {
  if (!template) return '';
  return template.replace(/\{(\w+)\}/g, (whole, key) =>
    key in values ? String(values[key]) : whole
  );
}
