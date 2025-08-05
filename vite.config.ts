import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import minipPlugin from "./vite-plugin-minip";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), minipPlugin()],
  server: {
    host: "0.0.0.0",
  },
  base: "",
  build: {
    target: "esnext",
  },
});
