import { describe, test, vi, expect } from 'vitest'
import { loginResolver } from '@/schema/resolvers/login'
import type { GraphQLContext } from '@/schema/context'
import type { HttpLogger } from 'pino-http'
import { auth } from '@/config/auth'
import { dbConnection } from '@/config/database'

vi.mock('@/config/auth', () => ({
  auth: {
    api: {
      signInEmail: vi.fn(),
    },
  },
}))

vi.mock('@/config/database', () => ({
  dbConnection: {
    select: vi.fn().mockReturnValue({
      from: vi.fn().mockReturnValue({
        where: vi.fn().mockReturnValue({
          limit: vi.fn().mockResolvedValue([]),
        }),
      }),
    }),
  },
}))

describe('loginResolver', () => {
  const mockLogger = {} as HttpLogger

  test('calls signInEmail with correct arguments and returns result', async () => {
    const mockUser = {
      id: 'user-id',
      email: 'test@example.com',
      name: 'Test User',
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const mockSession = {
      id: 'session-id',
      userId: 'user-id',
      token: 'token',
      expiresAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    vi.mocked(auth.api.signInEmail).mockResolvedValue({
      user: mockUser,
      token: 'token',
    } as any)

    vi.mocked(dbConnection.select).mockReturnValue({
      from: vi.fn().mockReturnValue({
        where: vi.fn().mockReturnValue({
          limit: vi.fn().mockResolvedValue([mockSession]),
        }),
      }),
    } as any)

    const context: GraphQLContext = {
      logger: mockLogger,
      session: null,
    }

    const result = await loginResolver(
      null,
      { email: 'test@example.com', password: 'password' },
      context,
      null
    )

    expect(auth.api.signInEmail).toHaveBeenCalledWith({
      body: {
        email: 'test@example.com',
        password: 'password',
      },
    })
    expect(result).toEqual({
      user: {
        ...mockUser,
        createdAt: mockUser.createdAt.toISOString(),
        updatedAt: mockUser.updatedAt.toISOString(),
      },
      session: {
        ...mockSession,
        expiresAt: mockSession.expiresAt.toISOString(),
      },
    })
  })
})
