import { Container, Title, Text, Center, Button, Stack } from '@mantine/core'
import { Link } from 'react-router'

export const NotFoundPage = () => {
  return (
    <Container size='md' py='xl'>
      <Center style={{ height: '50vh' }}>
        <Stack align='center' gap='md'>
          <Title order={1}>404</Title>
          <Text size='xl' fw={500}>
            Page not found
          </Text>
          <Text c='dimmed' size='lg' ta='center'>
            The page you are looking for does not exist or has been moved.
          </Text>
          <Button component={Link} to='/' size='md' mt='xl'>
            Go back to search
          </Button>
        </Stack>
      </Center>
    </Container>
  )
}
