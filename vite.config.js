import { resolve } from "path";
const { defineConfig } = require("vite");

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist', // Establecer la carpeta de salida en el directorio raíz
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
      },
    },
  },
  server: {
    port: 3000,
  },
});
