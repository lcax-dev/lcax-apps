import { defineConfig } from 'vitest/config'
import { resolve } from 'node:path'

export default defineConfig({
  resolve: {
    tsconfigPaths: true
    // alias: {
    //   '@': resolve(__dirname, './src'),
    //   'graphql': resolve(__dirname, '../../node_modules/graphql'),
    // },
    // dedupe: ['graphql', '@apollo/server', 'graphql-type-json'],
  },
  test: {
    env: {
      BASE_URL: 'http://localhost:4000',
    },
    alias: {
      '@/config/database': resolve(__dirname, './src/__test__/__mock__/database.ts'),
      '@/config/server': resolve(__dirname, './src/config/server.ts'),
    },
    server: {
      deps: {
        inline: ['graphql', '@apollo/server', 'graphql-type-json'],
      },
    },
  },
})