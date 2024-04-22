/// <reference types="vitest" />
import basicSsl from "@vitejs/plugin-basic-ssl";
import vue from "@vitejs/plugin-vue";
import autoprefixer from "autoprefixer";
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";

const BASE = "/xorfor/";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: BASE,
  build: {
    minify: mode !== "production",
    // prevent some warnings
    chunkSizeWarningLimit: 60000,
  },
  plugins: [vue(), basicSsl()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      inferno: "inferno/dist/index.dev.esm.js",
    },
  },
  css: {
    postcss: {
      plugins: [
        {
          postcssPlugin: "internal:charset-removal",
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === "charset") {
                atRule.remove();
              }
            },
          },
        },
        autoprefixer(),
      ],
    },
  },
  esbuild: {
    minifySyntax: mode !== "production",
    charset: "utf8",
    drop: mode === "production" ? ["console", "debugger"] : [],
  },
  server: {
    https: true,
    proxy: {
      "/api/": {
        target: "https://xorfor3.dev.xunta.local/",
        //target: "https://back/",
        secure: false,
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      reporter: ["text", "lcov", "html"],
    },
  },
}));
