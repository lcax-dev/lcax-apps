import { GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList } from 'graphql/type'
import { UnitEnum } from '@/schema/types/enums'
import { GraphQLProduct } from '@/schema/types/products'
import { GraphQLImpacts, JSONObject } from '@/schema/types/objects'

export const GraphQLClassification = new GraphQLObjectType({
  name: 'Classification',
  fields: {
    name: { type: GraphQLString },
    system: { type: GraphQLString },
    code: { type: GraphQLString },
  },
})

export const GraphQLAssembly = new GraphQLObjectType({
  name: 'Assembly',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    type: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    comment: { type: GraphQLString },
    quantity: { type: new GraphQLNonNull(GraphQLFloat) },
    unit: {
      type: new GraphQLNonNull(UnitEnum),
    },
    classification: { type: new GraphQLNonNull(new GraphQLList(GraphQLClassification)) },
    products: { type: new GraphQLNonNull(new GraphQLList(GraphQLProduct)) },
    results: { type: GraphQLImpacts },
    metaData: { type: JSONObject },
    workspaceId: { type: GraphQLString },
    projectId: { type: GraphQLString },
    modelId: { type: GraphQLString },
  },
})
