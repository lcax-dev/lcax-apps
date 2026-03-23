import path from 'node:path'
import { PGlite } from '@electric-sql/pglite'
import { drizzle } from 'drizzle-orm/pglite'
import { migrate } from 'drizzle-orm/pglite/migrator'
import * as dbSchema from '@/models'

const client = new PGlite()
export const dbConnection = drizzle({ client, schema: dbSchema })

const migrateAfterClientReady = async () => {
  if (!client.ready) await client.waitReady
  await migrate(dbConnection, {
    migrationsFolder: path.resolve('./drizzle/'), // set to your drizzle generated path
    migrationsSchema: path.resolve('./src/models/index.ts'), // set to your schema path
    migrationsTable: '__migrations',
  })
}

await migrateAfterClientReady()
