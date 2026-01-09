import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import node from "@astrojs/node";

export default defineConfig({
    output: "server", // Enable SSR
    adapter: node({
        mode: "standalone"
    }),
    vite: {
        plugins: [tailwindcss()],
    },
    site: "https://dsetup.myshopify.com",
    integrations: [sitemap(), react()],
});
