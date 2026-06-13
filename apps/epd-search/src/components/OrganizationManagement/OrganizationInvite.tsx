import { Button, Select, Stack, TextInput } from '@mantine/core'
import { useState } from 'react'
import { notifications } from '@mantine/notifications'
import { inviteMember } from './logic'

interface OrganizationInviteProps {
  organizationId: string
  onSuccess?: () => void
}

export const OrganizationInvite = ({ organizationId, onSuccess }: OrganizationInviteProps) => {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('member')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await inviteMember({
        organizationId,
        email,
        role: role as any,
      })

      notifications.show({
        title: 'Success',
        message: 'Invitation sent successfully',
        color: 'green',
      })
      setEmail('')
      onSuccess?.()
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error instanceof Error ? error.message : 'Failed to send invitation',
        color: 'red',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput
          label='Member Email'
          placeholder='user@example.com'
          required
          type='email'
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <Select
          label='Member Role'
          data={[
            { value: 'owner', label: 'Owner' },
            { value: 'admin', label: 'Admin' },
            { value: 'organization-admin', label: 'Organization Admin' },
            { value: 'member', label: 'Member' },
          ]}
          value={role}
          onChange={(value) => setRole(value || 'member')}
        />
        <Button type='submit' loading={loading}>
          Send Invitation
        </Button>
      </Stack>
    </form>
  )
}
