import { describe, test } from 'vitest'
import { calculateProjectResolver } from '@/schema/resolvers/calculateProject'
import { projectData } from '@/__test__/__data__'
import type { GraphQLContext } from '@/schema/context'
import type { HttpLogger } from 'pino-http'

describe('calculateProjectResolver', async () => {
  const mockLogger = {} as HttpLogger

  test('calculate project (public access)', async ({ expect }) => {
    const context: GraphQLContext = {
      logger: mockLogger,
      session: null,
    }
    const result = await calculateProjectResolver(null, { project: projectData }, context, null)
    expect(result.results).toBeTruthy()
    expect(result.results.gwp.a1a3).toBe(160532500)
  })

  test('calculate project (with session)', async ({ expect }) => {
    const context: GraphQLContext = {
      logger: mockLogger,
      session: {
        session: {} as any,
        user: { role: 'user' } as any,
      },
    }
    const result = await calculateProjectResolver(null, { project: projectData }, context, null)
    expect(result.results).toBeTruthy()
  })
})
