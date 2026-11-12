import { fireEvent, screen, waitFor } from '@testing-library/react'
import { render } from '@/test/setup'
import { OrganizationInvitation } from '@/components'
import { useListUserInvitations } from '@/lib/hooks'
import { authClient } from '@/lib'
import { acceptInvitation, rejectInvitation } from './logic'
import { beforeEach, describe, expect, it, vi } from 'vitest'

type Invitation = NonNullable<ReturnType<typeof useListUserInvitations>['invitations']>[number]

const mockInvitations: Invitation[] = [
  {
    id: 'invite-1',
    organizationId: 'org-1',
    email: 'member@example.com',
    role: 'member',
    status: 'pending',
    inviterId: 'owner-1',
    createdAt: new Date('2023-01-01'),
    expiresAt: new Date('2023-12-31'),
    organizationName: 'Acme',
  },
  {
    id: 'invite-2',
    organizationId: 'org-2',
    email: 'admin@example.com',
    role: 'admin',
    status: 'pending',
    inviterId: 'owner-2',
    createdAt: new Date('2023-02-01'),
    expiresAt: new Date('2023-11-30'),
    organizationName: 'Globex',
  },
]

const mockMember: typeof authClient.$Infer.Member = {
  id: 'member-1',
  organizationId: 'org-1',
  role: 'member',
  createdAt: new Date('2023-01-01'),
  userId: 'user-1',
  user: {
    id: 'user-1',
    email: 'member@example.com',
    name: 'Member User',
  },
}

const acceptedResult: Awaited<ReturnType<typeof acceptInvitation>> = {
  invitation: mockInvitations[0],
  member: mockMember,
}

const rejectedResult: Awaited<ReturnType<typeof rejectInvitation>> = {
  invitation: mockInvitations[0],
  member: null,
}

// Mock the hooks and functions
vi.mock('@/lib/hooks', () => ({
  useListUserInvitations: vi.fn(),
}))

vi.mock('./logic', () => ({
  acceptInvitation: vi.fn(),
  rejectInvitation: vi.fn(),
}))

describe('OrganizationInvitation', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should render loading state initially', () => {
    vi.mocked(useListUserInvitations).mockReturnValue({
      invitations: null,
      error: null,
      isPending: true,
      refetch: vi.fn(async () => []),
    })

    render(<OrganizationInvitation />)
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument()
  })

  it('should render null when no invitations', () => {
    vi.mocked(useListUserInvitations).mockReturnValue({
      invitations: [],
      error: null,
      isPending: false,
      refetch: vi.fn(async () => []),
    })

    render(<OrganizationInvitation />)
    expect(screen.queryByRole('heading', { name: 'Organization Invitations' })).not.toBeInTheDocument()
  })

  it('should render invitations table with organization names', async () => {
    vi.mocked(useListUserInvitations).mockReturnValue({
      invitations: mockInvitations,
      error: null,
      isPending: false,
      refetch: vi.fn(async () => mockInvitations),
    })

    render(<OrganizationInvitation />)

    await waitFor(() => {
      expect(screen.getByText('Acme')).toBeInTheDocument()
      expect(screen.getByText('Globex')).toBeInTheDocument()
      expect(screen.getByText('member')).toBeInTheDocument()
      expect(screen.getByText('admin')).toBeInTheDocument()
    })
  })

  it('should handle accept invitation', async () => {
    const mockRefetch = vi.fn()
    vi.mocked(useListUserInvitations).mockReturnValue({
      invitations: [mockInvitations[0]],
      error: null,
      isPending: false,
      refetch: mockRefetch,
    })

    vi.mocked(acceptInvitation).mockResolvedValue(acceptedResult)

    render(<OrganizationInvitation />)

    await waitFor(() => {
      expect(screen.getByText('Accept')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByRole('button', { name: 'Accept' }))

    await waitFor(() => {
      expect(acceptInvitation).toHaveBeenCalledWith('invite-1')
      expect(mockRefetch).toHaveBeenCalled()
    })
  })

  it('should handle reject invitation', async () => {
    const mockRefetch = vi.fn()
    vi.mocked(useListUserInvitations).mockReturnValue({
      invitations: [mockInvitations[0]],
      error: null,
      isPending: false,
      refetch: mockRefetch,
    })

    vi.mocked(rejectInvitation).mockResolvedValue(rejectedResult)

    render(<OrganizationInvitation />)

    await waitFor(() => {
      expect(screen.getByText('Reject')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByRole('button', { name: 'Reject' }))

    await waitFor(() => {
      expect(rejectInvitation).toHaveBeenCalledWith('invite-1')
      expect(mockRefetch).toHaveBeenCalled()
    })
  })

  it('should disable buttons for non-pending invitations', async () => {
    const nonPendingInvitation: Invitation = {
      ...mockInvitations[0],
      status: 'accepted',
    }

    vi.mocked(useListUserInvitations).mockReturnValue({
      invitations: [nonPendingInvitation],
      error: null,
      isPending: false,
      refetch: vi.fn(async () => [nonPendingInvitation]),
    })

    render(<OrganizationInvitation />)

    await waitFor(() => {
      const acceptButton = screen.getByRole('button', { name: 'Accept' })
      const rejectButton = screen.getByRole('button', { name: 'Reject' })
      expect(acceptButton).toBeDisabled()
      expect(rejectButton).toBeDisabled()
    })
  })
})
