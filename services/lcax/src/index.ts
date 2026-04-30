import { httpServer, logger } from '@/config'

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve))
logger.info(`🚀 Server ready at http://localhost:4000/`)
