import { authClient } from '@/lib'

export const updateOrganization = async (params: { organizationId: string; name: string; metadata?: any }) => {
  const { data, error } = await authClient.organization.update({
    organizationId: params.organizationId,
    data: {
      name: params.name,
      metadata: params.metadata,
    },
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const inviteMember = async (params: {
  organizationId: string
  email: string
  role: 'admin' | 'member' | 'owner' | 'organization-admin'
}) => {
  const { data, error } = await authClient.organization.inviteMember({
    organizationId: params.organizationId,
    email: params.email,
    role: params.role,
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const removeMember = async (params: { organizationId: string; memberId: string }) => {
  const { data, error } = await authClient.organization.removeMember({
    organizationId: params.organizationId,
    memberId: params.memberId,
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const updateMemberRole = async (params: {
  organizationId: string
  memberId: string
  role: 'admin' | 'member' | 'owner' | 'organization-admin'
}) => {
  const { data, error } = await authClient.organization.updateMemberRole({
    organizationId: params.organizationId,
    memberId: params.memberId,
    role: params.role,
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}
