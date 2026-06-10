import { Request, Response } from 'express'
import { and, desc, eq, or } from 'drizzle-orm'
import { dbConnection } from '@/config/database'
import { epds } from '@/models'
import { EPD } from '@/models/types.ts'
import { auth } from '@/config/auth'
import { fromNodeHeaders } from 'better-auth/node'

type UUID = EPD['id']

export const getEpd = async (req: Request, res: Response) => {
  const { epdId } = req.params
  const version = req.query.version as string | undefined
  const format = req.query.format as string | undefined
  const accept = req.get('Accept')

  if (accept === 'application/json' || format?.toLowerCase() === 'json') {
    try {
      const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
      })
      const isAdmin = session?.user?.role === 'admin'
      const orgId = session?.session?.activeOrganizationId

      const visibilityFilters = []
      if (!isAdmin) {
        visibilityFilters.push(eq(epds.visibility, 'Public'))
        if (orgId) {
          visibilityFilters.push(eq(epds.organizationId, orgId))
        }
      }
      const visibilitySql = visibilityFilters.length > 0 ? or(...visibilityFilters) : undefined

      let query = dbConnection
        .select()
        .from(epds)
        .where(and(eq(epds.id, epdId as UUID), visibilitySql))
        .orderBy(desc(epds.publishedDate))
        .limit(1)
        .$dynamic()

      if (version) {
        query = dbConnection
          .select()
          .from(epds)
          .where(and(eq(epds.id, epdId as UUID), eq(epds.version, version), visibilitySql))
          .limit(1)
          .$dynamic()
      }

      const result = await query
      if (result && result.length > 0) {
        res.json(result[0])
      } else {
        res.status(404).json({ message: 'EPD not found' })
      }
    } catch (error) {
      res.status(404).json({ message: 'EPD not found' })
    }
  } else {
    let redirectUrl = `${process.env.FRONTEND_URL}/epds/${epdId}`
    if (version) {
      redirectUrl += `?version=${version}`
    }
    res.redirect(redirectUrl)
  }
}
