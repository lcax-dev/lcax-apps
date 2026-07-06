import { useCallback, useEffect, useState } from 'react'
import { authClient } from '@/lib'
import { notifications } from '@lcax/ui'

type Invitation = typeof authClient.$Infer.Invitation & { organizationName: string }

export const useListUserInvitations = () => {
  const [invitations, setInvitations] = useState<Invitation[] | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isPending, setIsPending] = useState(false)

  const refetch = useCallback(async () => {
    setIsPending(true)
    setError(null)

    try {
      const { data, error } = await authClient.organization.listUserInvitations()

      if (error) {
        throw new Error(error.message)
      }

      setInvitations(data)
      return data
    } catch (err) {
      const normalizedError = err instanceof Error ? err : new Error('Failed to load user invitations')
      setError(normalizedError)
      notifications.error({ title: 'Failed to load user invitations', message: normalizedError.message })
      throw normalizedError
    } finally {
      setIsPending(false)
    }
  }, [])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return {
    invitations,
    error,
    isPending,
    refetch,
  }
}
