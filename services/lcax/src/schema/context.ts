import { auth } from '@/config/auth'
import { fromNodeHeaders } from 'better-auth/node'
import type { IncomingMessage } from 'node:http'
import type { HttpLogger } from 'pino-http'

export type GraphQLContext = {
  logger: HttpLogger
  session: Awaited<ReturnType<typeof auth.api.getSession>>
}

export const createContext = async ({ req }: { req: IncomingMessage }): Promise<GraphQLContext> => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  })

  return {
    logger: (req as any).log as HttpLogger,
    session,
  }
}
