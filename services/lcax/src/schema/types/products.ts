import { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLInt, GraphQLList } from 'graphql/type'
import { GraphQLEpd } from '@/schema/types/epds'
import { GraphQLImpacts, JSONObject } from '@/schema/types/objects'

export const GraphQLProduct = new GraphQLObjectType({
  name: 'Product',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    description: { type: GraphQLString },
    referenceServiceLife: { type: GraphQLInt },
    impactData: { type: new GraphQLList(GraphQLEpd) },
    quantity: { type: GraphQLFloat },
    unit: { type: GraphQLString },
    transport: { type: GraphQLString },
    results: { type: GraphQLImpacts },
    metaData: { type: JSONObject },
  },
})
