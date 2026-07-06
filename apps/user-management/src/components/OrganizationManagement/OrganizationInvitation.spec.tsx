import { render, screen, waitFor } from '@testing-library/react'
import { OrganizationInvitation } from './OrganizationInvitation'
import { useListUserInvitations } from '@/lib/hooks'
import { acceptInvitation, rejectInvitation, getOrganization } from './logic'

// Mock the hooks and functions
vi.mock('@/lib/hooks', () => ({
  useListUserInvitations: vi.fn(),
}))

vi.mock('./logic', () => ({
  acceptInvitation: vi.fn(),
  rejectInvitation: vi.fn(),
  getOrganization: vi.fn(),
}))

describe('OrganizationInvitation', () => {
  const mockInvitations = [
    {
      id: 'invite-1',
      organizationId: 'org-1',
      role: 'member',
      status: 'pending',
      createdAt: new Date('2023-01-01'),
      expiresAt: new Date('2023-12-31'),
    },
    {
      id: 'invite-2',
      organizationId: 'org-2',
      role: 'admin',
      status: 'pending',
      createdAt: new Date('2023-02-01'),
      expiresAt: new Date('2023-11-30'),
    },
  ]

  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should render loading state initially', () => {
    vi.mocked(useListUserInvitations).mockReturnValue({
      invitations: null,
      isPending: true,
      refetch: vi.fn(),
    })

    render(<OrganizationInvitation />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('should render null when no invitations', () => {
    vi.mocked(useListUserInvitations).mockReturnValue({
      invitations: [],
      isPending: false,
      refetch: vi.fn(),
    })

    const { container } = render(<OrganizationInvitation />)
    expect(container).toBeEmptyDOMElement()
  })

  it('should render invitations table with organization names', async () => {
    vi.mocked(useListUserInvitations).mockReturnValue({
      invitations: mockInvitations,
      isPending: false,
      refetch: vi.fn(),
    })

    vi.mocked(getOrganization).mockImplementation(async (orgId) => {
      return { id: orgId, name: `Org ${orgId}` }
    })

    render(<OrganizationInvitation />)

    await waitFor(() => {
      expect(screen.getByText('Org org-1')).toBeInTheDocument()
      expect(screen.getByText('Org org-2')).toBeInTheDocument()
      expect(screen.getByText('member')).toBeInTheDocument()
      expect(screen.getByText('admin')).toBeInTheDocument()
    })
  })

  it('should handle accept invitation', async () => {
    const mockRefetch = vi.fn()
    vi.mocked(useListUserInvitations).mockReturnValue({
      invitations: [mockInvitations[0]],
      isPending: false,
      refetch: mockRefetch,
    })

    vi.mocked(getOrganization).mockResolvedValue({ id: 'org-1', name: 'Test Org' })
    vi.mocked(acceptInvitation).mockResolvedValue({})

    render(<OrganizationInvitation />)

    await waitFor(() => {
      expect(screen.getByText('Accept')).toBeInTheDocument()
    })

    const acceptButtons = screen.getAllByText('Accept')
    acceptButtons[0].click()

    await waitFor(() => {
      expect(acceptInvitation).toHaveBeenCalledWith('invite-1')
      expect(mockRefetch).toHaveBeenCalled()
    })
  })

  it('should handle reject invitation', async () => {
    const mockRefetch = vi.fn()
    vi.mocked(useListUserInvitations).mockReturnValue({
      invitations: [mockInvitations[0]],
      isPending: false,
      refetch: mockRefetch,
    })

    vi.mocked(getOrganization).mockResolvedValue({ id: 'org-1', name: 'Test Org' })
    vi.mocked(rejectInvitation).mockResolvedValue({})

    render(<OrganizationInvitation />)

    await waitFor(() => {
      expect(screen.getByText('Reject')).toBeInTheDocument()
    })

    const rejectButtons = screen.getAllByText('Reject')
    rejectButtons[0].click()

    await waitFor(() => {
      expect(rejectInvitation).toHaveBeenCalledWith('invite-1')
      expect(mockRefetch).toHaveBeenCalled()
    })
  })

  it('should disable buttons for non-pending invitations', async () => {
    const nonPendingInvitation = {
      ...mockInvitations[0],
      status: 'accepted',
    }

    vi.mocked(useListUserInvitations).mockReturnValue({
      invitations: [nonPendingInvitation],
      isPending: false,
      refetch: vi.fn(),
    })

    vi.mocked(getOrganization).mockResolvedValue({ id: 'org-1', name: 'Test Org' })

    render(<OrganizationInvitation />)

    await waitFor(() => {
      const acceptButton = screen.getByText('Accept')
      const rejectButton = screen.getByText('Reject')
      expect(acceptButton).toBeDisabled()
      expect(rejectButton).toBeDisabled()
    })
  })
})
