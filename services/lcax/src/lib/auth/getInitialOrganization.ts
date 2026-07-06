import { auth } from '@/config/auth.ts'
import { dbConnection } from '@/config/database.ts'
import * as models from '@/models'
import { eq } from 'drizzle-orm'

export const getInitialOrganization = async (userId: string) => {
  const members = await dbConnection.select().from(models.member).where(eq(models.member.userId, userId))
  console.log('members', members)
  return members?.[0]?.organizationId
}
