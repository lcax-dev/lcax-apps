import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { admin } from 'better-auth/plugins'
import { dbConnection } from './database'
import * as schema from '../models'

export const auth = betterAuth({
  database: drizzleAdapter(dbConnection, {
    provider: 'pg',
    schema: {
      ...schema,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [admin()],
})
