import { Container, Divider, Group, Paper, Stack, Text, Title } from '@mantine/core'
import { UploadLCAxData, EPDStatisticsCard } from '@/components'
import { RolePermitter } from '@lcax/ui'
import { authClient } from '@/lib'

export const ProfilePage = () => {
  const { data: sessionData } = authClient.useSession()

  return (
    <Container size='md' py='xl'>
      <Stack gap='xl'>
        <Paper withBorder p='xl' radius='md'>
          <Title order={2}>User Profile</Title>
          <Text c='dimmed' size='sm' mt='xs'>
            Manage your account and uploaded LCAx data
          </Text>

          <Divider my='lg' />

          <Group justify='space-around'>
            <Stack gap='xs'>
              <Text fw={500}>Name</Text>
              <Text>{sessionData?.user.name}</Text>
            </Stack>
            <Stack gap='xs'>
              <Text fw={500}>Email</Text>
              <Text>{sessionData?.user.email}</Text>
            </Stack>
            <Stack gap='xs'>
              <Text fw={500}>Role</Text>
              <Text>{sessionData?.user.role}</Text>
            </Stack>
          </Group>
        </Paper>

        <RolePermitter sessionData={sessionData} requiredRole='admin'>
          <EPDStatisticsCard />
          <Paper withBorder p='xl' radius='md'>
            <Title order={3} mb='lg'>
              Upload LCAx Data
            </Title>
            <Text size='sm' mb='xl'>
              Upload your EPDs, Assemblies, or Products in LCAx JSON format.
            </Text>

            <UploadLCAxData />
          </Paper>
        </RolePermitter>
      </Stack>
    </Container>
  )
}
