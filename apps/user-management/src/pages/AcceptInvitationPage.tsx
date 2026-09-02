import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Alert, Button, Container, Group, Paper, Stack, Text, Title } from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons-react'
import { Loading, notifications } from '@lcax/ui'
import { authClient } from '@/lib'
import { acceptInvitation, getInvitation, rejectInvitation } from '@/components/OrganizationManagement/logic'

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
      <Container my={40}>
        <Title ta='center' fw={900}>
          Organization invitation
        </Title>
        <Text c='dimmed' size='sm' ta='center' mt={5}>
          Sign in to accept or reject this invitation.
        </Text>
        <Container size='xs'>
          <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
            <Button fullWidth onClick={() => navigate(getLoginPath(token))}>
              Sign in
            </Button>
          </Paper>
        </Container>
      </Container>
    )
  }

  if (!token) {
    return (
      <Container my={40} size='xs'>
        <Alert color='red' title='Invalid invitation' icon={<IconInfoCircle />}>
          This invitation link is missing an invitation ID.
        </Alert>
      </Container>
    )
  }

  if (isLoadingInvitation) {
    return <Loading />
  }

  if (error || !invitation) {
    return (
      <Container my={40} size='xs'>
        <Alert color='red' title='Invitation unavailable' icon={<IconInfoCircle />}>
          {error || 'This invitation could not be found.'}
        </Alert>
      </Container>
    )
  }

  const isPendingInvitation = invitation.status === 'pending'

  return (
    <Container my={40}>
      <Title ta='center' fw={900}>
        You're invited
      </Title>
      <Text c='dimmed' size='sm' ta='center' mt={5}>
        Join {invitation.organizationName} on LCAx
      </Text>
      <Container size='xs'>
        <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
          <Stack>
            <Text>
              <Text span fw={500}>
                Organization:{' '}
              </Text>
              {invitation.organizationName}
            </Text>
            <Text>
              <Text span fw={500}>
                Role:{' '}
              </Text>
              {invitation.role}
            </Text>
            <Text>
              <Text span fw={500}>
                Invited email:{' '}
              </Text>
              {invitation.email}
            </Text>
            <Text>
              <Text span fw={500}>
                Invited by:{' '}
              </Text>
              {invitation.inviterEmail}
            </Text>
            <Text>
              <Text span fw={500}>
                Expires:{' '}
              </Text>
              {new Date(invitation.expiresAt).toLocaleString()}
            </Text>
            {!isPendingInvitation && (
              <Alert variant='light' color='yellow' title='Invitation not pending' icon={<IconInfoCircle />}>
                This invitation is {invitation.status}.
              </Alert>
            )}
            <Group grow mt='md'>
              <Button onClick={handleAccept} loading={isSubmitting} disabled={!isPendingInvitation}>
                Accept
              </Button>
              <Button
                variant='outline'
                color='red'
                onClick={handleReject}
                loading={isSubmitting}
                disabled={!isPendingInvitation}
              >
                Reject
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Container>
    </Container>
  )
}
