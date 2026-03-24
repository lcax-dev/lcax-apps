import { dbConnection } from '@/config/database'
import * as models from '@/models'
import type { GraphQLContext } from '@/schema/context'

export const addEPDResolver = async (source, args, context: GraphQLContext, info) => {
  return dbConnection.insert(models.epds).values(args.values).returning()
}
