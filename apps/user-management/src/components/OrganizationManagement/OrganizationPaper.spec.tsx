import { fireEvent, screen } from '@testing-library/react'
import { render } from '@/test/setup'
import { OrganizationPaper } from './OrganizationPaper'
import { authClient, useGetActiveMember } from '@/lib'
import { beforeEach, describe, expect, it, vi } from 'vitest'

type ActiveOrganization = NonNullable<ReturnType<typeof authClient.useActiveOrganization>['data']>
type ActiveMember = NonNullable<ReturnType<typeof useGetActiveMember>['member']>

// Mock the auth client
vi.mock('@/lib', () => ({
  authClient: {
    useActiveOrganization: vi.fn(),
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
  const mockActiveOrganization: ActiveOrganization = {
    id: 'org-1',
    name: 'Test Organization',
    slug: 'test-organization',
    createdAt: new Date('2023-01-01'),
    members: [],
    invitations: [],
  }

  const createMember = (role: ActiveMember['role']): ActiveMember => ({
    id: `member-${role}`,
    organizationId: mockActiveOrganization.id,
    role,
    createdAt: new Date('2023-01-01'),
    userId: `user-${role}`,
    user: {
      id: `user-${role}`,
      email: `${role}@example.com`,
      name: `${role} user`,
    },
  })

  const mockRefetch = vi.fn()

  const mockActiveOrganizationHook = () => ({
    data: mockActiveOrganization,
    error: null,
    isPending: false,
    isRefetching: false,
    refetch: mockRefetch,
  })

  const mockActiveMemberHook = (member: ActiveMember) => ({
    member,
    error: null,
    isPending: false,
    refetch: vi.fn(),
  })

  beforeEach(() => {
    vi.resetAllMocks()
    vi.mocked(authClient.useActiveOrganization).mockReturnValue(mockActiveOrganizationHook())
    vi.mocked(useGetActiveMember).mockReturnValue(mockActiveMemberHook(createMember('owner')))
  })

  it('renders the active organization name', () => {
    render(<OrganizationPaper />)
    expect(screen.getAllByRole('heading', { name: 'Test Organization' }).length).toBeGreaterThan(0)
  })

  it.each(['owner', 'admin'] as const)('shows the inline invite form for %s members', (role) => {
    vi.mocked(useGetActiveMember).mockReturnValue(mockActiveMemberHook(createMember(role)))

    render(<OrganizationPaper />)

    expect(screen.getByText('OrganizationInvite')).toBeInTheDocument()
  })

  it('hides the inline invite form from regular members', () => {
    vi.mocked(useGetActiveMember).mockReturnValue(mockActiveMemberHook(createMember('member')))

    render(<OrganizationPaper />)

    expect(screen.queryByText('Invite Member')).not.toBeInTheDocument()
  })

  it('refetches the active organization after a successful invitation', () => {
    render(<OrganizationPaper />)

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }))

    expect(mockRefetch).toHaveBeenCalledTimes(1)
  })
})
