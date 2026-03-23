import { inspect } from 'node:util'
import type { ApolloServerPlugin } from '@apollo/server'

/**
 * Options for the `ApolloLoggerPlugin()` factory function.
 */
interface Options {
  /**
   * The path your server accepts GraphQL requests on. Typically this
   * can be left at the default, `/graphql`, but is configurable here so
   * your log messages make sense if you serve GraphQL on an alternative
   * path.
   */
  path?: string
}

export type { Options as ApolloLoggerPluginOptions }

export default function ApolloLoggerPlugin(options: Options): ApolloServerPlugin {
  const { path = '/graphql' } = options

  return {
    async serverWillStart({ logger }) {
      logger.info(`Starting GraphQL on "${path}"...`)

      return {
        async serverWillStop() {
          logger.info(`Stopping GraphQL on "${path}"`)
        },
      }
    },
    async requestDidStart({ logger }) {
      function logErrors(...errors: unknown[]) {
        for (const error of errors) {
          if (error instanceof Error) {
            logger.error(`${error.name}: ${error.message}`)
            logger.debug(error)
          }
        }
      }

      logger.debug('Starting GraphQL request...')

      return {
        async didResolveSource({ source }) {
          logger.debug(`Source:\n${source}`)
        },

        async didResolveOperation({ operation, operationName, request: { variables } }) {
          const params = inspect(variables)
          const kind = operation?.operation || 'operation'
          const name = operationName || ''

          logger.info(`Started ${kind} ${name}`)
          logger.info(`Parameters: ${params}`)
        },

        async didEncounterErrors({ errors }) {
          if (errors) logErrors(...errors)
        },

        async parsingDidStart() {
          logger.debug('Parsing source...')

          return async (error) => {
            if (error) {
              logger.error('Failed to parse source')
              logErrors(error)
            } else {
              logger.debug('Parsing complete')
            }
          }
        },

        async validationDidStart() {
          logger.debug('Validating GraphQL document...')

          return async (error) => {
            if (error) {
              logger.error('Failed to validate GraphQL document')
              logErrors(error)
            } else {
              logger.debug('Validation complete. Document cached.')
            }
          }
        },

        async executionDidStart({ operationName, operation }) {
          const typeName = operation?.operation || 'operation'

          logger.debug(`Executing ${typeName} ${operationName}...`)
        },

        async willSendResponse({ operation, operationName }) {
          const kind = operation?.operation || 'operation'
          const name = operationName || ''

          logger.info(`Completed ${kind} ${name}`)
        },
      }
    },
  }
}
