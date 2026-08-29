// Is this document actually in the repository yet?
//
// The film pages and the pipeline pages both end with a reader pointing at a
// process sheet, and several of those sheets have not been supplied. A reader
// pointing at a missing file is the one thing the brief rules out: never an
// empty frame. So the page asks here first, and simply omits the section until
// the file exists.
//
// This runs at build time in Node, which is the only time it can run: the output
// is static, so whatever is true here is baked into the HTML. Drop a PDF into
// public/docs/ and the next build grows the section on its own.

import { existsSync } from 'node:fs';
import { join } from 'node:path';

export const docExists = (path: string): boolean =>
  existsSync(join(process.cwd(), 'public', path.replace(/^\//, '')));

// The address a pipeline's sheet lives at, if it has been supplied.
export const pipelineDoc = (id: string) => `/docs/pipelines/${id}.pdf`;
