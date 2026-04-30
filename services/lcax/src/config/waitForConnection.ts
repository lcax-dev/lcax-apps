import { dbConnection } from '@/config/database'
import { logger } from '@/config/logger'

export const waitForConnection = async (maxAttempts = 10, delayMs = 1000): Promise<void> => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      // Try a simple query to check if the connection is ready
      await dbConnection.execute(`SELECT 1`)
      logger.info('Database connection established')
      return
    } catch (error) {
      logger.info(`Connection attempt ${attempt}/${maxAttempts} failed, retrying...`)
      if (attempt === maxAttempts) {
        if (!(error instanceof Error)) continue
        throw new Error(`Failed to establish database connection - ${error.message}`)
      }
      await new Promise((resolve) => setTimeout(resolve, delayMs))
    }
  }
}
