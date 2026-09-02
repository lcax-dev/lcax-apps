import { useCallback, useEffect, useState } from 'react'
import { authClient } from '../auth-client'

type ListMembersParams = {
  organizationId: string
  limit?: number
  offset?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
  filterField?: string
  filterOperator?: 'eq' | 'ne' | 'lt' | 'lte' | 'gt' | 'gte' | 'contains'
  filterValue?: string
}

export const useListMembers = ({
  organizationId,
  limit = 100,
  offset = 0,
  sortBy = 'createdAt',
  sortDirection = 'desc',
  filterField,
  filterOperator,
  filterValue,
}: ListMembersParams) => {
  const [members, setMembers] = useState<unknown>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isPending, setIsPending] = useState(false)

  const refetch = useCallback(async () => {
    if (!organizationId) return

    setIsPending(true)
    setError(null)

    try {
      const { data, error } = await authClient.organization.listMembers({
        query: {
          organizationId,
          limit,
          offset,
          sortBy,
          sortDirection,
          filterField,
          filterOperator,
          filterValue,
        },
      })

      if (error) {
        throw new Error(error.message)
      }

      setMembers(data)
      return data
    } catch (err) {
      const normalizedError = err instanceof Error ? err : new Error('Failed to load organization members')
      setError(normalizedError)
      throw normalizedError
    } finally {
      setIsPending(false)
    }
  }, [organizationId, limit, offset, sortBy, sortDirection, filterField, filterOperator, filterValue])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return {
    members,
    error,
    isPending,
    refetch,
  }
}
