import { Container, Stack } from '@mantine/core'
import { OrganizationPaper, ProfilePaper } from '@/components'

export const ProfilePage = () => {
  return (
    <Container size='md' py='xl'>
      <Stack gap='xl'>
        <ProfilePaper />
        <OrganizationPaper />
      </Stack>
    </Container>
  )
}
