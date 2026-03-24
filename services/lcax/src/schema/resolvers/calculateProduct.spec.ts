import { describe, test } from 'vitest'
import { calculateProductResolver } from '@/schema/resolvers/calculateProduct'
import { projectData } from '@/__test__/__data__'
import type { Assembly } from 'lcax'

describe('calculateProductResolver', async () => {
  test('calculate product', async ({ expect }) => {
    const productData = (projectData.assemblies[0] as Assembly).products[0]
    const result = await calculateProductResolver(null, { product: productData }, null, null)
    expect(result).toBeTruthy()
    expect(result.gwp.a1a3).toBe(3210650)
  })
})
