import { dbConnection } from '@/config/database'
import * as models from '@/models'
import type { GraphQLContext } from '@/schema/context'
import { GraphQLError } from 'graphql'
import { count, sql } from 'drizzle-orm'

export const getEPDStatisticsResolver = async (source, args, context: GraphQLContext, info) => {
  if (!context.session || context.session.user.role !== 'admin') {
    throw new GraphQLError('User is not authorized to view statistics', {
      extensions: {
        code: 'FORBIDDEN',
        http: { status: 403 },
      },
    })
  }

  const totalCountResult = await dbConnection.select({ count: count() }).from(models.epds)
  const totalCount = Number(totalCountResult[0].count)

  const uploadsResult = await dbConnection
    .select({
      date: sql<string>`${models.epds.metaData}->>'uploadedAt'`,
    })
    .from(models.epds)

  const uploadStatsMap = new Map<string, number>()
  uploadsResult.forEach((row) => {
    if (row.date) {
      // Truncate to date part for grouping
      const date = row.date.split('T')[0]
      uploadStatsMap.set(date, (uploadStatsMap.get(date) || 0) + 1)
    }
  })

  const uploads = Array.from(uploadStatsMap.entries())
    .map(([date, count]) => ({
      date,
      count,
    }))
    .sort((a, b) => a.date.localeCompare(b.date))

  return {
    totalCount,
    uploads,
  }
}
