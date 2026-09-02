import { Button, Divider, Select, SimpleGrid, Stack, Text, TextInput, Title } from '@mantine/core'
import { useState } from 'react'
import { inviteMember } from './logic'
import { notifications } from '@lcax/ui'
import { authClient } from '@/lib'
import { IconArrowRight } from '@tabler/icons-react'

export const OrganizationInvite = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { data: activeOrganization } = authClient.useActiveOrganization()
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('member')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await inviteMember({
        organizationId: activeOrganization!.id,
        email,
        role: role as any,
      })
      notifications.success({
        message: 'Invitation sent successfully',
      })
      setEmail('')
      onSuccess?.()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to send invitation'
      setError(msg)
      notifications.error({
        message: msg,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Stack gap='lg'>
      <div>
        <Text>Team</Text>
        <Title order={3}>Invite Member</Title>
      </div>
      <Text c='dimmed' w={{ base: '100%', xl: '66%' }}>
        Invite colleagues or contributors to this organization.
      </Text>
      <Divider my='xs' />
      <form onSubmit={handleSubmit}>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing='xl'>
          <Stack gap='md'>
            {error && (
              <Text c='red' size='sm'>
                {error}
              </Text>
            )}
            <TextInput
              label='Member Email'
              placeholder='user@example.com'
              required
              type='email'
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              radius='xl'
              size='md'
            />
            <Select
              label='Member Role'
              data={[
                { value: 'owner', label: 'Owner' },
                { value: 'admin', label: 'Admin' },
                { value: 'member', label: 'Member' },
              ]}
              value={role}
              onChange={(value) => setRole(value || 'member')}
              radius='xl'
              size='md'
            />
            <Button
              c='black'
              size='xl'
              rightSection={<IconArrowRight />}
              type='submit'
              loading={loading}
              w='fit-content'
              mt='sm'
            >
              Send Invitation
            </Button>
          </Stack>
          <Stack justify='center'>
            <Text c='dimmed' size='sm'>
              Invited members will receive an email invitation to join your organization with the specified role.
            </Text>
          </Stack>
        </SimpleGrid>
      </form>
    </Stack>
  )
}
