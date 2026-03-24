import { calculateProduct, impactCategories, lifeCycleModules } from 'lcax'
import type { GraphQLContext } from '@/schema/context'

export const calculateProductResolver = async (source, args, context: GraphQLContext, info) => {
  const options = {
    lifeCycleModules: lifeCycleModules(),
    impactCategories: impactCategories(),
    overwriteExistingResults: true,
    ...args.options,
  }
  const result = calculateProduct(args.product, options)
  return result
}
