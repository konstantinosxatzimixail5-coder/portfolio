import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';

import { schemaTypes, singletons } from './schemas/index.js';
import { structure } from './structure.js';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

if (!projectId) {
  throw new Error(
    'SANITY_STUDIO_PROJECT_ID is not set. Copy studio/.env.example to studio/.env and fill it in.'
  );
}

export default defineConfig({
  name: 'kc-portfolio',
  title: 'Konstantinos Chatzimichail',
  projectId,
  dataset,

  plugins: [structureTool({ structure }), visionTool()],

  schema: {
    types: schemaTypes,
    // Keep the singletons out of the global "create new" menu. Without this the
    // plus button offers a second home page, which would publish fine and then
    // be ignored, which is the worst of both.
    templates: (prev) => prev.filter((t) => !singletons.includes(t.schemaType)),
  },

  document: {
    // Same reasoning for the per-document actions: a singleton can be edited and
    // published, but not duplicated or deleted.
    actions: (prev, { schemaType }) =>
      singletons.includes(schemaType)
        ? prev.filter(({ action }) => !['unpublish', 'delete', 'duplicate'].includes(action))
        : prev,
  },
});
