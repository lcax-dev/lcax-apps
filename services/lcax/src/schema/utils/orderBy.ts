import { asc, desc, type SQL } from 'drizzle-orm'
import type { PgColumn, PgTable } from 'drizzle-orm/pg-core'

export const orderByHelper = (
  orderBy: Record<string, 'asc' | 'desc'>[] | undefined,
  model: PgTable | Record<string, PgColumn>,
): SQL[] => {
  const order: SQL[] = []
  if (orderBy) {
    for (const item of orderBy) {
      for (const [key, value] of Object.entries(item)) {
        const column = model[key] as PgColumn | undefined
        if (column) {
          if (value === 'asc') {
            order.push(asc(column))
          } else if (value === 'desc') {
            order.push(desc(column))
          }
        }
      }
    }
  }

  return order
}
