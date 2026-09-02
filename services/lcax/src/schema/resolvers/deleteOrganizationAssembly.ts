import { and, eq, inArray } from 'drizzle-orm'
import { GraphQLError } from 'graphql'
import { dbConnection } from '@/config/database'
import * as models from '@/models'
import type { GraphQLContext } from '@/schema/context'
import { UUID_RE, productIdsFromRefs, requireOrganizationSession } from '@/schema/utils/organizationAssembly'

export const deleteOrganizationAssemblyResolver = async (_source, args, context: GraphQLContext) => {
  const organizationId = requireOrganizationSession(context)
  const { id } = args
  if (!UUID_RE.test(id)) {
    throw new GraphQLError('Assembly not found', {
      extensions: {
        code: 'NOT_FOUND',
        http: { status: 404 },
      },
    })
  }

  const rows = await dbConnection
    .select()
    .from(models.assemblies)
    .where(and(eq(models.assemblies.id, id), eq(models.assemblies.organizationId, organizationId)))
  const assembly = rows[0]
  if (!assembly) {
    throw new GraphQLError('Assembly not found', {
      extensions: {
        code: 'NOT_FOUND',
        http: { status: 404 },
      },
    })
  }

  const productIds = productIdsFromRefs(assembly.products)
  await dbConnection.delete(models.assemblies).where(eq(models.assemblies.id, id))
  if (productIds.length > 0) {
    await dbConnection
      .delete(models.products)
      .where(and(inArray(models.products.id, productIds), eq(models.products.organizationId, organizationId)))
  }

  return true
}
