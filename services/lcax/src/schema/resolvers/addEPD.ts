import { dbConnection } from '@/config/database'
import * as models from '@/models'
import type { GraphQLContext } from '@/schema/context'
import { GraphQLError } from 'graphql'

export const addEPDResolver = async (source, args, context: GraphQLContext, info) => {
  if (!context.session) {
    throw new GraphQLError('User is not authenticated', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 },
      },
    })
  }

  if (context.session.user.role !== 'admin') {
    throw new GraphQLError('User is not authorized to add EPDs', {
      extensions: {
        code: 'FORBIDDEN',
        http: { status: 403 },
      },
    })
  }

  return dbConnection.insert(models.epds).values(args.values).returning()
}
