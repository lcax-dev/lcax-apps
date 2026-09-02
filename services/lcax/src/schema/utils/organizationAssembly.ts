import { GraphQLError } from 'graphql'
import type { GraphQLContext } from '@/schema/context'

export const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export const requireOrganizationSession = (context: GraphQLContext): string => {
  if (!context.session) {
    throw new GraphQLError('User is not authenticated', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 },
      },
    })
  }

  const organizationId = context.session.session.activeOrganizationId
  if (!organizationId) {
    throw new GraphQLError('Active organization is required', {
      extensions: {
        code: 'FORBIDDEN',
        http: { status: 403 },
      },
    })
  }

  return organizationId
}

export const catalogIdFromUri = (uri: string | null | undefined): string | undefined => {
  if (!uri) return undefined
  return UUID_RE.test(uri) ? uri : undefined
}

export const isReference = (
  value: { type?: string; uri?: string | null; version?: string | null } | null | undefined,
): value is { type: 'reference'; uri?: string | null; version?: string | null } => value?.type === 'reference'

export const productIdsFromRefs = (products: unknown): string[] => {
  const ids: string[] = []
  for (const ref of (products ?? []) as { type?: string; uri?: string }[]) {
    if (!isReference(ref)) continue
    const id = catalogIdFromUri(ref.uri)
    if (id) ids.push(id)
  }
  return ids
}

export const isVisibleToOrganization = (
  row: { visibility?: string | null; organizationId?: string | null },
  organizationId: string,
): boolean => row.visibility === 'Public' || row.organizationId === organizationId
