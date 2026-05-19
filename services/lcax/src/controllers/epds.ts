import { Request, Response } from 'express'
import { and, desc, eq } from 'drizzle-orm'
import { dbConnection } from '@/config/database'
import { epds } from '@/models'
import { EPD } from '@/models/types.ts'

type UUID = EPD['id']

export const getEpd = async (req: Request, res: Response) => {
  const { epdId } = req.params
  const version = req.query.version as string | undefined
  const format = req.query.format as string | undefined
  const accept = req.get('Accept')

  if (accept === 'application/json' || format?.toLowerCase() === 'json') {
    try {
      let query = dbConnection
        .select()
        .from(epds)
        .where(eq(epds.id, epdId as UUID))
        .orderBy(desc(epds.publishedDate))
        .limit(1)
        .$dynamic()

      if (version) {
        query = dbConnection
          .select()
          .from(epds)
          .where(and(eq(epds.id, epdId as UUID), eq(epds.version, version)))
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
