import { auth } from '@/config/auth'
import type { IncomingMessage } from 'node:http'
import type { HttpLogger } from 'pino-http'

export type GraphQLContext = {
  logger: HttpLogger
  session: Awaited<ReturnType<typeof auth.getSession>>
}

export const createContext = async ({ req }: { req: IncomingMessage }): Promise<GraphQLContext> => {
  const session = await auth.api.getSession({
    headers: req.headers,
  })

  return {
    logger: (req as any).log as HttpLogger,
    session,
  }
}
