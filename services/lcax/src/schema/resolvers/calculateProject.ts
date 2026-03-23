import { calculateProject } from 'lcax'

export const calculateProjectResolver = async (source, args, context, info) => {
  return calculateProject(args.project)
}
