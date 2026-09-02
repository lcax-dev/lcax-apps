import { and, asc, sql, type SQL } from 'drizzle-orm'
import { dbConnection } from '@/config/database'
import * as models from '@/models'
import type { GraphQLContext } from '@/schema/context'
import { whereHelper, type WhereFilter, type WhereInput } from '@/schema/utils'
import { visibilityFilter } from '@/schema/utils/visibility'

type LCAxKindValue = 'EPD' | 'ASSEMBLY'

type SearchFiltersInput = {
  unit?: WhereFilter
  location?: WhereFilter
  subtype?: WhereFilter
  standard?: WhereFilter
  type?: WhereFilter
  publishedDate?: WhereFilter
  validUntil?: WhereFilter
  classification?: WhereFilter
}

type SearchArgs = {
  q?: string | null
  kinds?: LCAxKindValue[] | null
  where?: SearchFiltersInput | null
  limit?: number | null
  offset?: number | null
}

type SearchHit = {
  name: string
  __typename: 'EPD' | 'Assembly'
  type?: string
}

const DEFAULT_LIMIT = 50

const combineSql = (...parts: (SQL | undefined)[]): SQL | undefined => {
  const defined = parts.filter((part): part is SQL => part !== undefined)
  if (defined.length === 0) return undefined
  if (defined.length === 1) return defined[0]
  return and(...defined)
}

const freeTextWhere = (q: string | null | undefined, fields: string[]): WhereInput | undefined => {
  if (!q) return undefined
  return {
    OR: fields.map((field) => ({ [field]: { contains: q } })),
  }
}

const mergeByName = (left: SearchHit[], right: SearchHit[]): SearchHit[] => {
  const merged: SearchHit[] = []
  let i = 0
  let j = 0
  while (i < left.length && j < right.length) {
    if (left[i].name <= right[j].name) {
      merged.push(left[i++])
    } else {
      merged.push(right[j++])
    }
  }
  return merged.concat(left.slice(i), right.slice(j))
}

const fetchEpds = async (args: SearchArgs, context: GraphQLContext, fetchLimit: number) => {
  const where = args.where
  const filters = whereHelper(
    {
      declaredUnit: where?.unit,
      location: where?.location,
      subtype: where?.subtype,
      standard: where?.standard,
      type: where?.type,
      publishedDate: where?.publishedDate,
      validUntil: where?.validUntil,
      ...freeTextWhere(args.q, ['name', 'comment']),
    },
    models.epds,
  )
  const visibilitySql = visibilityFilter(models.epds, context)

  let query = dbConnection.select().from(models.epds).$dynamic()
  const whereSql = combineSql(filters, visibilitySql)
  if (whereSql) {
    query = query.where(whereSql)
  }

  return query.orderBy(asc(models.epds.name)).limit(fetchLimit)
}

const classificationSql = (classification?: WhereFilter): SQL | undefined => {
  if (!classification) return undefined
  if (classification.contains !== undefined) {
    return sql`${models.assemblies.classification}::text ilike ${`%${classification.contains}%`}`
  }
  if (classification.eq !== undefined) {
    return sql`${models.assemblies.classification}::text ilike ${`%${classification.eq}%`}`
  }
  return undefined
}

const fetchAssemblies = async (args: SearchArgs, context: GraphQLContext, fetchLimit: number) => {
  const where = args.where
  const filters = whereHelper(
    {
      unit: where?.unit,
      ...freeTextWhere(args.q, ['name', 'description']),
    },
    models.assemblies,
  )
  const visibilitySql = visibilityFilter(models.assemblies, context)

  let query = dbConnection.select().from(models.assemblies).$dynamic()
  const whereSql = combineSql(filters, visibilitySql, classificationSql(where?.classification))
  if (whereSql) {
    query = query.where(whereSql)
  }

  return query.orderBy(asc(models.assemblies.name)).limit(fetchLimit)
}

export const searchResolver = async (_source, args: SearchArgs, context: GraphQLContext) => {
  const limit = args.limit ?? DEFAULT_LIMIT
  const offset = args.offset ?? 0
  const fetchLimit = limit + offset
  const kinds = args.kinds?.length ? new Set(args.kinds) : new Set<LCAxKindValue>(['EPD', 'ASSEMBLY'])

  const [epdRows, assemblyRows] = await Promise.all([
    kinds.has('EPD') ? fetchEpds(args, context, fetchLimit) : Promise.resolve([]),
    kinds.has('ASSEMBLY') ? fetchAssemblies(args, context, fetchLimit) : Promise.resolve([]),
  ])

  const epdHits: SearchHit[] = epdRows.map((row) => ({ ...row, __typename: 'EPD' as const }))
  const assemblyHits: SearchHit[] = assemblyRows.map((row) => ({
    ...row,
    type: 'assembly',
    __typename: 'Assembly' as const,
  }))

  return mergeByName(epdHits, assemblyHits).slice(offset, offset + limit)
}
