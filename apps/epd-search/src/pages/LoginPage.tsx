import { useState } from 'react'
import { useNavigate } from 'react-router'
import {
  Alert,
  Anchor,
  Button,
  Container,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons-react'
import { authClient } from '@/lib'

export const LoginPage = () => {
  const [type, setType] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      if (type === 'login') {
        const { data, error } = await authClient.signIn.email({
          email,
          password,
          rememberMe: true,
        })

        if (error?.message) {
          setError(error.message)
        } else if (data) {
          navigate('/profile')
        } else {
          setError('Login failed. Please check your credentials.')
        }
      } else {
        await authClient.signUp.email(
          {
            email,
            password,
            name,
          },
          {
            onRequest: () => {
              setLoading(true)
            },
            onSuccess: () => {
              setLoading(false)
              navigate('/profile')
            },
            onError: (ctx) => {
              setLoading(false)
              setError(ctx.error.message)
            },
          },
        )
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.')
    }
  }

  return (
    <Container my={40}>
      <Title ta='center' fw={900}>
        {type === 'login' ? 'Welcome back!' : 'Create an account'}
      </Title>
      <Text c='dimmed' size='sm' ta='center' mt={5}>
        {type === 'login' ? 'Do not have an account yet?' : 'Already have an account?'}{' '}
        <Anchor size='sm' component='button' onClick={() => setType(type === 'login' ? 'signup' : 'login')}>
          {type === 'login' ? 'Create account' : 'Login'}
        </Anchor>
      </Text>
      <Container size='xs'>
        <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
          <form onSubmit={handleSubmit}>
            <Stack>
              {error && (
                <Alert
                  variant='light'
                  color='red'
                  title={type === 'login' ? 'Login failed' : 'Signup failed'}
                  icon={<IconInfoCircle />}
                >
                  {error}
                </Alert>
              )}
              {type === 'signup' && (
                <TextInput
                  label='Name'
                  placeholder='Your name'
                  required
                  value={name}
                  onChange={(event) => setName(event.currentTarget.value)}
                />
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
                {type === 'login' ? 'Sign in' : 'Sign up'}
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Container>
  )
}
