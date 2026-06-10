import { and, eq, or } from 'drizzle-orm'
import { dbConnection } from '@/config/database'
import * as models from '@/models'
import { orderByHelper, whereHelper } from '../utils'
import type { GraphQLContext } from '@/schema/context'

export const getEPDsResolver = async (source, args, context: GraphQLContext, info) => {
  const { where, offset, limit, orderBy } = args
  const filters = whereHelper(where, models.epds)
  const isAdmin = context.session?.user?.role === 'admin'
  const orgId = context.session?.session?.activeOrganizationId

  let query = dbConnection.select().from(models.epds).$dynamic()

  const visibilityFilters = []
  if (!isAdmin) {
    visibilityFilters.push(eq(models.epds.visibility, 'Public'))
    if (orgId) {
      visibilityFilters.push(eq(models.epds.organizationId, orgId))
    }
  }

  const visibilitySql = visibilityFilters.length > 0 ? or(...visibilityFilters) : undefined

  if (filters && visibilitySql) {
    query = query.where(and(filters, visibilitySql))
  } else if (filters) {
    query = query.where(filters)
  } else if (visibilitySql) {
    query = query.where(visibilitySql)
  }

  if (orderBy) {
    const order = orderByHelper(orderBy, models.epds)
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

  return await query
}
