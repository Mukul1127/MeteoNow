import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: { rollupOptions: { input: {
    main: resolve(__dirname, "index.html"),
    Today: resolve(__dirname, "Today/index.html"),
    Future: resolve(__dirname, "Future/index.html"),
  } } }
});
