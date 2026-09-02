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
      name: "host",
      remotes: {
        "user-management": {
          type: "module",
          name: "user-management",
          entry: `${process.env.MANAGEMENT_URL}/remoteEntry.js`,
          entryGlobalName: "user-management",
          shareScope: "default",
        },
      },
      exposes: {},
      filename: "remoteEntry.js",
      shared: {
        "@lcax/ui": {
          singleton: true,
        },
        react: {
          requiredVersion: dependencies.react,
          singleton: true,
        },
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
