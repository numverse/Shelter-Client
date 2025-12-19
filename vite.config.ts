import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  publicDir: "src/public",
  build: {
    outDir: "build",
    emptyOutDir: true,
  },
  plugins: [
    vue(),
    tailwindcss(),
  ],
});
