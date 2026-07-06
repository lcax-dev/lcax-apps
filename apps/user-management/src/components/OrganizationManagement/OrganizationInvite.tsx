import { Button, Select, Stack, TextInput } from '@mantine/core'
import { useState } from 'react'
import { inviteMember } from './logic'
import { RolePermitter, notifications } from '@lcax/ui'
import { authClient } from '@/lib'

export const OrganizationInvite = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { data: activeOrganization } = authClient.useActiveOrganization()
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('member')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
    } catch (error) {
      notifications.error({
        message: error instanceof Error ? error.message : 'Failed to send invitation',
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
            { value: 'member', label: 'Member' },
          ]}
          value={role}
          onChange={(value) => setRole(value || 'member')}
        />
        <RolePermitter requiredRole='owner'>
          <Button type='submit' loading={loading}>
            Send Invitation
          </Button>
        </RolePermitter>
      </Stack>
    </form>
  )
}
