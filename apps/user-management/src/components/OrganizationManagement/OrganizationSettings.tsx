import { Button, Stack, Textarea, TextInput } from '@mantine/core'
import { useState } from 'react'
import { updateOrganization } from './logic'
import { notifications } from '@lcax/ui'
import { authClient } from '@/lib'

export const OrganizationSettings = () => {
  const { data: organization } = authClient.useActiveOrganization()
  const [name, setName] = useState(organization!.name)
  const [description, setDescription] = useState(organization!.metadata?.description || '')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await updateOrganization({
        organizationId: organization!.id,
        name,
        metadata: {
          ...organization!.metadata,
          description,
        },
      })

      notifications.success({
        message: 'Organization updated successfully',
      })
    } catch (error) {
      notifications.error({
        message: error instanceof Error ? error.message : 'Failed to update organization',
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
        <Button type='submit' loading={loading}>
          Update Settings
        </Button>
      </Stack>
    </form>
  )
}
