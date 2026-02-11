import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://kim-hojoon.github.io',
  output: 'static',
  integrations: [sitemap()],
  build: {
    assets: '_assets',
  },
});
