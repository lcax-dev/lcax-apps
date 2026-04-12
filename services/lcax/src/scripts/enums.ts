import { writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { countries, impactCategories, lifeCycleModules, standards, subTypes, units } from 'lcax'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const data = {
	countries: countries(),
	standards: standards(),
	subTypes: subTypes(),
	units: units(),
	impactCategories: impactCategories(),
	lifeCycleModules: lifeCycleModules(),
}

// This is needed because drizzle orm, kit and graphql doesn't support wasm, which LCAx depends on.
await writeFile(resolve(__dirname, 'enumData.ts'), `export default ${JSON.stringify(data, null, 2)}`, 'utf8')
