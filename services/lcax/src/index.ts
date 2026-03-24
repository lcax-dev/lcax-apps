import { startStandaloneServer } from '@apollo/server/standalone'
import pino from 'pino-http'
import { server } from '@/config'
import { createContext } from '@/schema/context'

const logger = pino({ level: 'debug' })

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    logger(req, {} as any)
    return createContext({ req })
  },
})

server.logger.info(`🚀  Server ready at: ${url}`)
