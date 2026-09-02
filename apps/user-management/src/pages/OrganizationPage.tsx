import { Container, Stack } from '@mantine/core'
import { OrganizationPaper } from '@/components'
import { useMatches } from '@lcax/ui'

export const OrganizationPage = () => {
  const containerSize = useMatches({ md: 'md', xl: 'xl', xxl: 'xxl' })

  return (
    <Container fluid bg='grey.0' p={0} pb='xl'>
      <Container size={containerSize} py='xl'>
        <Stack gap='xl'>
          <OrganizationPaper />
        </Stack>
      </Container>
    </Container>
  )
}
