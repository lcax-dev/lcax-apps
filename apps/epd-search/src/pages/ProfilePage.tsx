import { Container, Title, Stack, Paper, Text, Divider } from '@mantine/core'
import { UploadEPD } from '@/components'
import { useSession } from '@/lib/auth'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { useAddEpdsMutation, EpdsInsertInput } from '@/queries/generated'
import { notifications } from '@mantine/notifications'

export const ProfilePage = () => {
  const { data: session, isPending } = useSession()
  const navigate = useNavigate()
  const [addEpds, { loading: uploading }] = useAddEpdsMutation()

  useEffect(() => {
    if (!isPending && !session) {
      navigate('/login')
    }
  }, [session, isPending, navigate])

  if (isPending) {
    return null // Or a loading spinner
  }

  if (!session) {
    return null
  }

  const handleUpload = async (values: EpdsInsertInput[]) => {
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

          <Stack gap='xs'>
            <Text fw={500}>Email</Text>
            <Text>{session.user.email}</Text>
          </Stack>
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
