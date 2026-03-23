import { startStandaloneServer } from '@apollo/server/standalone'
import pino from 'pino-http'
import { server } from '@/config'

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async () => ({
    logger: pino({ level: 'debug' }),
  }),
})

server.logger.info(`🚀  Server ready at: ${url}`)
