import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";

// Creación de alias
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  // GitHub Pages
  base: "/SP-frontend/",
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
    quasar({
      sassVariables: "src/quasar-variables.sass",
    }),
  ],
});
