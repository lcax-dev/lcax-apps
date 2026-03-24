import { describe, test, vi, expect } from 'vitest'
import { getEPDsResolver } from '@/schema/resolvers/getEPDs'
import type { GraphQLContext } from '@/schema/context'
import type { HttpLogger } from 'pino-http'

vi.mock('@/config/database', () => ({
  dbConnection: {
    select: vi.fn().mockReturnValue({
      from: vi.fn().mockReturnValue({
        $dynamic: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnThis(),
          orderBy: vi.fn().mockReturnThis(),
          limit: vi.fn().mockReturnThis(),
          offset: vi.fn().mockReturnThis(),
          then: (onfulfilled: any) => Promise.resolve([]).then(onfulfilled),
        }),
      }),
    }),
  },
}))

describe('getEPDsResolver', () => {
  const mockLogger = {} as HttpLogger

  test('allows public access (no session)', async () => {
    const context: GraphQLContext = {
      logger: mockLogger,
      session: null,
    }

    const result = await getEPDsResolver(null, { where: {} }, context, null)
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

    const result = await getEPDsResolver(null, { where: {} }, context, null)
    expect(result).toEqual([])
  })
})
