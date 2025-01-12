import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

/** @type {import('vite').UserConfig} */
export default {
  plugins: [react(), basicSsl()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    css: true,
    reporters: ["verbose"],
  },
  build: {
    outDir: "dist",
  },
  server: {
    proxy: {
      "/api": {
        target: "https://api.opentopodata.org",
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ""),
      },
    },
    host: "0.0.0.0",
    port: 3000,
  },
};
