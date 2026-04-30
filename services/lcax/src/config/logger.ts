import pino from 'pino-http'

const pinoLogger = pino()
export const logger = pinoLogger.logger
