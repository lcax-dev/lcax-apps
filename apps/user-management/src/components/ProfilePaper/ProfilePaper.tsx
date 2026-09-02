import { Divider, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { authClient } from '@/lib'
import { useMemo } from 'react'
import { InfoBlock } from '@/components'

export const ProfilePaper = () => {
  const { data: sessionData } = authClient.useSession()
  const user = useMemo(() => sessionData?.user, [sessionData])

  return (
    <Stack gap='lg'>
      <div>
        <Text>Account</Text>
        <Title order={2}>User Profile</Title>
      </div>
      <Text c='dimmed' w={{ base: '100%', xl: '66%' }}>
        Manage your account and uploaded LCAx data.
      </Text>
      <Divider my='xs' />
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing='xl' mt='sm'>
        <InfoBlock title='Name' info={user?.name} />
        <InfoBlock title='Email' info={user?.email} />
        <InfoBlock title='Role' info={user?.role} />
      </SimpleGrid>
    </Stack>
  )
}
