import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  server: {
    port: 3000,
    host: true,
    strictPort: true,
    open: '/index.html',
    hmr: true
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        record: resolve(__dirname, "src/visit-record.html"),
        vaccination: resolve(__dirname, "src/vaccination.html"),
        diseases: resolve(__dirname, "src/diseases.html"),
      },
    },
  },
  preview: {
    port: 3000,
    host: true
  },
  base: '/'
});
