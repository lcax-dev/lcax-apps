import { describe, test } from 'vitest'
import { calculateProductResolver } from '@/schema/resolvers/calculateProduct'
import { projectData } from '@/__test__/__data__'
import type { Assembly } from 'lcax'
import type { GraphQLContext } from '@/schema/context'
import type { HttpLogger } from 'pino-http'

describe('calculateProductResolver', async () => {
  const mockLogger = {} as HttpLogger

  test('calculate product (public access)', async ({ expect }) => {
    const context: GraphQLContext = {
      logger: mockLogger,
      session: null,
    }
    const productData = (projectData.assemblies[0] as Assembly).products[0]
    const result = await calculateProductResolver(null, { product: productData }, context, null)
    expect(result).toBeTruthy()
    expect(result.gwp.a1a3).toBe(3210650)
  })

  test('calculate product (with session)', async ({ expect }) => {
    const context: GraphQLContext = {
      logger: mockLogger,
      session: {
        session: {} as any,
        user: { role: 'user' } as any,
      },
    }
    const productData = (projectData.assemblies[0] as Assembly).products[0]
    const result = await calculateProductResolver(null, { product: productData }, context, null)
    expect(result).toBeTruthy()
  })
})
