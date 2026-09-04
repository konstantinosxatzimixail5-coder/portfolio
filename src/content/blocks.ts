// The body copy in this folder is written as plain strings, because a paragraph
// is easier to read and to edit as a paragraph than as an array of objects.
//
// Every page renders body copy through RichText, which takes portable text: the
// shape Sanity returns. So the strings are turned into that shape here, once, at
// the boundary. One blank line starts a new paragraph, which is the same rule
// the rest of the world uses for prose.

export interface Block {
  _type: 'block';
  _key: string;
  style: 'normal';
  children: { _type: 'span'; _key: string; text: string; marks: string[] }[];
  markDefs: never[];
}

// Keys only have to be unique inside one document, and these are generated from
// the position, so the same string always produces the same keys. That keeps a
// rebuild from showing up as a diff of nothing but identifiers.
export function blocks(text: string): Block[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((paragraph, i) => ({
      _type: 'block' as const,
      _key: `b${i}`,
      style: 'normal' as const,
      children: [{ _type: 'span' as const, _key: `b${i}s0`, text: paragraph, marks: [] }],
      markDefs: [],
    }));
}
