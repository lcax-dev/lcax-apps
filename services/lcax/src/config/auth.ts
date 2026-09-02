import { drizzleAdapter } from '@better-auth/drizzle-adapter'
import { betterAuth } from 'better-auth'
import { admin, organization, testUtils } from 'better-auth/plugins'

import { dbConnection } from '@/config/database'

import * as schema from '../models'
import 'dotenv/config'
import { createUsers } from '@/config/pglite'
import { getInitialOrganization } from '@/lib'
import { sendOrganizationInvitation } from '@/config/emails.ts'

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
  plugins: [
    admin(),
    organization({
      async sendInvitationEmail(data) {
        const inviteLink = `${process.env.FRONTEND_URL}/accept-invitation/${data.id}`
        await sendOrganizationInvitation({
          email: data.email,
          invitedByUsername: data.inviter.user.name,
          invitedByEmail: data.inviter.user.email,
          teamName: data.organization.name,
          inviteLink,
        })
      },
    }),
    testUtils(),
  ],
  trustedOrigins: [process.env.FRONTEND_URL],
  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          // Implement your custom logic to set initial active organization
          const organizationId = await getInitialOrganization(session.userId)
          return {
            data: {
              ...session,
              activeOrganizationId: organizationId,
            },
          }
        },
      },
    },
  },
})

if (!process.env.DATABASE_URL?.startsWith('postgres')) {
  createUsers(auth)
}
