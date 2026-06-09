import { Button, Checkbox, Select, Stack, TextInput } from '@mantine/core'
import { useState } from 'react'
import { notifications } from '@mantine/notifications'
import { createOrganizationAndInvite } from './logic'

interface OrganizationCreateProps {
  onSuccess?: () => void
}

export const OrganizationCreate = ({ onSuccess }: OrganizationCreateProps) => {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [inviteMember, setInviteMember] = useState(false)
  const [memberEmail, setMemberEmail] = useState('')
  const [memberRole, setMemberRole] = useState('user')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await createOrganizationAndInvite({
        name,
        slug,
        inviteMember,
        memberEmail,
        memberRole,
      })

      notifications.show({
        title: 'Success',
        message: 'Organization created successfully',
        color: 'green',
      })
      onSuccess?.()
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error instanceof Error ? error.message : 'Failed to create organization',
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
          label='Organization Name'
          placeholder='My Organization'
          required
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <TextInput
          label='Slug'
          placeholder='my-organization'
          required
          value={slug}
          onChange={(e) => setSlug(e.currentTarget.value)}
        />
        <Checkbox
          label='Invite initial member'
          checked={inviteMember}
          onChange={(e) => setInviteMember(e.currentTarget.checked)}
        />
        {inviteMember && (
          <>
            <TextInput
              label='Member Email'
              placeholder='user@example.com'
              required
              value={memberEmail}
              onChange={(e) => setMemberEmail(e.currentTarget.value)}
            />
            <Select
              label='Member Role'
              data={[
                { value: 'organization-admin', label: 'Organization Admin' },
                { value: 'user', label: 'User' },
              ]}
              value={memberRole}
              onChange={(value) => setMemberRole(value || 'user')}
            />
          </>
        )}
        <Button type='submit' loading={loading}>
          Create Organization
        </Button>
      </Stack>
    </form>
  )
}
