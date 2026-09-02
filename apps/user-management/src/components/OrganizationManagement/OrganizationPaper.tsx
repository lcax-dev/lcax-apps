import { Divider, Paper, Stack, Tabs, Title, Button, Group, Modal } from '@mantine/core'
import {
  OrganizationInvitation,
  OrganizationMembers,
  OrganizationSettings,
  OrganizationInvitations,
  OrganizationInvite,
} from '@/components'
import { authClient, useGetActiveMember } from '@/lib'
import { useMemo } from 'react'
import { useDisclosure } from '@mantine/hooks'

export const OrganizationPaper = () => {
  return (
    <Paper withBorder p='xl' radius='md'>
      <Stack gap='xl'>
        <OrganizationInvitation />
        <OrganizationTabs />
      </Stack>
    </Paper>
  )
}

const OrganizationTabs = () => {
  const { data: activeOrganization, refetch } = authClient.useActiveOrganization()
  const { member: activeMember } = useGetActiveMember()
  const canManage = useMemo(() => activeMember?.role === 'admin' || activeMember?.role === 'owner', [activeMember])
  const [inviteModalOpened, { open: openInviteModal, close: closeInviteModal }] = useDisclosure(false)

  if (!activeOrganization) return null

  return (
    <>
      <Title order={2}>{activeOrganization.name}</Title>
      <Divider />
      <Tabs defaultValue='members'>
        <Tabs.List>
          <Tabs.Tab value='members'>Members</Tabs.Tab>
          {<Tabs.Tab value='invites'>Invites</Tabs.Tab>}
          {canManage && <Tabs.Tab value='settings'>Settings</Tabs.Tab>}
        </Tabs.List>
        <Tabs.Panel value='members' pt='xl'>
          <OrganizationMembers />
        </Tabs.Panel>
        <Tabs.Panel value='invites' pt='xl'>
          <Group justify='space-between' mb='md'>
            <div></div>
            {canManage && <Button onClick={openInviteModal}>Invite Member</Button>}
          </Group>
          <OrganizationInvitations />
        </Tabs.Panel>
        <Tabs.Panel value='settings' pt='xl'>
          <OrganizationSettings />
        </Tabs.Panel>
      </Tabs>

      <Modal opened={inviteModalOpened} onClose={closeInviteModal} title='Invite Member'>
        <OrganizationInvite
          onSuccess={() => {
            closeInviteModal()
            refetch()
          }}
        />
      </Modal>
    </>
  )
}
