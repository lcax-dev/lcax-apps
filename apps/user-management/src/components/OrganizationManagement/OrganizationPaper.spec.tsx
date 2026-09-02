import { render, screen, fireEvent } from '@testing-library/react'
import { OrganizationPaper } from './OrganizationPaper'
import { authClient } from '@/lib'

// Mock the auth client
vi.mock('@/lib', () => ({
  authClient: {
    useActiveOrganization: vi.fn(),
    useSession: vi.fn(),
  },
  useGetActiveMember: vi.fn(),
}))

vi.mock('./OrganizationInvitation', () => ({
  OrganizationInvitation: () => <div>OrganizationInvitation</div>,
}))

vi.mock('./OrganizationMembers', () => ({
  OrganizationMembers: () => <div>OrganizationMembers</div>,
}))

vi.mock('./OrganizationSettings', () => ({
  OrganizationSettings: () => <div>OrganizationSettings</div>,
}))

vi.mock('./OrganizationInvitations', () => ({
  OrganizationInvitations: () => <div>OrganizationInvitations</div>,
}))

vi.mock('./OrganizationInvite', () => ({
  OrganizationInvite: ({ onSuccess }: { onSuccess?: () => void }) => (
    <div>
      OrganizationInvite
      <button onClick={() => onSuccess?.()}>Submit</button>
    </div>
  ),
}))

describe('OrganizationPaper', () => {
  const mockActiveOrganization = {
    id: 'org-1',
    name: 'Test Organization',
    invitations: [],
  }

  const mockActiveMember = {
    role: 'owner',
  }

  beforeEach(() => {
    vi.mocked(authClient.useActiveOrganization).mockReturnValue({
      data: mockActiveOrganization,
      isPending: false,
      refetch: vi.fn(),
    })

    vi.mocked(authClient.useSession).mockReturnValue({
      data: {
        user: { role: 'admin' },
      },
    })

    vi.mocked(require('@/lib').useGetActiveMember).mockReturnValue({
      member: mockActiveMember,
    })
  })

  it('should render the organization name', () => {
    render(<OrganizationPaper />)
    expect(screen.getByText('Test Organization')).toBeInTheDocument()
  })

  it('should show the Invite Member button for owners', () => {
    render(<OrganizationPaper />)

    // Click on the Invites tab
    const invitesTab = screen.getByText('Invites')
    fireEvent.click(invitesTab)

    expect(screen.getByText('Invite Member')).toBeInTheDocument()
  })

  it('should show the Invite Member button for admins', () => {
    vi.mocked(require('@/lib').useGetActiveMember).mockReturnValue({
      member: { role: 'admin' },
    })

    render(<OrganizationPaper />)

    // Click on the Invites tab
    const invitesTab = screen.getByText('Invites')
    fireEvent.click(invitesTab)

    expect(screen.getByText('Invite Member')).toBeInTheDocument()
  })

  it('should not show the Invite Member button for non-managers', () => {
    vi.mocked(require('@/lib').useGetActiveMember).mockReturnValue({
      member: { role: 'member' },
    })

    render(<OrganizationPaper />)

    // Click on the Invites tab
    const invitesTab = screen.getByText('Invites')
    fireEvent.click(invitesTab)

    expect(screen.queryByText('Invite Member')).not.toBeInTheDocument()
  })

  it('should open the invite modal when button is clicked', () => {
    render(<OrganizationPaper />)

    // Click on the Invites tab
    const invitesTab = screen.getByText('Invites')
    fireEvent.click(invitesTab)

    // Click the Invite Member button
    const inviteButton = screen.getByText('Invite Member')
    fireEvent.click(inviteButton)

    expect(screen.getByText('Invite Member')).toBeInTheDocument()
    expect(screen.getByText('OrganizationInvite')).toBeInTheDocument()
  })

  it('should call refetch after successful invitation', () => {
    const mockRefetch = vi.fn()
    vi.mocked(authClient.useActiveOrganization).mockReturnValue({
      data: mockActiveOrganization,
      isPending: false,
      refetch: mockRefetch,
    })

    render(<OrganizationPaper />)

    // Click on the Invites tab
    const invitesTab = screen.getByText('Invites')
    fireEvent.click(invitesTab)

    // Click the Invite Member button
    const inviteButton = screen.getByText('Invite Member')
    fireEvent.click(inviteButton)

    // Click the submit button in the modal
    const submitButton = screen.getByText('Submit')
    fireEvent.click(submitButton)

    expect(mockRefetch).toHaveBeenCalled()
  })
})
