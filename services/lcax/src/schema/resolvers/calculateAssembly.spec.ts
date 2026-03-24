import { describe, test } from 'vitest'
import { calculateAssemblyResolver } from '@/schema/resolvers/calculateAssembly'
import { projectData } from '@/__test__/__data__'
import type { GraphQLContext } from '@/schema/context'
import type { HttpLogger } from 'pino-http'

describe('calculateAssemblyResolver', async () => {
  const mockLogger = {} as HttpLogger

  test('calculate assembly (public access)', async ({ expect }) => {
    const context: GraphQLContext = {
      logger: mockLogger,
      session: null,
    }
    const assemblyData = projectData.assemblies[0]
    const result = await calculateAssemblyResolver(null, { assembly: assemblyData }, context, null)
    expect(result).toBeTruthy()
    expect(result.gwp.a1a3).toBe(160532500)
  })

  test('calculate assembly (with session)', async ({ expect }) => {
    const context: GraphQLContext = {
      logger: mockLogger,
      session: {
        session: {} as any,
        user: { role: 'user' } as any,
      },
    }
    const assemblyData = projectData.assemblies[0]
    const result = await calculateAssemblyResolver(null, { assembly: assemblyData }, context, null)
    expect(result).toBeTruthy()
  })
})
