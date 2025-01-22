import { defineConfig } from 'astro/config';

// https://astro.build/config
import react from "@astrojs/react";
import vue from "@astrojs/vue";


import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [ tailwind(),vue(),react()],
  server: {
    proxy: {
      '/backend': {
        target: '//127.0.0.1:1501/',
        secure: false,
        autoRewrite: true,
        changeOrigin: true,
        rewrite: (path)  => path.replace(/^\/backend/,  ''),
      },
    }
  },
  buildOptions: {
    outdir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    minify: true,
    compressHTML: true,
    minifyCSS: true,
    rollupOptions: {
      plugins: [
        vue(),
        react(),
        tailwind(),
      ],
    },
  }

});