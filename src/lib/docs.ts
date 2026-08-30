// Is this document actually in the repository yet?
//
// The film pages and the long-form writing pages publish a document under the
// write-up. A reader pointing at a missing file is the one thing that must never
// happen: never an empty frame. So the page asks here first and omits the
// section when the answer is no.
//
// Pipeline pages have no reader on purpose. Their sheets are transcribed onto
// the page in full, and embedding the PDF underneath would be the same document
// printed twice.
//
// This runs at build time in Node, which is the only time it can run: the output
// is static, so whatever is true here is baked into the HTML. Drop a PDF into
// public/docs/ and the next build grows the section on its own.

import { existsSync } from 'node:fs';
import { join } from 'node:path';

export const docExists = (path: string): boolean =>
  existsSync(join(process.cwd(), 'public', path.replace(/^\//, '')));
