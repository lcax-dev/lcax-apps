import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as dbSchema from '@/models'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export const dbConnection = drizzle({ client: pool, schema: dbSchema })
