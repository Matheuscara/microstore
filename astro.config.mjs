import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
    },
    site: "https://dsetup.myshopify.com",
    integrations: [sitemap(), react()],
});
