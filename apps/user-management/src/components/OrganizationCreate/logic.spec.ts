import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createOrganizationAndInvite } from './logic'
import { authClient } from '@/lib'

vi.mock('@/lib', () => ({
  authClient: {
    organization: {
      create: vi.fn(),
      inviteMember: vi.fn(),
    },
  },
}))

describe('createOrganizationAndInvite', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should create an organization without invitation', async () => {
    vi.mocked(authClient.organization.create).mockResolvedValue({
      data: { id: 'org-1', name: 'Test Org', slug: 'test-org' },
      error: null,
    } as any)

    const result = await createOrganizationAndInvite({
      name: 'Test Org',
      slug: 'test-org',
      inviteMember: false,
    })

    expect(authClient.organization.create).toHaveBeenCalledWith({
      name: 'Test Org',
      slug: 'test-org',
    })
    expect(authClient.organization.inviteMember).not.toHaveBeenCalled()
    expect(result.id).toBe('org-1')
  })

  it('should create an organization and invite a member', async () => {
    vi.mocked(authClient.organization.create).mockResolvedValue({
      data: { id: 'org-1', name: 'Test Org', slug: 'test-org' },
      error: null,
    } as any)
    vi.mocked(authClient.organization.inviteMember).mockResolvedValue({
      data: { id: 'invite-1' },
      error: null,
    } as any)

    await createOrganizationAndInvite({
      name: 'Test Org',
      slug: 'test-org',
      inviteMember: true,
      memberEmail: 'test@example.com',
      memberRole: 'user',
    })

    expect(authClient.organization.create).toHaveBeenCalled()
    expect(authClient.organization.inviteMember).toHaveBeenCalledWith({
      email: 'test@example.com',
      role: 'user',
      organizationId: 'org-1',
    })
  })

  it('should throw error if organization creation fails', async () => {
    vi.mocked(authClient.organization.create).mockResolvedValue({
      data: null,
      error: { message: 'Creation failed' },
    } as any)

    await expect(
      createOrganizationAndInvite({
        name: 'Test Org',
        slug: 'test-org',
        inviteMember: false,
      }),
    ).rejects.toThrow('Creation failed')
  })
})
