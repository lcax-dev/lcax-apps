import { calculateProduct, impactCategories, lifeCycleModules } from 'lcax'

export const calculateProductResolver = async (source, args, context, info) => {
  const options = {
    lifeCycleModules: lifeCycleModules(),
    impactCategories: impactCategories(),
    overwriteExistingResults: true,
    ...args.options,
  }
  const result = calculateProduct(args.product, options)
  return result
}
