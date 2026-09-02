import { and } from 'drizzle-orm'
import { dbConnection } from '@/config/database'
import * as models from '@/models'
import { orderByHelper, whereHelper } from '../utils'
import { visibilityFilter } from '../utils/visibility'
import type { GraphQLContext } from '@/schema/context'
import { expandAssemblyProducts, selectionIncludesField } from './expandAssemblyProducts'

export const getAssembliesResolver = async (source, args, context: GraphQLContext, info) => {
  const { where, offset, limit, orderBy } = args
  const filters = whereHelper(where, models.assemblies)
  const visibilitySql = visibilityFilter(models.assemblies, context)

  let query = dbConnection.select().from(models.assemblies).$dynamic()

  if (filters && visibilitySql) {
    query = query.where(and(filters, visibilitySql))
  } else if (filters) {
    query = query.where(filters)
  } else if (visibilitySql) {
    query = query.where(visibilitySql)
  }

  if (orderBy) {
    const order = orderByHelper(orderBy, models.assemblies)
    if (order.length > 0) {
      query = query.orderBy(...order)
    }
  }

  if (limit !== undefined) {
    query = query.limit(limit)
  }

  if (offset !== undefined) {
    query = query.offset(offset)
  }

  const rows = await query
  const assemblies = rows.map((row) => ({
    ...row,
    type: 'assembly',
    classification: row.classification ?? [],
  }))

  if (!selectionIncludesField(info, 'products')) {
    return assemblies
  }

  return expandAssemblyProducts(assemblies, context)
}
