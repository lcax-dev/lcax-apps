import { calculateProduct, impactCategories, lifeCycleModules } from 'lcax'

export const calculateProductResolver = async (source, args, context, info) => {
  const options = args.options || {
    lifeCycleModules: lifeCycleModules(),
    impactCategories: impactCategories(),
    overwriteExistingResults: true,
  }
  const result = calculateProduct(args.product, options)
  return result
}
