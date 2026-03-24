import { calculateAssembly, impactCategories, lifeCycleModules } from 'lcax'

export const calculateAssemblyResolver = async (source, args, context, info) => {
  const options = {
    lifeCycleModules: lifeCycleModules(),
    impactCategories: impactCategories(),
    overwriteExistingResults: true,
    ...args.options,
  }
  const result = calculateAssembly(args.assembly, options)
  return result
}
