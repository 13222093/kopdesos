import devServer from "@hono/vite-dev-server";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // muat .env ke process.env supaya terbaca oleh Hono di dev server
  Object.assign(process.env, loadEnv(mode, __dirname, ""));

  return {
    plugins: [
      devServer({
        entry: "./src/server/app.ts",
        // hanya tangani /api/* — sisanya biarkan Vite (SPA)
        exclude: [/^(?!\/api\/).*/],
      }),
      tanstackRouter({ target: "react", autoCodeSplitting: true }),
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "src"),
      },
    },
  };
});
