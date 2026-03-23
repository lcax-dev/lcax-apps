import { ApolloServer } from '@apollo/server'
import ApolloLoggerPlugin from '@/config/logger'
import { graphQLSchema } from '@/schema'

export const server = new ApolloServer({
  schema: graphQLSchema,
  plugins: [ApolloLoggerPlugin({})],
})
