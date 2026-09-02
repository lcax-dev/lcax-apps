import { Button, Divider, Group, Select, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { authClient, useGetActiveMember } from '@/lib'
import { removeMember, updateMemberRole } from './logic'
import { IconTrash } from '@tabler/icons-react'
import { Loading, notifications, RolePermitter } from '@lcax/ui'
import { useMemo } from 'react'

export const OrganizationMembers = () => {
  const { data: activeOrganization, isPending } = authClient.useActiveOrganization()
  const { member: activeMember } = useGetActiveMember()
  const organizationId = useMemo(() => activeOrganization?.id ?? '', [activeOrganization])
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
    <Stack gap='lg'>
      <div>
        <Text>Members</Text>
        <Title order={3}>Organization Members</Title>
      </div>
      <Text c='dimmed' w={{ base: '100%', xl: '66%' }}>
        Active team members and their permission roles.
      </Text>
      <Divider my='xs' />
      {members.length === 0 ? (
        <Text c='dimmed' py='md'>
          No members found
        </Text>
      ) : (
        <Stack gap='md'>
          {members.map((member) => (
            <Stack gap='sm' key={member.id}>
              <SimpleGrid cols={{ base: 1, sm: 3 }} spacing='md' align='center'>
                <Stack gap={2}>
                  <Text fw={500} size='md'>
                    {member.user.name}
                  </Text>
                  <Text size='sm' c='dimmed'>
                    {member.user.email}
                  </Text>
                </Stack>
                <Group gap='md' align='center'>
                  <Text size='sm' c='dimmed'>
                    Role:
                  </Text>
                  {canManage && member.id !== activeMember?.id ? (
                    <Select
                      size='sm'
                      radius='xl'
                      data={[
                        { value: 'owner', label: 'Owner' },
                        { value: 'admin', label: 'Admin' },
                        { value: 'member', label: 'Member' },
                      ]}
                      value={member.role}
                      onChange={(value) => value && handleRoleChange(member.id, value)}
                      w={140}
                    />
                  ) : (
                    <Text fw={500} size='sm'>
                      {member.role}
                    </Text>
                  )}
                </Group>
                <Group justify={{ base: 'flex-start', sm: 'flex-end' }}>
                  {canManage && member.id !== activeMember?.id && (
                    <RolePermitter requiredRole='owner'>
                      <Button
                        variant='subtle'
                        color='red'
                        size='sm'
                        rightSection={<IconTrash size={16} />}
                        onClick={() => handleRemove(member.id)}
                        w='fit-content'
                      >
                        Remove
                      </Button>
                    </RolePermitter>
                  )}
                </Group>
              </SimpleGrid>
              <Divider />
            </Stack>
          ))}
        </Stack>
      )}
    </Stack>
  )
}
