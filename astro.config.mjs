import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://konstantinoschatzimichail.com',
  output: 'static',
  build: { inlineStylesheets: 'auto' },
  compressHTML: true,
  devToolbar: { enabled: false },
});
