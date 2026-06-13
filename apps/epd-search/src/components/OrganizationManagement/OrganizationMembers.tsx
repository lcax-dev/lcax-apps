import { ActionIcon, Badge, Select, Table, Text, Loader, Center } from '@mantine/core'
import { authClient } from '@/lib'
import { notifications } from '@mantine/notifications'
import { removeMember, updateMemberRole } from './logic'
import { IconTrash } from '@tabler/icons-react'

interface OrganizationMembersProps {
  organizationId: string
}

export const OrganizationMembers = ({ organizationId }: OrganizationMembersProps) => {
  const { data: members, isPending, refetch } = authClient.organization.useListMembers({ organizationId })
  const { data: activeMember } = authClient.organization.useActiveMember()

  const handleRemove = async (memberId: string) => {
    if (!confirm('Are you sure you want to remove this member?')) return
    try {
      await removeMember({ organizationId, memberId })
      notifications.show({ title: 'Success', message: 'Member removed', color: 'green' })
      refetch()
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error instanceof Error ? error.message : 'Failed to remove member',
        color: 'red',
      })
    }
  }

  const handleRoleChange = async (memberId: string, role: string) => {
    try {
      await updateMemberRole({ organizationId, memberId, role: role as any })
      notifications.show({ title: 'Success', message: 'Role updated', color: 'green' })
      refetch()
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error instanceof Error ? error.message : 'Failed to update role',
        color: 'red',
      })
    }
  }

  if (isPending) {
    return (
      <Center py='xl'>
        <Loader />
      </Center>
    )
  }

  const canManage =
    activeMember?.role === 'admin' || activeMember?.role === 'owner' || activeMember?.role === 'organization-admin'

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>User</Table.Th>
          <Table.Th>Role</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {members?.map((member) => (
          <Table.Tr key={member.id}>
            <Table.Td>
              <Text size='sm' fw={500}>
                {member.user.name}
              </Text>
              <Text size='xs' c='dimmed'>
                {member.user.email}
              </Text>
            </Table.Td>
            <Table.Td>
              {canManage && member.id !== activeMember?.id ? (
                <Select
                  size='xs'
                  data={[
                    { value: 'owner', label: 'Owner' },
                    { value: 'admin', label: 'Admin' },
                    { value: 'organization-admin', label: 'Organization Admin' },
                    { value: 'member', label: 'Member' },
                  ]}
                  value={member.role}
                  onChange={(value) => value && handleRoleChange(member.id, value)}
                />
              ) : (
                <Badge>{member.role}</Badge>
              )}
            </Table.Td>
            <Table.Td>
              {canManage && member.id !== activeMember?.id && (
                <ActionIcon color='red' variant='subtle' onClick={() => handleRemove(member.id)}>
                  <IconTrash size={16} />
                </ActionIcon>
              )}
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}
