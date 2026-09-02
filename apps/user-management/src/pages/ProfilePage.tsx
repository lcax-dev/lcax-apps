import { Container, Divider, Stack } from '@mantine/core'
import { OrganizationPaper, ProfilePaper } from '@/components'
import { useMatches } from '@lcax/ui'

export const ProfilePage = () => {
  const containerSize = useMatches({ md: 'md', xl: 'xl', xxl: 'xxl' })

  return (
    <Container fluid bg='grey.0' p={0} pb='xl'>
      <Container size={containerSize} py='xl'>
        <Stack gap='xl'>
          <ProfilePaper />
          <Divider my='xl' />
          <OrganizationPaper />
        </Stack>
      </Container>
    </Container>
  )
}
