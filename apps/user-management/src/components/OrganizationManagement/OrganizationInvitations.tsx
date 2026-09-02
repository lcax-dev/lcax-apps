import { Table, Text } from '@mantine/core'
import { authClient } from '@/lib'
import { Loading } from '@lcax/ui'
import { useMemo } from 'react'

export const OrganizationInvitations = () => {
  const { data: activeOrganization, isPending } = authClient.useActiveOrganization()
  // const organizationId = useMemo(() => activeOrganization!.id, [activeOrganization])
  const invitations = useMemo(() => activeOrganization?.invitations ?? [], [activeOrganization])

  // const handleRemove = async (memberId: string) => {
  //   if (!confirm('Are you sure you want to remove this member?')) return
  //   try {
  //     await removeMember({ organizationId, memberId })
  //     notifications.success({ message: 'Member removed' })
  //   } catch (error) {
  //     notifications.error({
  //       message: error instanceof Error ? error.message : 'Failed to remove member',
  //     })
  //   }
  // }
  //
  // const handleRoleChange = async (memberId: string, role: string) => {
  //   try {
  //     await updateMemberRole({ organizationId, memberId, role: role as any })
  //     notifications.success({ message: 'Role updated' })
  //   } catch (error) {
  //     notifications.error({
  //       message: error instanceof Error ? error.message : 'Failed to update role',
  //     })
  //   }
  // }

  if (isPending) {
    return <Loading />
  }

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Email</Table.Th>
          <Table.Th>Role</Table.Th>
          <Table.Th>Invited At</Table.Th>
          <Table.Th>Expires</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {invitations?.map((invitation) => (
          <Table.Tr key={invitation.id}>
            <Table.Td>
              <Text size='sm' fw={500}>
                {invitation.email}
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
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}
