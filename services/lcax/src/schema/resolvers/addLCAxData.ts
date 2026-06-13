import { dbConnection } from '@/config/database'
import * as models from '@/models'
import type { GraphQLContext } from '@/schema/context'
import { GraphQLError } from 'graphql'

export const addLCAxDataResolver = async (source, args, context: GraphQLContext, info) => {
  if (!context.session) {
    throw new GraphQLError('User is not authenticated', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 },
      },
    })
  }

  const { values, organizationId, visibility } = args
  const epdsToInsert = []
  const assembliesToInsert = []
  const productsToInsert = []

  for (const value of values) {
    const type = (value.type || 'EPD').toLowerCase()
    const data = {
      ...value,
      organizationId: organizationId || value.organizationId,
      visibility: visibility || value.visibility || 'Public',
      metaData: {
        ...value.metaData,
        uploadedAt: value.metaData?.uploadedAt || new Date().toISOString(),
      },
    }

    if (type === 'epd') {
      epdsToInsert.push(data)
    } else if (type === 'assembly') {
      assembliesToInsert.push(data)
    } else if (type === 'product') {
      productsToInsert.push(data)
    } else {
      throw new GraphQLError(`Unsupported LCAx type: ${value.type}`)
    }
  }

  const results = []

  if (epdsToInsert.length > 0) {
    const inserted = await dbConnection.insert(models.epds).values(epdsToInsert).returning()
    results.push(...inserted.map((i) => ({ ...i, __typename: 'EPD' })))
  }
  if (assembliesToInsert.length > 0) {
    const inserted = await dbConnection.insert(models.assemblies).values(assembliesToInsert).returning()
    results.push(...inserted.map((i) => ({ ...i, __typename: 'Assembly' })))
  }
  if (productsToInsert.length > 0) {
    const inserted = await dbConnection.insert(models.products).values(productsToInsert).returning()
    results.push(...inserted.map((i) => ({ ...i, __typename: 'Product' })))
  }

  return results
}
