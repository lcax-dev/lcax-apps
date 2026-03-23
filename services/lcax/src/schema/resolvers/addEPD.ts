import { dbConnection } from '@/config/database'
import * as models from '@/models'

export const addEPDResolver = async (source, args, context, info) => {
  return dbConnection.insert(models.epds).values(args.values).returning()
}
