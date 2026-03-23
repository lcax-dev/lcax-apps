import { describe, test } from 'vitest'
import { calculateProjectResolver } from '@/schema/resolvers/calculateProject'
import { projectData } from '@/__test__/__data__'

describe('calculateProjectResolver', async () => {
  test('calculate project', async ({ expect }) => {
    const result = await calculateProjectResolver(null, { project: projectData }, null, null)
    expect(result.results).toBeTruthy()
    expect(result.results.gwp.a1a3).toBe(160532500)
  })
})
