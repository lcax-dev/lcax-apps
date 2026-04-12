import { betterAuth } from 'better-auth'
import { drizzleAdapter } from "@better-auth/drizzle-adapter"
import { admin } from 'better-auth/plugins'
import { dbConnection } from '@/config/database'
import * as schema from '../models'

export const auth = betterAuth({
  database: drizzleAdapter(dbConnection, {
    provider: 'pg',
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  baseURL: process.env.BASE_URL,
  plugins: [admin()],
})
