import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["@chart-platform/core", "@chart-platform/react-renderer"]
  },
  build: {
    commonjsOptions: {
      include: [
        /node_modules/,
        /packages\/core/,
        /packages\/react-renderer/,
        /packages\/server-renderer/
      ]
    }
  }
});