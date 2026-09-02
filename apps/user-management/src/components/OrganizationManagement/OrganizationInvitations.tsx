import { Divider, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { authClient } from '@/lib'
import { Loading } from '@lcax/ui'
import { useMemo } from 'react'
import { InfoBlock } from '@/components'

export const OrganizationInvitations = () => {
  const { data: activeOrganization, isPending } = authClient.useActiveOrganization()
  const invitations = useMemo(() => activeOrganization?.invitations ?? [], [activeOrganization])

  if (isPending) {
    return <Loading />
  }

  return (
    <Stack gap='lg'>
      <div>
        <Text>Outbound</Text>
        <Title order={3}>Sent Invitations</Title>
      </div>
      <Text c='dimmed' w={{ base: '100%', xl: '66%' }}>
        Pending invitations sent to prospective members.
      </Text>
      <Divider my='xs' />
      {invitations.length === 0 ? (
        <Text c='dimmed' py='md'>
          No pending invitations
        </Text>
      ) : (
        <Stack gap='md'>
          {invitations.map((invitation) => (
            <Stack gap='sm' key={invitation.id}>
              <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing='md'>
                <InfoBlock title='Email' info={invitation.email} />
                <InfoBlock title='Role' info={invitation.role} />
                <InfoBlock title='Invited At' info={new Date(invitation.createdAt).toLocaleDateString()} />
                <InfoBlock title='Status' info={invitation.status} />
              </SimpleGrid>
              <Divider />
            </Stack>
          ))}
        </Stack>
      )}
    </Stack>
  )
}
