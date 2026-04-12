import { describe, test, vi, expect } from 'vitest'
import { signupResolver } from '@/schema/resolvers/signup'
import type { GraphQLContext } from '@/schema/context'
import type { HttpLogger } from 'pino-http'
import { auth } from '@/config/auth'
import { dbConnection } from '@/config/database'

vi.mock('@/config/auth', () => ({
  auth: {
    api: {
      signUpEmail: vi.fn(),
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

describe('signupResolver', () => {
  const mockLogger = {} as HttpLogger

  test('calls signUpEmail with correct arguments and returns result', async () => {
    const mockUser = {
      id: 'user-id',
      email: 'test@example.com',
      name: 'Test User',
      emailVerified: false,
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

    vi.mocked(auth.api.signUpEmail).mockResolvedValue({
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

    const result = await signupResolver(
      null,
      { email: 'test@example.com', password: 'password', name: 'Test User' },
      context,
      null
    )

    expect(auth.api.signUpEmail).toHaveBeenCalledWith({
      body: {
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
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
