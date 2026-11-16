import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // For GitHub Pages at https://<user>.github.io/<repo>/ set base: "/<repo>/"
  base: "portfolio",
});
