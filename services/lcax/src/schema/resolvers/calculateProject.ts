import { calculateProject } from 'lcax'
import type { GraphQLContext } from '@/schema/context'

export const calculateProjectResolver = async (source, args, context: GraphQLContext, info) => {
  return calculateProject(args.project)
}
