import { useState } from 'react'
import { useNavigate } from 'react-router'
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Anchor,
  Stack,
  Alert,
} from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons-react'
import { signIn } from '@/lib/auth'

export const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await signIn.email({
        email,
        password,
      })

      if (error) {
        setError(error.message || 'Failed to sign in. Please check your credentials.')
      } else {
        navigate('/profile')
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container size={420} my={40}>
      <Title ta='center' fw={900}>
        Welcome back!
      </Title>
      <Text c='dimmed' size='sm' ta='center' mt={5}>
        Do not have an account yet?{' '}
        <Anchor size='sm' component='button'>
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
        <form onSubmit={handleSubmit}>
          <Stack>
            {error && (
              <Alert variant='light' color='red' title='Login failed' icon={<IconInfoCircle />}>
                {error}
              </Alert>
            )}
            <TextInput
              label='Email'
              placeholder='you@example.com'
              required
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
            <PasswordInput
              label='Password'
              placeholder='Your password'
              required
              mt='md'
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
            <Group justify='space-between' mt='lg'>
              <Anchor component='button' size='sm'>
                Forgot password?
              </Anchor>
            </Group>
            <Button fullWidth mt='xl' type='submit' loading={loading}>
              Sign in
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  )
}
