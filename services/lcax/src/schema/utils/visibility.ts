import { eq, or, type SQL } from 'drizzle-orm'
import type { PgColumn } from 'drizzle-orm/pg-core'
import type { GraphQLContext } from '@/schema/context'

export type VisibilityTable = {
  visibility: PgColumn
  organizationId: PgColumn
}

export const visibilityFilter = (table: VisibilityTable, context: GraphQLContext): SQL | undefined => {
  const isAdmin = context.session?.user?.role === 'admin'
  if (isAdmin) {
    return undefined
  }

  const filters = [eq(table.visibility, 'Public')]
  const orgId = context.session?.session?.activeOrganizationId
  if (orgId) {
    filters.push(eq(table.organizationId, orgId))
  }
  return or(...filters)
}
