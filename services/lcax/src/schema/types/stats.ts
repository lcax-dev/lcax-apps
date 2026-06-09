import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql/type'

export const GraphQLLCAxUploadStat = new GraphQLObjectType({
  name: 'LCAxUploadStat',
  fields: {
    date: { type: new GraphQLNonNull(GraphQLString) },
    count: { type: new GraphQLNonNull(GraphQLInt) },
    epds: { type: new GraphQLNonNull(GraphQLInt) },
    assemblies: { type: new GraphQLNonNull(GraphQLInt) },
    products: { type: new GraphQLNonNull(GraphQLInt) },
  },
})

export const GraphQLLCAxStatistics = new GraphQLObjectType({
  name: 'LCAxStatistics',
  fields: {
    totalCount: { type: new GraphQLNonNull(GraphQLInt) },
    epdsCount: { type: new GraphQLNonNull(GraphQLInt) },
    assembliesCount: { type: new GraphQLNonNull(GraphQLInt) },
    productsCount: { type: new GraphQLNonNull(GraphQLInt) },
    uploads: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLLCAxUploadStat))) },
  },
})
