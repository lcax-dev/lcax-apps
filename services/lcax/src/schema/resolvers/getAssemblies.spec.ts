import { describe, test, vi, expect } from 'vitest'
import { getAssembliesResolver } from '@/schema/resolvers/getAssemblies'
import type { GraphQLContext } from '@/schema/context'
import type { HttpLogger } from 'pino-http'

vi.mock('@/config/database', () => ({
  dbConnection: {
    select: vi.fn().mockReturnValue({
      from: vi.fn().mockReturnValue({
        $dynamic: vi.fn().mockImplementation(() => {
          const query = Promise.resolve([]) as any
          query.where = vi.fn().mockReturnValue(query)
          query.orderBy = vi.fn().mockReturnValue(query)
          query.limit = vi.fn().mockReturnValue(query)
          query.offset = vi.fn().mockReturnValue(query)
          return query
        }),
      }),
    }),
  },
}))

describe('getAssembliesResolver', () => {
  const mockLogger = {} as HttpLogger

  test('allows public access (no session)', async () => {
    const context: GraphQLContext = {
      logger: mockLogger,
      session: null,
    }

    const result = await getAssembliesResolver(null, { where: {} }, context, null)
    expect(result).toEqual([])
  })

  test('allows access with session', async () => {
    const context: GraphQLContext = {
      logger: mockLogger,
      session: {
        session: {} as any,
        user: { role: 'user' } as any,
      },
    }

    const result = await getAssembliesResolver(null, { where: {} }, context, null)
    expect(result).toEqual([])
  })
})
