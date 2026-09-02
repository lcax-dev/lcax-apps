import { Button, Checkbox, Divider, Select, SimpleGrid, Stack, Text, TextInput, Title } from '@mantine/core'
import { useState } from 'react'
import { notifications } from '@lcax/ui'
import { createOrganizationAndInvite } from './logic'
import { IconArrowRight } from '@tabler/icons-react'

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
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await createOrganizationAndInvite({
        name,
        slug,
        inviteMember,
        memberEmail,
        memberRole,
      })

      notifications.success({
        message: 'Organization created successfully',
      })
      setName('')
      setSlug('')
      setInviteMember(false)
      setMemberEmail('')
      onSuccess?.()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to create organization'
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
        <Text>Administration</Text>
        <Title order={3}>Create Organization</Title>
      </div>
      <Text c='dimmed' w={{ base: '100%', xl: '66%' }}>
        Register a new organization and optionally invite an initial team member.
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
              onChange={(e) => {
                setName(e.currentTarget.value)
                if (!slug || slug === name.toLowerCase().replace(/\s+/g, '-')) {
                  setSlug(e.currentTarget.value.toLowerCase().replace(/\s+/g, '-'))
                }
              }}
              radius='xl'
              size='md'
            />
            <TextInput
              label='Slug'
              placeholder='my-organization'
              required
              value={slug}
              onChange={(e) => setSlug(e.currentTarget.value)}
              radius='xl'
              size='md'
            />
            <Checkbox
              label='Invite initial member'
              checked={inviteMember}
              onChange={(e) => setInviteMember(e.currentTarget.checked)}
              mt='xs'
            />
            {inviteMember && (
              <>
                <TextInput
                  label='Member Email'
                  placeholder='user@example.com'
                  required
                  type='email'
                  value={memberEmail}
                  onChange={(e) => setMemberEmail(e.currentTarget.value)}
                  radius='xl'
                  size='md'
                />
                <Select
                  label='Role'
                  data={[
                    { value: 'owner', label: 'Owner' },
                    { value: 'admin', label: 'Admin' },
                    { value: 'member', label: 'Member' },
                  ]}
                  value={memberRole}
                  onChange={(value) => setMemberRole(value || 'member')}
                  radius='xl'
                  size='md'
                />
              </>
            )}
            <Button
              c='black'
              size='xl'
              rightSection={<IconArrowRight />}
              type='submit'
              loading={loading}
              w='fit-content'
              mt='sm'
            >
              Create Organization
            </Button>
          </Stack>
          <Stack justify='center'>
            <Text c='dimmed' size='sm'>
              Organizations group projects, members, and permissions together under a shared workspace.
            </Text>
          </Stack>
        </SimpleGrid>
      </form>
    </Stack>
  )
}
