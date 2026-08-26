import { defineConfig } from 'astro/config';

export default defineConfig({
  // No `site` here on purpose. The canonical URL and the link-preview tags are
  // built from the domain field in the CMS, so that value is edited in one place
  // and cannot drift out of step with a second copy kept in this file.
  output: 'static',
  build: { inlineStylesheets: 'auto' },
  compressHTML: true,
  devToolbar: { enabled: false },
});
