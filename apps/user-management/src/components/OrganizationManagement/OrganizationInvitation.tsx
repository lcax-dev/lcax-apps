import { Loading, notifications } from '@lcax/ui'
import { useListUserInvitations } from '@/lib/hooks'
import { acceptInvitation, rejectInvitation } from './logic'
import { Button, Group, Table, Text } from '@mantine/core'

export const OrganizationInvitation = () => {
  const { invitations, isPending, refetch } = useListUserInvitations()

  const handleAccept = async (invitationId: string) => {
    try {
      await acceptInvitation(invitationId)
      notifications.success({ message: 'Invitation accepted successfully' })
      await refetch()
    } catch (error) {
      notifications.error({
        message: error instanceof Error ? error.message : 'Failed to accept invitation',
      })
    }
  }

  const handleReject = async (invitationId: string) => {
    try {
      await rejectInvitation(invitationId)
      notifications.success({ message: 'Invitation rejected successfully' })
      await refetch()
    } catch (error) {
      notifications.error({
        message: error instanceof Error ? error.message : 'Failed to reject invitation',
      })
    }
  }

  if (isPending) {
    return <Loading />
  }
  if (!invitations || !invitations.length) {
    return null
  }

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Organization</Table.Th>
          <Table.Th>Role</Table.Th>
          <Table.Th>Invited At</Table.Th>
          <Table.Th>Expires</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {invitations.map((invitation) => (
          <Table.Tr key={invitation.id}>
            <Table.Td>
              <Text size='sm' fw={500}>
                {invitation.organizationName}
              </Text>
            </Table.Td>
            <Table.Td>
              <Text size='sm'>{invitation.role}</Text>
            </Table.Td>
            <Table.Td>
              <Text size='sm'>{invitation.createdAt.toLocaleString()}</Text>
            </Table.Td>
            <Table.Td>
              <Text size='sm'>{invitation.expiresAt.toLocaleString()}</Text>
            </Table.Td>
            <Table.Td>
              <Text size='sm'>{invitation.status}</Text>
            </Table.Td>
            <Table.Td>
              <Group gap='xs'>
                <Button
                  size='xs'
                  onClick={() => handleAccept(invitation.id)}
                  disabled={invitation.status !== 'pending'}
                >
                  Accept
                </Button>
                <Button
                  size='xs'
                  variant='outline'
                  color='red'
                  onClick={() => handleReject(invitation.id)}
                  disabled={invitation.status !== 'pending'}
                >
                  Reject
                </Button>
              </Group>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}
