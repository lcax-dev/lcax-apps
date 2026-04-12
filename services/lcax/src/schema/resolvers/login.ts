import { auth } from '@/config/auth'
import { dbConnection } from '@/config/database'
import { session } from '@/models'
import { eq } from 'drizzle-orm'
import { GraphQLError } from 'graphql'
import { isAPIError } from 'better-auth/api'

export const loginResolver = async (
  _parent: any,
  { email, password }: any,
  _context: any,
  _info: any
) => {
  try {
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    })

    if (!result || !result.token) {
      throw new GraphQLError('Login failed', {
        extensions: {
          code: 'BAD_USER_INPUT',
        },
      })
    }

    const [sessionRecord] = await dbConnection
      .select()
      .from(session)
      .where(eq(session.token, result.token))
      .limit(1)

    if (!sessionRecord) {
      throw new GraphQLError('Session not found', {
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
        },
      })
    }

    return {
      user: {
        ...result.user,
        createdAt: result.user.createdAt.toISOString(),
        updatedAt: result.user.updatedAt.toISOString(),
      },
      session: {
        ...sessionRecord,
        expiresAt: sessionRecord.expiresAt.toISOString(),
      },
    }
  } catch (error: any) {
    if (isAPIError(error)) {
      const apiError = error as any
      throw new GraphQLError(apiError.message || 'Authentication error', {
        extensions: {
          code: 'BAD_USER_INPUT',
          status: apiError.status,
        },
      })
    }
    throw error
  }
}
