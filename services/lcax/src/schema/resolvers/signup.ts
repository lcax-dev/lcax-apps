import { auth } from '@/config/auth'
import { dbConnection } from '@/config/database'
import { session } from '@/models'
import { eq } from 'drizzle-orm'
import { GraphQLError } from 'graphql'
import { isAPIError } from 'better-auth/api'

export const signupResolver = async (
  _parent: any,
  { email, password, name }: any,
  _context: any,
  _info: any
) => {
  try {
    const result = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    })

    if (!result || !result.token) {
      throw new GraphQLError('Signup failed', {
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
      throw new GraphQLError('Session creation failed', {
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
