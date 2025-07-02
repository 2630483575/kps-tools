import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { resolve } from "path";
import svgr from "vite-plugin-svgr";
// https://vite.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite({}), react(), svgr()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    host: "0.0.0.0",
    proxy: {
      "/config-api": {
        target: "http://192.168.30.233:8090",
        changeOrigin: true,
      },
      "/login-api": {
        target: "http://192.168.30.233:8090",
        changeOrigin: true,
      },
      "/file-api": {
        target: "http://192.168.30.233:8090",
        changeOrigin: true,
      },
    },
  },
});
