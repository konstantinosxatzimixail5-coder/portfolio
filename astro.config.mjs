import { defineConfig } from 'astro/config';

export default defineConfig({
  // No `site` here on purpose. The canonical URL and the link-preview tags are
  // built from the domain field in the CMS, so that value is edited in one place
  // and cannot drift out of step with a second copy kept in this file.
  output: 'static',

  // Old addresses that people and search engines already hold. A static build
  // renders each of these as a small page carrying a meta refresh and a
  // canonical link at the new address, which is what keeps an existing link
  // from turning into a 404 the day a section gets renamed.
  redirects: {
    '/spec': '/product',
    '/spec/': '/product/',
  },
  build: { inlineStylesheets: 'auto' },
  compressHTML: true,
  devToolbar: { enabled: false },
});
