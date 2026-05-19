import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": { target: "http://localhost:3001", changeOrigin: true },
    },
  },
  build: {
    // three.js core alone is ~800 kB minified; expected for WebGL apps.
    chunkSizeWarningLimit: 850,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/three/examples")) return "three-addons";
          if (id.includes("node_modules/three")) return "three";
          if (id.includes("node_modules/@react-three/drei")) return "drei";
          if (id.includes("node_modules/@react-three/fiber")) return "r3f";
        },
      },
    },
  },
});
