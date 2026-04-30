import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { expressMiddleware } from '@as-integrations/express5'
import cors from 'cors'
import express from 'express'
import http from 'http'
import 'dotenv/config'

import ApolloLoggerPlugin from '@/config/ApolloLoggerPlugin'
import { graphQLSchema } from '@/schema'
import { createContext } from '@/schema/context'
import { toNodeHandler } from 'better-auth/node'
import { auth } from '@/config/auth'

const app = express()
export const httpServer = http.createServer(app)

export const server = new ApolloServer({
  schema: graphQLSchema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), ApolloLoggerPlugin({})],
  introspection: true,
})

await server.start()

app.use(
  '/',
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
  }),
  express.json(),
)

app.all('/api/auth/*splat', toNodeHandler(auth))

app.use(
  '/graphql',
  expressMiddleware(server, {
    context: createContext,
  }),
)
