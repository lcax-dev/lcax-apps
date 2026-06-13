import { ReactNode } from 'react'

interface RolePermitterProps {
  children: ReactNode
  requiredRole: 'admin' | 'organization-admin' | 'user'
  sessionData: any
}

export const RolePermitter = (props: RolePermitterProps) => {
  const { children, requiredRole, sessionData } = props

  const roles = ['user', 'member', 'organization-admin', 'owner', 'admin']
  const userRole = sessionData?.user?.role || sessionData?.role

  const userRoleIndex = roles.indexOf(userRole)
  const requiredRoleIndex = roles.indexOf(requiredRole)

  if (userRoleIndex >= requiredRoleIndex && userRoleIndex !== -1) {
    return children
  }
  return null
}
