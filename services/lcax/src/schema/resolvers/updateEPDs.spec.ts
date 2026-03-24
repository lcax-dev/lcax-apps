import { describe, test, vi } from 'vitest'
import { updateEPDsResolver } from '@/schema/resolvers/updateEPDs'
import { GraphQLError } from 'graphql'
import type { GraphQLContext } from '@/schema/context'
import type { HttpLogger } from 'pino-http'

vi.mock('@/config/database', () => ({
  dbConnection: {
    update: vi.fn().mockReturnValue({
      set: vi.fn().mockReturnValue({
        $dynamic: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            returning: vi.fn().mockResolvedValue([]),
          }),
          returning: vi.fn().mockResolvedValue([]),
        }),
      }),
    }),
  },
}))

describe('updateEPDsResolver', () => {
  const mockLogger = {} as HttpLogger

  test('throws UNAUTHENTICATED if no session', async ({ expect }) => {
    const context: GraphQLContext = {
      logger: mockLogger,
      session: null,
    }

    await expect(updateEPDsResolver(null, { where: {}, set: {} }, context, null)).rejects.toThrowError(
      new GraphQLError('User is not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 },
        },
      }),
    )
  })

  test('throws FORBIDDEN if user is not admin', async ({ expect }) => {
    const context: GraphQLContext = {
      logger: mockLogger,
      session: {
        session: {
          id: 'session-id',
          userId: 'user-id',
          token: 'token',
          expiresAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        user: {
          id: 'user-id',
          name: 'Regular User',
          email: 'user@example.com',
          emailVerified: true,
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      } as any,
    }

    await expect(updateEPDsResolver(null, { where: {}, set: {} }, context, null)).rejects.toThrowError(
      new GraphQLError('User is not authorized to update EPDs', {
        extensions: {
          code: 'FORBIDDEN',
          http: { status: 403 },
        },
      }),
    )
  })

  test('allows admin to update EPDs', async ({ expect }) => {
    const context: GraphQLContext = {
      logger: mockLogger,
      session: {
        session: {
          id: 'session-id',
          userId: 'admin-id',
          token: 'admin-token',
          expiresAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        user: {
          id: 'admin-id',
          name: 'Admin User',
          email: 'admin@example.com',
          emailVerified: true,
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      } as any,
    }

    const result = await updateEPDsResolver(null, { where: {}, set: {} }, context, null)
    expect(result).toEqual([])
  })
})
