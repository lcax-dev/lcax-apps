import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import {
  Anchor,
  Button,
  Container,
  Divider,
  PasswordInput,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { IconArrowRight } from '@tabler/icons-react'
import { useMatches } from '@lcax/ui'
import { authClient } from '@/lib'

const getSafeRedirectPath = (redirect: string | null) => {
  if (redirect && redirect.startsWith('/') && !redirect.startsWith('//')) {
    return redirect
  }
  return '/profile'
}

export const LoginPage = () => {
  const [type, setType] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectTo = getSafeRedirectPath(searchParams.get('redirect'))
  const containerSize = useMatches({ md: 'md', xl: 'xl', xxl: 'xxl' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      if (type === 'login') {
        const { data, error: signInError } = await authClient.signIn.email({
          email,
          password,
          rememberMe: true,
        })

        if (signInError?.message) {
          setError(signInError.message)
        } else if (data) {
          navigate(redirectTo)
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
              navigate(redirectTo)
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
    <Container fluid bg='grey.0' p={0} mih='100vh'>
      <Container size={containerSize} py='xl' mih={{ base: '80vh', md: '70vh' }}>
        <Stack justify='center' h='100%' py='xl'>
          <div>
            <Text>{type === 'login' ? 'Authentication' : 'Registration'}</Text>
            <Title order={1}>{type === 'login' ? 'Welcome back' : 'Create an account'}</Title>
          </div>
          <Divider my='lg' />
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing='xl'>
            <Stack justify='flex-start' gap='md'>
              <Title order={2}>{type === 'login' ? 'Sign In' : 'Sign Up'}</Title>
              <Text c='dimmed' w={{ base: '100%', xl: '75%' }}>
                {type === 'login'
                  ? 'Enter your credentials to access your LCAx organizations and account.'
                  : 'Create your account to start managing organizations and LCA data.'}
              </Text>
              <Text size='sm'>
                {type === 'login' ? 'Do not have an account yet?' : 'Already have an account?'}{' '}
                <Anchor
                  component='button'
                  type='button'
                  c='black'
                  fw={500}
                  onClick={() => {
                    setError(null)
                    setType(type === 'login' ? 'signup' : 'login')
                  }}
                >
                  {type === 'login' ? 'Create account' : 'Sign in'}
                </Anchor>
              </Text>
            </Stack>

            <form onSubmit={handleSubmit}>
              <Stack gap='md'>
                {error && (
                  <Text c='red' size='sm'>
                    {error}
                  </Text>
                )}
                {type === 'signup' && (
                  <TextInput
                    label='Name'
                    placeholder='Your name'
                    required
                    value={name}
                    onChange={(event) => setName(event.currentTarget.value)}
                    radius='xl'
                    size='md'
                  />
                )}
                <TextInput
                  label='Email'
                  placeholder='you@example.com'
                  required
                  type='email'
                  value={email}
                  onChange={(event) => setEmail(event.currentTarget.value)}
                  radius='xl'
                  size='md'
                />
                <PasswordInput
                  label='Password'
                  placeholder='Your password'
                  required
                  value={password}
                  onChange={(event) => setPassword(event.currentTarget.value)}
                  radius='xl'
                  size='md'
                />
                <Button
                  c='black'
                  size='xl'
                  rightSection={<IconArrowRight />}
                  type='submit'
                  loading={loading}
                  w='fit-content'
                  mt='md'
                >
                  {type === 'login' ? 'Sign in' : 'Create account'}
                </Button>
              </Stack>
            </form>
          </SimpleGrid>
        </Stack>
      </Container>
    </Container>
  )
}
