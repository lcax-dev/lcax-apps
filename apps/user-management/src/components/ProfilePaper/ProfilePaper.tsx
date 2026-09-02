import { Divider, Group, Paper, Stack, Text, Title } from '@mantine/core'
import { authClient } from '@/lib'
import { useMemo } from 'react'

export const ProfilePaper = () => {
  const { data: sessionData } = authClient.useSession()
  const user = useMemo(() => sessionData?.user, [sessionData])

  return (
    <Paper withBorder p='xl' radius='md'>
      <Title order={2}>User Profile</Title>
      <Text c='dimmed' size='sm' mt='xs'>
        Manage your account and uploaded LCAx data
      </Text>

      <Divider my='lg' />

      <Group justify='space-around'>
        <Stack gap='xs'>
          <Text fw={500}>Name</Text>
          <Text>{user?.name}</Text>
        </Stack>
        <Stack gap='xs'>
          <Text fw={500}>Email</Text>
          <Text>{user?.email}</Text>
        </Stack>
        <Stack gap='xs'>
          <Text fw={500}>Role</Text>
          <Text>{user?.role}</Text>
        </Stack>
      </Group>
    </Paper>
  )
}
