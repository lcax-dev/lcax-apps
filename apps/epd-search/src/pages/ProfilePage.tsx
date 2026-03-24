import { Container, Title, Stack, Paper, Text, Divider } from '@mantine/core'
import { UploadEPD } from '@/components'
import { useSession } from '@/lib/auth'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'

export const ProfilePage = () => {
  const { data: session, isPending } = useSession()
  const navigate = useNavigate()

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

  const handleUpload = (files: any[]) => {
    console.log('Files to upload:', files)
    // Mutation integration will be handled in the next sub-issue
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

          <UploadEPD onUpload={handleUpload} />
        </Paper>
      </Stack>
    </Container>
  )
}
