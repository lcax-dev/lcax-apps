import { dbConnection } from '@/config/database'
import * as models from '@/models'
import { whereHelper } from '../utils'
import type { GraphQLContext } from '@/schema/context'

// biome-ignore lint: ignore unused function parameters
export const deleteEPDsResolver = async (source, args, context: GraphQLContext, info) => {
  const { where } = args
  const filters = whereHelper(where, models.epds)

  let query = dbConnection.delete(models.epds).$dynamic()

  if (filters) {
    query = query.where(filters)
  }

  return query.returning()
}
