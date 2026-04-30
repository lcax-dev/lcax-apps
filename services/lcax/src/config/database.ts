import { drizzle as nodeDrizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'

import { getPGliteClient } from '@/config/pglite'
import * as schema from '@/models'

const getDatabase = async () => {
  const url = process.env.DATABASE_URL

  if (url?.startsWith('postgres')) {
    const pool = new pg.Pool({
      connectionString: url,
    })
    return nodeDrizzle(pool, { schema })
  }

  return await getPGliteClient()
}

export const dbConnection = (await getDatabase()) as NonNullable<Awaited<ReturnType<typeof getDatabase>>>
