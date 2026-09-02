import { Button, Divider, SimpleGrid, Stack, Text, Textarea, TextInput, Title } from '@mantine/core'
import { useState } from 'react'
import { updateOrganization } from './logic'
import { notifications } from '@lcax/ui'
import { authClient } from '@/lib'
import { IconArrowRight } from '@tabler/icons-react'

export const OrganizationSettings = () => {
  const { data: organization } = authClient.useActiveOrganization()
  const [name, setName] = useState(organization?.name ?? '')
  const [description, setDescription] = useState(organization?.metadata?.description || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
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
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to update organization'
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
        <Text>Configuration</Text>
        <Title order={3}>Organization Settings</Title>
      </div>
      <Text c='dimmed' w={{ base: '100%', xl: '66%' }}>
        Update organization metadata and display preferences.
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
              label='Organization Name'
              placeholder='My Organization'
              required
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              radius='xl'
              size='md'
            />
            <Textarea
              label='Description'
              placeholder='Organization description'
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
              radius='md'
              size='md'
              minRows={3}
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
              Update Settings
            </Button>
          </Stack>
          <Stack justify='center'>
            <Text c='dimmed' size='sm'>
              Changes to organization settings take effect immediately across all members and associated LCAx projects.
            </Text>
          </Stack>
        </SimpleGrid>
      </form>
    </Stack>
  )
}
