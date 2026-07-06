import { ReactNode } from 'react'
import { ErrorBoundary } from '@lcax/ui/components'
import { authClient } from '@lcax/ui/lib'

interface RolePermitterProps {
  children: ReactNode
  requiredRole: 'admin' | 'owner' | 'member'
}

export const RolePermitter = (props: RolePermitterProps) => {
  const { children, requiredRole } = props
  const { data: sessionData } = authClient.useSession()
  const userRole = sessionData?.user?.role

  if (userRole && userRole === requiredRole) {
    return <ErrorBoundary>{children}</ErrorBoundary>
  }
  return null
}
