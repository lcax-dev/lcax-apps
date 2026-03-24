import { calculateAssembly, impactCategories, lifeCycleModules } from 'lcax'
import type { GraphQLContext } from '@/schema/context'

export const calculateAssemblyResolver = async (source, args, context: GraphQLContext, info) => {
  const options = {
    lifeCycleModules: lifeCycleModules(),
    impactCategories: impactCategories(),
    overwriteExistingResults: true,
    ...args.options,
  }
  const result = calculateAssembly(args.assembly, options)
  return result
}
