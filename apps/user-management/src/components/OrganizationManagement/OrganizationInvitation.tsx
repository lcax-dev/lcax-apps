import { Loading, notifications } from '@lcax/ui'
import { useListUserInvitations } from '@/lib/hooks'
import { acceptInvitation, rejectInvitation } from './logic'
import { Button, Divider, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons-react'
import { InfoBlock } from '@/components'

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
    <Stack gap='lg'>
      <div>
        <Text>Pending</Text>
        <Title order={2}>Organization Invitations</Title>
      </div>
      <Text c='dimmed' w={{ base: '100%', xl: '66%' }}>
        You have been invited to collaborate in the following organizations.
      </Text>
      <Divider my='xs' />
      <Stack gap='xl'>
        {invitations.map((invitation) => (
          <Stack gap='md' key={invitation.id}>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing='md'>
              <InfoBlock title='Organization' info={invitation.organizationName} />
              <InfoBlock title='Role' info={invitation.role} />
              <InfoBlock title='Invited At' info={new Date(invitation.createdAt).toLocaleDateString()} />
              <InfoBlock title='Status' info={invitation.status} />
            </SimpleGrid>
            <Group gap='md' justify='flex-end'>
              <Button
                c='black'
                size='xl'
                rightSection={<IconCheck />}
                onClick={() => handleAccept(invitation.id)}
                disabled={invitation.status !== 'pending'}
                w='fit-content'
              >
                Accept
              </Button>
              <Button
                variant='subtle'
                color='red'
                size='xl'
                rightSection={<IconX />}
                onClick={() => handleReject(invitation.id)}
                disabled={invitation.status !== 'pending'}
                w='fit-content'
              >
                Reject
              </Button>
            </Group>
            <Divider />
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}
