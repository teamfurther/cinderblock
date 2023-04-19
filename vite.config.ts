import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, './src/ts/index.ts'),
      fileName: 'cinderblock',
      name: 'cinderblock',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        assetFileNames: "cinderblock.[ext]",
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  css: {
    modules: {
      localsConvention: null,
    },
  },
  plugins: [vue()],
});
