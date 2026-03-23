import { dbConnection } from '@/config/database'

export const waitForConnection = async (maxAttempts = 10, delayMs = 1000): Promise<void> => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      // Try a simple query to check if the connection is ready
      await dbConnection.execute(`SELECT 1`)
      console.log('Database connection established')
      return
    } catch (error) {
      console.log(`Connection attempt ${attempt}/${maxAttempts} failed, retrying...`)
      if (attempt === maxAttempts) {
        throw new Error(`Failed to establish database connection - ${error.message}`)
      }
      await new Promise((resolve) => setTimeout(resolve, delayMs))
    }
  }
}
