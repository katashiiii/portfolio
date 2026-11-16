import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Site is served at https://katashiiii.github.io/portfolio/
  // If you rename the repo (or move to a custom domain), change this to match ("/" for a custom domain).
  base: "/portfolio/",
});
