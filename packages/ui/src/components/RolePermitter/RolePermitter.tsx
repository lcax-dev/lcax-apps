import { ReactNode } from 'react'

interface RolePermitterProps {
  children: ReactNode
  requiredRole: 'admin' | 'user'
  sessionData: any
}

export const RolePermitter = (props: RolePermitterProps) => {
  const { children, requiredRole, sessionData } = props

  if (sessionData?.user.role === requiredRole) {
    return children
  }
  return null
}
