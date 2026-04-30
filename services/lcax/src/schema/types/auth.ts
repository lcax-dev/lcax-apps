import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'

export const GraphQLUser = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    emailVerified: { type: new GraphQLNonNull(GraphQLBoolean) },
    image: { type: GraphQLString },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
    updatedAt: { type: new GraphQLNonNull(GraphQLString) },
  },
})

export const GraphQLSession = new GraphQLObjectType({
  name: 'Session',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    userId: { type: new GraphQLNonNull(GraphQLString) },
    expiresAt: { type: new GraphQLNonNull(GraphQLString) },
    token: { type: new GraphQLNonNull(GraphQLString) },
    ipAddress: { type: GraphQLString },
    userAgent: { type: GraphQLString },
  },
})

export const GraphQLAuthResponse = new GraphQLObjectType({
  name: 'AuthResponse',
  fields: {
    user: { type: GraphQLUser },
    session: { type: GraphQLSession },
  },
})
