import { useCallback, useEffect, useState } from 'react'
import { authClient } from '@/lib'
import { notifications } from '@lcax/ui'

type Member = typeof authClient.$Infer.Member

export const useGetActiveMember = () => {
  const [member, setMember] = useState<Member | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isPending, setIsPending] = useState(false)

  const refetch = useCallback(async () => {
    setIsPending(true)
    setError(null)

    try {
      const { data: member, error } = await authClient.organization.getActiveMember()

      if (error) {
        throw new Error(error.message)
      }

      setMember(member)
      return member
    } catch (err) {
      const normalizedError = err instanceof Error ? err : new Error('Failed to load active member')
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
    member,
    error,
    isPending,
    refetch,
  }
}
