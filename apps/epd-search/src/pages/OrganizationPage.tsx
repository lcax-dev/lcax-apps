import { Container, Paper, Stack, Title, Text, Tabs, Loader, Center } from '@mantine/core'
import { authClient } from '@/lib'
import { OrganizationSettings, OrganizationMembers, OrganizationInvite } from '@/components'

export const OrganizationPage = () => {
  const { data: activeOrg, isPending: isOrgPending, refetch } = authClient.useActiveOrganization()
  const { data: activeMember, isPending: isMemberPending } = authClient.organization.useActiveMember()

  if (isOrgPending || isMemberPending) {
    return (
      <Center py='xl'>
        <Loader />
      </Center>
    )
  }

  if (!activeOrg) {
    return (
      <Container size='lg' py='xl'>
        <Paper withBorder p='xl' radius='md'>
          <Title order={3}>No Active Organization</Title>
          <Text mt='md'>You are not currently part of an active organization.</Text>
        </Paper>
      </Container>
    )
  }

  const canManage =
    activeMember?.role === 'admin' || activeMember?.role === 'owner' || activeMember?.role === 'organization-admin'

  return (
    <Container size='lg' py='xl'>
      <Stack gap='xl'>
        <Title order={2}>Organization Management: {activeOrg.name}</Title>

        <Tabs defaultValue='members'>
          <Tabs.List>
            <Tabs.Tab value='members'>Members</Tabs.Tab>
            {canManage && <Tabs.Tab value='invite'>Invite</Tabs.Tab>}
            {canManage && <Tabs.Tab value='settings'>Settings</Tabs.Tab>}
          </Tabs.List>

          <Tabs.Panel value='members' pt='xl'>
            <Paper withBorder p='md' radius='md'>
              <OrganizationMembers organizationId={activeOrg.id} />
            </Paper>
          </Tabs.Panel>

          {canManage && (
            <Tabs.Panel value='invite' pt='xl'>
              <Paper withBorder p='md' radius='md'>
                <OrganizationInvite organizationId={activeOrg.id} onSuccess={refetch} />
              </Paper>
            </Tabs.Panel>
          )}

          {canManage && (
            <Tabs.Panel value='settings' pt='xl'>
              <Paper withBorder p='md' radius='md'>
                <OrganizationSettings organization={activeOrg} onSuccess={refetch} />
              </Paper>
            </Tabs.Panel>
          )}
        </Tabs>
      </Stack>
    </Container>
  )
}
