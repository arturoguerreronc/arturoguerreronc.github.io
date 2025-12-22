// @ts-check
import { defineConfig } from 'astro/config';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: 'https://arturoguerrero.me',
  base: '/',
  output: 'static',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "${path.join(__dirname, 'styles/partials/_variables.scss').replace(/\\/g, '/')}" as *;
            @use "${path.join(__dirname, 'styles/partials/_mixins.scss').replace(/\\/g, '/')}" as *;
          `
        }
      }
    }
  }
});
