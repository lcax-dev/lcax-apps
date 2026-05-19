import { describe, test, vi, expect } from 'vitest'
import { addEPDResolver } from '@/schema/resolvers/addEPD'
import { epdData } from '@/__test__/__data__'
import { GraphQLError } from 'graphql'
import type { GraphQLContext } from '@/schema/context'
import type { HttpLogger } from 'pino-http'
import { dbConnection } from '@/config/database'

vi.mock('@/config/database', () => {
  const mockInsert = vi.fn().mockReturnValue({
    values: vi.fn().mockReturnValue({
      returning: vi.fn().mockResolvedValue([]),
    }),
  })
  return {
    dbConnection: {
      insert: mockInsert,
    },
  }
})

describe('addEPDResolver', () => {
  const mockLogger = {} as HttpLogger

  test('throws UNAUTHENTICATED if no session', async ({ expect }) => {
    const context: GraphQLContext = {
      logger: mockLogger,
      session: null,
    }

    await expect(addEPDResolver(null, { values: epdData }, context, null)).rejects.toThrowError(
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

    await expect(addEPDResolver(null, { values: epdData }, context, null)).rejects.toThrowError(
      new GraphQLError('User is not authorized to add EPDs', {
        extensions: {
          code: 'FORBIDDEN',
          http: { status: 403 },
        },
      }),
    )
  })

  test('allows admin to add EPDs', async ({ expect }) => {
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

    const result = await addEPDResolver(null, { values: [epdData[0]] }, context, null)

    expect(dbConnection.insert).toHaveBeenCalled()
    const insertedValues = (dbConnection.insert as any).mock.results[0].value.values.mock.calls[0][0]
    expect(insertedValues[0].metaData.uploadedAt).toBeDefined()
    expect(result).toEqual([])
  })
})
