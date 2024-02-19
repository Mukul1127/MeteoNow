import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import compress from "astro-compress";
import path from "path"

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), compress()],
  vite: {
    resolve: {
      alias: {
        "@": path.resolve("./src/")
      }
    }
  }
});