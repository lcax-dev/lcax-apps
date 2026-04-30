import { PGlite } from '@electric-sql/pglite'
import { drizzle, type PgliteDatabase } from 'drizzle-orm/pglite'
import { migrate } from 'drizzle-orm/pglite/migrator'
import path from 'node:path'

import { logger } from '@/config/logger'
import * as schema from '@/models'

const globalForPglite = globalThis as unknown as {
  pglite: PGlite | undefined
  pgliteConnection: PgliteDatabase<typeof schema> | undefined
}

export const getPGliteClient = async () => {
  if (!globalForPglite.pglite) {
    globalForPglite.pglite = new PGlite()
  }

  if (!globalForPglite.pgliteConnection) {
    globalForPglite.pgliteConnection = drizzle(globalForPglite.pglite, { schema })
    await migrateAfterClientReady()
  }

  return globalForPglite.pgliteConnection
}

export const migrateAfterClientReady = async () => {
  const pglite = globalForPglite.pglite
  const pgliteConnection = globalForPglite.pgliteConnection

  if (pglite?.ready) await pglite.waitReady
  if (pgliteConnection) {
    await migrate(pgliteConnection, {
      migrationsFolder: path.resolve('./drizzle/'),
      migrationsSchema: 'drizzle',
      migrationsTable: '__migrations',
    })
  }
}

export const createUsers = async (auth: any) => {
  const user = await auth.api.createUser({
    body: {
      password: 'password1234',
      email: 'user@lcax.dev',
      name: 'John Doe',
      role: 'user',
    },
  })

  const admin = await auth.api.createUser({
    body: {
      password: 'password1234',
      email: 'admin@lcax.dev',
      name: 'Michael Admin',
      role: 'admin',
    },
  })
  logger.info('Users seeded')
  return { user, admin }
}
