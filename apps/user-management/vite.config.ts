/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from 'vite-plugin-wasm'
import { federation } from "@module-federation/vite";
import { dependencies } from "./package.json";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), wasm(),
    federation({
      dts: true,
      dev: { disableDynamicRemoteTypeHints: true, remoteHmr: true },
      filename: "remoteEntry.js",
      name: "user-management",
      exposes: {
        "./app": "./src/components/App/App.tsx",
      },
      remotes: {},
      shared: {
        "@lcax/ui": {
          singleton: true,
        },
        react: {
          requiredVersion: dependencies.react,
          singleton: true,
        },
        "react/": {},
        "react-dom": {
          requiredVersion: dependencies["react-dom"],
          singleton: true,
        },
      },
    }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    allowedHosts: [
      process.env.FRONTEND_URL?.replace('https://', '') as string
    ]
  },
  test: {
    globals: true,
    passWithNoTests: true,
  },
})
