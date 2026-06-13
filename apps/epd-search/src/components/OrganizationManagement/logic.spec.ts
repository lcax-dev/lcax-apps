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
})
