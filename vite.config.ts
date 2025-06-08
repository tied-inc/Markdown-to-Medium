import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePluginRadar } from "vite-plugin-radar";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePluginRadar({
      // Set to true to enable scripts in development environment
      enableDev: false,

      // Google Tag Manager configuration
      gtm: [
        {
          // Set your GTM container ID (e.g., GTM-XXXXXXX)
          id: process.env.VITE_GTM_ID || "GTM-XXXXXXX",

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
});
