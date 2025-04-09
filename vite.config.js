import { resolve } from "path";
const { defineConfig } = require("vite");

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        record: resolve(__dirname, "src/visit-record.html"),
        vaccination: resolve(__dirname, "src/vaccination.html"),
        diseases: resolve(__dirname, "src/diseases.html"),
      },
    },
  },
  server: {
    port: 3000,
  },
});
