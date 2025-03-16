import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import wasm from 'vite-plugin-wasm'
import * as fs from 'node:fs'

const base64Loader: Plugin = {
  name: "base64-loader",
  transform(_: unknown, id: string) {
    const [path, query] = id.split("?");
    if (query != "base64") return null;

    const data = fs.readFileSync(path);
    const base64 = data.toString("base64");

    return `export default '${base64}';`;
  },
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), wasm(), base64Loader],
  esbuild: {
    supported: {
      'top-level-await': true, //browsers can handle top-level-await features
    },
  },
})
