import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { transformAssetUrls } from "@quasar/vite-plugin";

// Creación de alias
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  // GitHub Pages
  base: "/SP-Frontend/",
  resolve: {
    // Alias de las carpetas
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1600
  }
});
