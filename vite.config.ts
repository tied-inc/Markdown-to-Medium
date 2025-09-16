import path from "node:path";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import env from "vite-plugin-env-compatible";
import { VitePluginRadar } from "vite-plugin-radar";
import config from "./src/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    env({ prefix: "VITE", mountedPath: "process.env" }),
    VitePluginRadar({
      // Set to true to enable scripts in development environment
      enableDev: false,

      // Google Tag Manager configuration
      gtm: [
        {
          // Set your GTM container ID (e.g., GTM-XXXXXXX)
          id: config.gtm,

          // Optional: Use custom GTM script source
          // gtmBase: 'https://www.custom.com/gtm.js',
          // nsBase: 'https://www.custom.com/ns.html',

          // Optional: GTM environment configuration
          // environment: {
          //   auth: 'X1YzAB2CDEFGh3ijklmnoP',
          //   preview: 'env-x',
          // },
        },
      ],
    }),
    sentryVitePlugin({
      org: config.sentry.org,
      project: config.sentry.project,
      authToken: config.sentry.authToken,
    }),
  ],

  base: "./",

  server: {
    port: 3000,
    open: true,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    sourcemap: true,
  },
});
