import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import wasm from 'vite-plugin-wasm'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), wasm()],
  esbuild: {
    supported: {
      'top-level-await': true, //browsers can handle top-level-await features
    },
  },
})
