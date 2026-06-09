import { dbConnection } from '@/config/database'
import * as models from '@/models'
import type { GraphQLContext } from '@/schema/context'
import { GraphQLError } from 'graphql'
import { count, sql } from 'drizzle-orm'

export const getLCAxStatisticsResolver = async (source, args, context: GraphQLContext, info) => {
  if (!context.session || context.session.user.role !== 'admin') {
    throw new GraphQLError('User is not authorized to view statistics', {
      extensions: {
        code: 'FORBIDDEN',
        http: { status: 403 },
      },
    })
  }

  const [epdsCountResult, assembliesCountResult, productsCountResult] = await Promise.all([
    dbConnection.select({ count: count() }).from(models.epds),
    dbConnection.select({ count: count() }).from(models.assemblies),
    dbConnection.select({ count: count() }).from(models.products),
  ])

  const epdsCount = Number(epdsCountResult[0].count)
  const assembliesCount = Number(assembliesCountResult[0].count)
  const productsCount = Number(productsCountResult[0].count)
  const totalCount = epdsCount + assembliesCount + productsCount

  const [epdUploads, assemblyUploads, productUploads] = await Promise.all([
    dbConnection.select({ date: sql<string>`${models.epds.metaData}->>'uploadedAt'` }).from(models.epds),
    dbConnection.select({ date: sql<string>`${models.assemblies.metaData}->>'uploadedAt'` }).from(models.assemblies),
    dbConnection.select({ date: sql<string>`${models.products.metaData}->>'uploadedAt'` }).from(models.products),
  ])

  const uploadStatsMap = new Map<string, { epds: number; assemblies: number; products: number }>()

  epdUploads.forEach((row) => {
    if (row.date) {
      const date = row.date.split('T')[0]
      const stats = uploadStatsMap.get(date) || { epds: 0, assemblies: 0, products: 0 }
      stats.epds++
      uploadStatsMap.set(date, stats)
    }
  })

  assemblyUploads.forEach((row) => {
    if (row.date) {
      const date = row.date.split('T')[0]
      const stats = uploadStatsMap.get(date) || { epds: 0, assemblies: 0, products: 0 }
      stats.assemblies++
      uploadStatsMap.set(date, stats)
    }
  })

  productUploads.forEach((row) => {
    if (row.date) {
      const date = row.date.split('T')[0]
      const stats = uploadStatsMap.get(date) || { epds: 0, assemblies: 0, products: 0 }
      stats.products++
      uploadStatsMap.set(date, stats)
    }
  })

  const uploads = Array.from(uploadStatsMap.entries())
    .map(([date, stats]) => ({
      date,
      count: stats.epds + stats.assemblies + stats.products,
      ...stats,
    }))
    .sort((a, b) => a.date.localeCompare(b.date))

  return {
    totalCount,
    epdsCount,
    assembliesCount,
    productsCount,
    uploads,
  }
}
