import { describe, it, expect } from 'vitest'
import { authClient } from './auth-client'

describe('authClient', () => {
  it('should have organization plugin', () => {
    expect(authClient.organization).toBeDefined()
  })
})
