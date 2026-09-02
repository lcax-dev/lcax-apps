import { Divider, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import {
  OrganizationInvitation,
  OrganizationMembers,
  OrganizationSettings,
  OrganizationInvitations,
  OrganizationInvite,
  InfoBlock,
} from '@/components'
import { authClient, useGetActiveMember } from '@/lib'
import { useMemo } from 'react'

export const OrganizationPaper = () => {
  return (
    <Stack gap='xl'>
      <OrganizationInvitation />
      <ActiveOrganizationSection />
    </Stack>
  )
}

const ActiveOrganizationSection = () => {
  const { data: activeOrganization, refetch } = authClient.useActiveOrganization()
  const { member: activeMember } = useGetActiveMember()
  const canManage = useMemo(() => activeMember?.role === 'admin' || activeMember?.role === 'owner', [activeMember])

  if (!activeOrganization) {
    return (
      <Stack gap='md'>
        <div>
          <Text>Organization</Text>
          <Title order={2}>No Active Organization</Title>
        </div>
        <Text c='dimmed'>You are not currently active in any organization.</Text>
      </Stack>
    )
  }

  return (
    <Stack gap='xl'>
      <Stack gap='lg'>
        <div>
          <Text>Organization</Text>
          <Title order={2}>{activeOrganization.name}</Title>
        </div>
        <Text c='dimmed' w={{ base: '100%', xl: '66%' }}>
          Manage organization members, invitations, and configuration.
        </Text>
        <Divider my='xs' />
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing='xl' mt='sm'>
          <InfoBlock title='Organization Name' info={activeOrganization.name} />
          <InfoBlock title='Slug' info={activeOrganization.slug} />
          <InfoBlock title='Your Role' info={activeMember?.role} />
        </SimpleGrid>
      </Stack>

      <Divider my='lg' />
      <OrganizationMembers />

      {canManage && (
        <>
          <Divider my='lg' />
          <OrganizationInvite onSuccess={refetch} />
        </>
      )}

      <Divider my='lg' />
      <OrganizationInvitations />

      {canManage && (
        <>
          <Divider my='lg' />
          <OrganizationSettings />
        </>
      )}
    </Stack>
  )
}
