import { describe, it, expect, vi, beforeEach } from 'vitest'
import { updateOrganization, inviteMember, removeMember, updateMemberRole } from './logic'
import { authClient } from '@/lib'

vi.mock('@/lib', () => ({
  authClient: {
    organization: {
      update: vi.fn(),
      inviteMember: vi.fn(),
      removeMember: vi.fn(),
      updateMemberRole: vi.fn(),
      acceptInvitation: vi.fn(),
      rejectInvitation: vi.fn(),
      getFullOrganization: vi.fn(),
    },
  },
}))

describe('OrganizationManagement logic', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('updateOrganization', () => {
    it('should update organization name and metadata', async () => {
      vi.mocked(authClient.organization.update).mockResolvedValue({
        data: { id: 'org-1', name: 'Updated Name', slug: 'org-1' },
        error: null,
      } as any)

      await updateOrganization({
        organizationId: 'org-1',
        name: 'Updated Name',
        metadata: { key: 'value' },
      })

      expect(authClient.organization.update).toHaveBeenCalledWith({
        organizationId: 'org-1',
        data: {
          name: 'Updated Name',
          metadata: { key: 'value' },
        },
      })
    })

    it('should throw error if update fails', async () => {
      vi.mocked(authClient.organization.update).mockResolvedValue({
        data: null,
        error: { message: 'Update failed' },
      } as any)

      await expect(
        updateOrganization({
          organizationId: 'org-1',
          name: 'Updated Name',
        }),
      ).rejects.toThrow('Update failed')
    })
  })

  describe('inviteMember', () => {
    it('should invite a member', async () => {
      vi.mocked(authClient.organization.inviteMember).mockResolvedValue({
        data: { id: 'invite-1' },
        error: null,
      } as any)

      await inviteMember({
        organizationId: 'org-1',
        email: 'test@example.com',
        role: 'admin',
      })

      expect(authClient.organization.inviteMember).toHaveBeenCalledWith({
        organizationId: 'org-1',
        email: 'test@example.com',
        role: 'admin',
      })
    })
  })

  describe('removeMember', () => {
    it('should remove a member', async () => {
      vi.mocked(authClient.organization.removeMember).mockResolvedValue({
        data: { success: true },
        error: null,
      } as any)

      await removeMember({
        organizationId: 'org-1',
        memberId: 'member-1',
      })

      expect(authClient.organization.removeMember).toHaveBeenCalledWith({
        organizationId: 'org-1',
        memberId: 'member-1',
      })
    })
  })

  describe('updateMemberRole', () => {
    it('should update member role', async () => {
      vi.mocked(authClient.organization.updateMemberRole).mockResolvedValue({
        data: { id: 'member-1', role: 'owner' },
        error: null,
      } as any)

      await updateMemberRole({
        organizationId: 'org-1',
        memberId: 'member-1',
        role: 'owner',
      })

      expect(authClient.organization.updateMemberRole).toHaveBeenCalledWith({
        organizationId: 'org-1',
        memberId: 'member-1',
        role: 'owner',
      })
    })
  })

  describe('acceptInvitation', () => {
    it('should accept an invitation', async () => {
      vi.mocked(authClient.organization.acceptInvitation).mockResolvedValue({
        data: { success: true },
        error: null,
      } as any)

      const { acceptInvitation } = await import('./logic')
      await acceptInvitation('invite-1')

      expect(authClient.organization.acceptInvitation).toHaveBeenCalledWith({
        invitationId: 'invite-1',
      })
    })

    it('should throw error if accept fails', async () => {
      vi.mocked(authClient.organization.acceptInvitation).mockResolvedValue({
        data: null,
        error: { message: 'Accept failed' },
      } as any)

      const { acceptInvitation } = await import('./logic')
      await expect(acceptInvitation('invite-1')).rejects.toThrow('Accept failed')
    })
  })

  describe('rejectInvitation', () => {
    it('should reject an invitation', async () => {
      vi.mocked(authClient.organization.rejectInvitation).mockResolvedValue({
        data: { success: true },
        error: null,
      } as any)

      const { rejectInvitation } = await import('./logic')
      await rejectInvitation('invite-1')

      expect(authClient.organization.rejectInvitation).toHaveBeenCalledWith({
        invitationId: 'invite-1',
      })
    })

    it('should throw error if reject fails', async () => {
      vi.mocked(authClient.organization.rejectInvitation).mockResolvedValue({
        data: null,
        error: { message: 'Reject failed' },
      } as any)

      const { rejectInvitation } = await import('./logic')
      await expect(rejectInvitation('invite-1')).rejects.toThrow('Reject failed')
    })
  })

  describe('getOrganization', () => {
    it('should get organization details', async () => {
      vi.mocked(authClient.organization.getFullOrganization).mockResolvedValue({
        data: { id: 'org-1', name: 'Test Org', slug: 'test-org' },
        error: null,
      } as any)

      const { getOrganization } = await import('./logic')
      const result = await getOrganization('org-1')

      expect(authClient.organization.getFullOrganization).toHaveBeenCalledWith({
        organizationId: 'org-1',
      })
      expect(result).toEqual({ id: 'org-1', name: 'Test Org', slug: 'test-org' })
    })

    it('should throw error if get organization fails', async () => {
      vi.mocked(authClient.organization.getFullOrganization).mockResolvedValue({
        data: null,
        error: { message: 'Get organization failed' },
      } as any)

      const { getOrganization } = await import('./logic')
      await expect(getOrganization('org-1')).rejects.toThrow('Get organization failed')
    })
  })
})
