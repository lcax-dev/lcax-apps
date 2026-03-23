/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'node:path'
import { externalizeDeps } from 'vite-plugin-externalize-deps'

export default defineConfig({
	plugins: [react(), dts({
		insertTypesEntry: true,
		tsconfigPath: resolve(__dirname, 'tsconfig.json'),
	}),
		externalizeDeps()
	],
	resolve: {
		tsconfigPaths: true,
	},
	build: {
		lib: {
			entry: {
				'index': resolve(__dirname, 'src/index.ts'),
			},
			name: 'LCAxUI',
			fileName: (format, entryName) => {
				const ending = format === 'es' ? '.js' : '.cjs'
				return `${entryName}${ending}`
			},
		},
		minify: false,
		sourcemap: true,
		cssCodeSplit: false,
	},
	test: {
		globals: true,
		passWithNoTests: true,
	},
})
