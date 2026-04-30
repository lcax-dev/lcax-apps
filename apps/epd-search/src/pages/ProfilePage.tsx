import { Container, Divider, Group, Paper, Stack, Text, Title } from '@mantine/core'
import { UploadEPD } from '@/components'
import { useAddEpdsMutation } from '@/queries'
import { notifications } from '@mantine/notifications'
import { authClient } from '@/lib'

export const ProfilePage = () => {
  const [addEpds, { loading: uploading }] = useAddEpdsMutation()
  const { data: sessionData } = authClient.useSession()

  const handleUpload = async (values: any) => {
    try {
      await addEpds({ variables: { values } })
      notifications.show({
        title: 'Success',
        message: `${values.length} EPD(s) uploaded successfully`,
        color: 'green',
      })
    } catch (error) {
      console.error('Upload failed:', error)
      notifications.show({
        title: 'Upload Failed',
        message: error instanceof Error ? error.message : 'An unknown error occurred during upload',
        color: 'red',
      })
    }
  }

  return (
    <Container size='md' py='xl'>
      <Stack gap='xl'>
        <Paper withBorder p='xl' radius='md'>
          <Title order={2}>User Profile</Title>
          <Text c='dimmed' size='sm' mt='xs'>
            Manage your account and uploaded EPDs
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

        <Paper withBorder p='xl' radius='md'>
          <Title order={3} mb='lg'>
            Upload EPD
          </Title>
          <Text size='sm' mb='xl'>
            Upload your EPDs in LCAx JSON format to make them available in the search engine.
          </Text>

          <UploadEPD onUpload={handleUpload} loading={uploading} />
        </Paper>
      </Stack>
    </Container>
  )
}
