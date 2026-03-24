import { describe, test } from 'vitest'
import { calculateAssemblyResolver } from '@/schema/resolvers/calculateAssembly'
import { projectData } from '@/__test__/__data__'

describe('calculateAssemblyResolver', async () => {
  test('calculate assembly', async ({ expect }) => {
    const assemblyData = projectData.assemblies[0]
    const result = await calculateAssemblyResolver(null, { assembly: assemblyData }, null, null)
    expect(result).toBeTruthy()
    expect(result.gwp.a1a3).toBe(160532500)
  })
})
