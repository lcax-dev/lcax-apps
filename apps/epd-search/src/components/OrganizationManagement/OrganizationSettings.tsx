import { Button, Stack, TextInput, Textarea } from '@mantine/core'
import { useState } from 'react'
import { notifications } from '@mantine/notifications'
import { updateOrganization } from './logic'
import { RolePermitter } from '@lcax/ui'
import { authClient } from '@/lib'

interface OrganizationSettingsProps {
  organization: {
    id: string
    name: string
    metadata?: any
  }
  onSuccess?: () => void
}

export const OrganizationSettings = ({ organization, onSuccess }: OrganizationSettingsProps) => {
  const { data: activeMember } = authClient.organization.useActiveMember()
  const [name, setName] = useState(organization.name)
  const [description, setDescription] = useState(organization.metadata?.description || '')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await updateOrganization({
        organizationId: organization.id,
        name,
        metadata: {
          ...organization.metadata,
          description,
        },
      })

      notifications.show({
        title: 'Success',
        message: 'Organization updated successfully',
        color: 'green',
      })
      onSuccess?.()
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error instanceof Error ? error.message : 'Failed to update organization',
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
        <Textarea
          label='Description'
          placeholder='Organization description'
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
        />
        <RolePermitter requiredRole='organization-admin' sessionData={activeMember}>
          <Button type='submit' loading={loading}>
            Update Settings
          </Button>
        </RolePermitter>
      </Stack>
    </form>
  )
}
