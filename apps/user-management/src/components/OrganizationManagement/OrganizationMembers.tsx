import { ActionIcon, Badge, Select, Table, Text } from '@mantine/core'
import { authClient, useGetActiveMember } from '@/lib'
import { removeMember, updateMemberRole } from './logic'
import { IconTrash } from '@tabler/icons-react'
import { Loading, notifications, RolePermitter } from '@lcax/ui'
import { useMemo } from 'react'

export const OrganizationMembers = () => {
  const { data: activeOrganization, isPending } = authClient.useActiveOrganization()
  const { member: activeMember } = useGetActiveMember()
  const organizationId = useMemo(() => activeOrganization!.id, [activeOrganization])
  const members = useMemo(() => activeOrganization?.members ?? [], [activeOrganization])

  const handleRemove = async (memberId: string) => {
    if (!confirm('Are you sure you want to remove this member?')) return
    try {
      await removeMember({ organizationId, memberId })
      notifications.success({ message: 'Member removed' })
    } catch (error) {
      notifications.error({
        message: error instanceof Error ? error.message : 'Failed to remove member',
      })
    }
  }

  const handleRoleChange = async (memberId: string, role: string) => {
    try {
      await updateMemberRole({ organizationId, memberId, role: role as any })
      notifications.success({ message: 'Role updated' })
    } catch (error) {
      notifications.error({
        message: error instanceof Error ? error.message : 'Failed to update role',
      })
    }
  }

  if (isPending) {
    return <Loading />
  }

  const canManage = activeMember?.role === 'admin' || activeMember?.role === 'owner'

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
                <RolePermitter requiredRole='owner'>
                  <ActionIcon color='red' variant='subtle' onClick={() => handleRemove(member.id)}>
                    <IconTrash size={16} />
                  </ActionIcon>
                </RolePermitter>
              )}
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}
