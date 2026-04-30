import { defineConfig } from 'vitest/config'
import { resolve } from 'node:path'

export default defineConfig({
  resolve: {
    tsconfigPaths: true
  },
  test: {
    env: {
      BASE_URL: 'http://localhost:4000',
    },
    alias: {
      '@': resolve(__dirname, './src'),
    },
    server: {
      deps: {
        inline: ['graphql', '@apollo/server', 'graphql-type-json'],
      },
    },
  },
})