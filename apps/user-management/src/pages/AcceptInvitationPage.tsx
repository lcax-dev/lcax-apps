import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Button, Container, Divider, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { IconArrowRight, IconCheck, IconX } from '@tabler/icons-react'
import { Loading, notifications, useMatches } from '@lcax/ui'
import { authClient } from '@/lib'
import { acceptInvitation, getInvitation, rejectInvitation } from '@/components/OrganizationManagement/logic'
import { InfoBlock } from '@/components'

type Invitation = NonNullable<Awaited<ReturnType<typeof getInvitation>>>

const getLoginPath = (token?: string) => {
  const redirect = token ? `/accept-invitation/${token}` : '/profile'
  return `/login?redirect=${encodeURIComponent(redirect)}`
}

export const AcceptInvitationPage = () => {
  const { token } = useParams<{ token: string }>()
  const navigate = useNavigate()
  const { data: session, isPending: isSessionPending } = authClient.useSession()
  const [invitation, setInvitation] = useState<Invitation | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoadingInvitation, setIsLoadingInvitation] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const containerSize = useMatches({ md: 'md', xl: 'xl', xxl: 'xxl' })

  useEffect(() => {
    if (!token || !session) {
      return
    }

    let cancelled = false

    const loadInvitation = async () => {
      setIsLoadingInvitation(true)
      setError(null)

      try {
        const data = await getInvitation(token)
        if (!cancelled) {
          setInvitation(data)
        }
      } catch (err) {
        if (!cancelled) {
          setInvitation(null)
          setError(err instanceof Error ? err.message : 'Failed to load invitation')
        }
      } finally {
        if (!cancelled) {
          setIsLoadingInvitation(false)
        }
      }
    }

    void loadInvitation()

    return () => {
      cancelled = true
    }
  }, [session, token])

  const handleAccept = async () => {
    if (!token) {
      return
    }

    setIsSubmitting(true)
    try {
      await acceptInvitation(token)
      if (invitation?.organizationId) {
        await authClient.organization.setActive({ organizationId: invitation.organizationId })
      }
      notifications.success({ message: 'Invitation accepted successfully' })
      navigate('/profile')
    } catch (err) {
      notifications.error({
        message: err instanceof Error ? err.message : 'Failed to accept invitation',
      })
      setIsSubmitting(false)
    }
  }

  const handleReject = async () => {
    if (!token) {
      return
    }

    setIsSubmitting(true)
    try {
      await rejectInvitation(token)
      notifications.success({ message: 'Invitation rejected successfully' })
      navigate('/profile')
    } catch (err) {
      notifications.error({
        message: err instanceof Error ? err.message : 'Failed to reject invitation',
      })
      setIsSubmitting(false)
    }
  }

  if (isSessionPending) {
    return <Loading />
  }

  if (!session) {
    return (
      <Container fluid bg='grey.0' p={0} mih='100vh'>
        <Container size={containerSize} py='xl' mih={{ base: '80vh', md: '70vh' }}>
          <Stack justify='center' h='100%' py='xl'>
            <div>
              <Text>Invitation</Text>
              <Title order={1}>Organization invitation</Title>
            </div>
            <Divider my='lg' />
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing='xl'>
              <Stack justify='flex-start' gap='md'>
                <Title order={2}>Sign in required</Title>
                <Text c='dimmed' w={{ base: '100%', xl: '75%' }}>
                  Sign in to your LCAx account to accept or reject this invitation and access organization data.
                </Text>
              </Stack>
              <Stack justify='center' align='flex-start'>
                <Button
                  c='black'
                  size='xl'
                  rightSection={<IconArrowRight />}
                  onClick={() => navigate(getLoginPath(token))}
                  w='fit-content'
                >
                  Sign in to respond
                </Button>
              </Stack>
            </SimpleGrid>
          </Stack>
        </Container>
      </Container>
    )
  }

  if (!token) {
    return (
      <Container fluid bg='grey.0' p={0} mih='100vh'>
        <Container size={containerSize} py='xl' mih={{ base: '80vh', md: '70vh' }}>
          <Stack justify='center' h='100%' py='xl' gap='md'>
            <div>
              <Text>Error</Text>
              <Title order={1}>Invalid invitation</Title>
            </div>
            <Divider my='lg' />
            <Text c='red'>This invitation link is missing a valid token.</Text>
            <Button
              c='black'
              size='xl'
              rightSection={<IconArrowRight />}
              onClick={() => navigate('/profile')}
              w='fit-content'
              mt='md'
            >
              Go to Profile
            </Button>
          </Stack>
        </Container>
      </Container>
    )
  }

  if (isLoadingInvitation) {
    return <Loading />
  }

  if (error || !invitation) {
    return (
      <Container fluid bg='grey.0' p={0} mih='100vh'>
        <Container size={containerSize} py='xl' mih={{ base: '80vh', md: '70vh' }}>
          <Stack justify='center' h='100%' py='xl' gap='md'>
            <div>
              <Text>Invitation</Text>
              <Title order={1}>Invitation unavailable</Title>
            </div>
            <Divider my='lg' />
            <Text c='red'>{error || 'This invitation could not be found or has expired.'}</Text>
            <Button
              c='black'
              size='xl'
              rightSection={<IconArrowRight />}
              onClick={() => navigate('/profile')}
              w='fit-content'
              mt='md'
            >
              Go to Profile
            </Button>
          </Stack>
        </Container>
      </Container>
    )
  }

  const isPendingInvitation = invitation.status === 'pending'

  return (
    <Container fluid bg='grey.0' p={0} mih='100vh'>
      <Container size={containerSize} py='xl' mih={{ base: '80vh', md: '70vh' }}>
        <Stack justify='center' h='100%' py='xl'>
          <div>
            <Text>Organization Invitation</Text>
            <Title order={1}>You're invited to join {invitation.organizationName}</Title>
          </div>
          <Divider my='lg' />
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing='xl'>
            <SimpleGrid cols={2} verticalSpacing='lg'>
              <InfoBlock title='Organization' info={invitation.organizationName} />
              <InfoBlock title='Role' info={invitation.role} />
              <InfoBlock title='Invited Email' info={invitation.email} />
              <InfoBlock title='Invited By' info={invitation.inviterEmail} />
              <InfoBlock title='Expires' info={new Date(invitation.expiresAt).toLocaleDateString()} />
              <InfoBlock title='Status' info={invitation.status} />
            </SimpleGrid>

            <Stack justify='center' gap='lg'>
              {!isPendingInvitation && <Text c='dimmed'>This invitation is {invitation.status}.</Text>}
              <Group gap='md'>
                <Button
                  c='black'
                  size='xl'
                  rightSection={<IconCheck />}
                  onClick={handleAccept}
                  loading={isSubmitting}
                  disabled={!isPendingInvitation}
                  w='fit-content'
                >
                  Accept Invitation
                </Button>
                <Button
                  variant='subtle'
                  color='red'
                  size='xl'
                  rightSection={<IconX />}
                  onClick={handleReject}
                  loading={isSubmitting}
                  disabled={!isPendingInvitation}
                  w='fit-content'
                >
                  Reject
                </Button>
              </Group>
            </Stack>
          </SimpleGrid>
        </Stack>
      </Container>
    </Container>
  )
}
