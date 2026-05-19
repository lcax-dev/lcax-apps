import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql/type'

export const GraphQLEPDUploadStat = new GraphQLObjectType({
  name: 'EPDUploadStat',
  fields: {
    date: { type: new GraphQLNonNull(GraphQLString) },
    count: { type: new GraphQLNonNull(GraphQLInt) },
  },
})

export const GraphQLEPDStatistics = new GraphQLObjectType({
  name: 'EPDStatistics',
  fields: {
    totalCount: { type: new GraphQLNonNull(GraphQLInt) },
    uploads: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLEPDUploadStat))) },
  },
})
