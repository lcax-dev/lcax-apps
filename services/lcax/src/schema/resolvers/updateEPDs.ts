import { dbConnection } from '@/config/database'
import * as models from '@/models'
import { whereHelper } from '../utils'
import type { GraphQLContext } from '@/schema/context'
import { GraphQLError } from 'graphql'

// biome-ignore lint: ignore unused function parameters
export const updateEPDsResolver = async (source, args, context: GraphQLContext, info) => {
  if (!context.session) {
    throw new GraphQLError('User is not authenticated', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 },
      },
    })
  }

  if (context.session.user.role !== 'admin') {
    throw new GraphQLError('User is not authorized to update EPDs', {
      extensions: {
        code: 'FORBIDDEN',
        http: { status: 403 },
      },
    })
  }

  try {
    const { where, set } = args
    const filters = whereHelper(where, models.epds)

    let query = dbConnection.update(models.epds).set(set).$dynamic()

    if (filters) {
      query = query.where(filters)
    }

    return await query.returning()
  } catch (error) {
    console.error('DEBUG: updateEPDsResolver error', error)
    throw error
  }
}
