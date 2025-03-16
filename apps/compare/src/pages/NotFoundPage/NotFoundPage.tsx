import { ActionIcon, Container, Stack, Title, useMatches } from '@mantine/core'
import { Link } from 'react-router'
import { IconArrowBack } from '@tabler/icons-react'

export const NotFoundPage = () => {
  const containerSize = useMatches({ md: 'md', xl: 'xxl' })

  return (
    <Container size={containerSize} h='100vh'>
      <Stack justify='center' align='center' h='100%'>
        <Title>We can't find the page you are looking for!</Title>
        <ActionIcon variant='transparent' component={Link} to={'/'} size='xl'>
          <IconArrowBack size={64} />
        </ActionIcon>
      </Stack>
    </Container>
  )
}
