import { drizzleAdapter } from '@better-auth/drizzle-adapter'
import { betterAuth } from 'better-auth'
import { admin, testUtils } from 'better-auth/plugins'

import { dbConnection } from '@/config/database'

import * as schema from '../models'
import 'dotenv/config'
import { createUsers } from '@/config/pglite'

export const auth = betterAuth({
  database: drizzleAdapter(dbConnection, {
    provider: 'pg',
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  baseURL: process.env.BASE_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  plugins: [admin(), testUtils()],
  trustedOrigins: [process.env.FRONTEND_URL],
})

if (!process.env.DATABASE_URL?.startsWith('postgres')) {
  createUsers(auth)
}
