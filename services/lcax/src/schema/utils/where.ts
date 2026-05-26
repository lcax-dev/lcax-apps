import { and, eq, gt, gte, ilike, isNotNull, isNull, lt, lte, or, type SQL } from 'drizzle-orm'
import type { PgColumn, PgTable } from 'drizzle-orm/pg-core'

export type WhereFilter = {
  eq?: unknown
  isNull?: boolean
  contains?: string
  gt?: unknown
  gte?: unknown
  lt?: unknown
  lte?: unknown
}

export type WhereInput = {
  OR?: WhereInput[]
} & {
  [key: string]: WhereFilter | WhereInput[] | undefined
}

export const whereHelper = (
  where: WhereInput | undefined,
  model: PgTable | Record<string, PgColumn>,
): SQL | undefined => {
  const filters: SQL[] = []
  if (where) {
    for (const [key, value] of Object.entries(where)) {
      if (value === undefined) continue

      if (key === 'OR' && Array.isArray(value)) {
        const orFilters = value.map((v) => whereHelper(v as WhereInput, model)).filter((f): f is SQL => f !== undefined)
        if (orFilters.length > 0) {
          filters.push(or(...orFilters))
        }
        continue
      }

      const filterValue = value as WhereFilter
      const column = model[key] as PgColumn | undefined

      if (filterValue.eq !== undefined && column) {
        filters.push(eq(column, filterValue.eq))
      }

      if (filterValue.gt !== undefined && column) {
        filters.push(gt(column, filterValue.gt))
      }

      if (filterValue.gte !== undefined && column) {
        filters.push(gte(column, filterValue.gte))
      }

      if (filterValue.lt !== undefined && column) {
        filters.push(lt(column, filterValue.lt))
      }

      if (filterValue.lte !== undefined && column) {
        filters.push(lte(column, filterValue.lte))
      }

      if (filterValue.contains !== undefined && column) {
        filters.push(ilike(column, `%${filterValue.contains}%`))
      }

      if (filterValue.isNull !== undefined && column) {
        if (filterValue.isNull) {
          filters.push(isNull(column))
        } else {
          filters.push(isNotNull(column))
        }
      }
    }
  }

  return filters.length === 0 ? undefined : filters.length === 1 ? filters[0] : and(...filters)
}
