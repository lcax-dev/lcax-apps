import { createAuthClient } from 'better-auth/react'
import { adminClient, organizationClient } from 'better-auth/client/plugins'

type UserRole = 'admin' | 'member' | 'owner'

type SessionUserWithRole = {
  id: string
  createdAt: Date
  updatedAt: Date
  email: string
  emailVerified: boolean
  name: string
  image?: string | null
  role?: UserRole
}

type SessionWithUserRole = {
  session: {
    id: string
    createdAt: Date
    updatedAt: Date
    userId: string
    expiresAt: Date
    token: string
    ipAddress?: string | null
    userAgent?: string | null
  }
  user: SessionUserWithRole
}

type AdminClient = ReturnType<typeof adminClient>
type BaseAuthClient = ReturnType<typeof createAuthClient>

type AuthClient = Omit<BaseAuthClient, 'useSession'> & {
  admin: AdminClient
  useSession: () => {
    data: SessionWithUserRole | null
    error: Error | null
    isPending: boolean
    refetch: () => void
  }
}

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  plugins: [adminClient(), organizationClient()],
}) as AuthClient
