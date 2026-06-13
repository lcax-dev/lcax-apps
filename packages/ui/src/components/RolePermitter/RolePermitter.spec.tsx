import { describe, it, expect } from 'vitest'
import { RolePermitter } from './RolePermitter'

describe('RolePermitter', () => {
  it('should render children if user has exact required role', () => {
    const sessionData = { user: { role: 'admin' } }
    const result = RolePermitter({ children: 'Allowed', requiredRole: 'admin', sessionData })
    expect(result).toBe('Allowed')
  })

  it('should not render children if user does not have required role', () => {
    const sessionData = { user: { role: 'user' } }
    const result = RolePermitter({ children: 'Allowed', requiredRole: 'admin', sessionData })
    expect(result).toBeNull()
  })

  it('should support role hierarchy: admin > user', () => {
    const sessionData = { user: { role: 'admin' } }
    const result = RolePermitter({ children: 'Allowed', requiredRole: 'user', sessionData } as any)
    expect(result).toBe('Allowed')
  })

  it('should support role hierarchy: admin > organization-admin > user', () => {
    const sessionData = { user: { role: 'organization-admin' } }
    const result = RolePermitter({ children: 'Allowed', requiredRole: 'user' as any, sessionData } as any)
    expect(result).toBe('Allowed')
  })

  it('should not allow organization-admin for admin required role', () => {
    const sessionData = { user: { role: 'organization-admin' } }
    const result = RolePermitter({ children: 'Allowed', requiredRole: 'admin', sessionData } as any)
    expect(result).toBeNull()
  })
})
