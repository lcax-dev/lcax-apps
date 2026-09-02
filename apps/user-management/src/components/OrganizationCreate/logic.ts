import { authClient } from '@/lib'

export const createOrganizationAndInvite = async (params: {
  name: string
  slug: string
  inviteMember: boolean
  memberEmail?: string
  memberRole?: string
}) => {
  const { name, slug, inviteMember, memberEmail, memberRole } = params
  const { data: org, error: orgError } = await authClient.organization.create({
    name,
    slug,
  })

  if (orgError) throw new Error(orgError.message)

  if (inviteMember && memberEmail && org) {
    const { error: inviteError } = await authClient.organization.inviteMember({
      email: memberEmail,
      role: memberRole as any,
      organizationId: org.id,
    })
    if (inviteError) throw new Error(inviteError.message)
  }
  return org
}
