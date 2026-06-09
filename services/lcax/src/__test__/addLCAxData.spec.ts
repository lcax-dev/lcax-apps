import gql from 'graphql-tag'
import { afterEach, describe, test } from 'vitest'
import { epdData } from '@/__test__/__data__'
import { ResponseBody } from '@/__test__/__mock__'
import { server } from '@/config'
import { epds, assemblies, products } from '@/models'
import type { GraphQLContext } from '@/schema/context'
import type { HttpLogger } from 'pino-http'
import { dbConnection } from '@/config/database'

const adminContext: GraphQLContext = {
  logger: {} as HttpLogger,
  session: {
    session: {
      id: 'session-id',
      userId: 'admin-id',
      token: 'admin-token',
      expiresAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    user: {
      id: 'admin-id',
      name: 'Admin User',
      email: 'admin@example.com',
      emailVerified: true,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  } as any,
}

describe('mutate LCAx data', async () => {
  afterEach(async () => {
    await dbConnection.delete(epds)
    await dbConnection.delete(assemblies)
    await dbConnection.delete(products)
  })

  test('add mixed LCAx data', async ({ expect }) => {
    const values = [
      {
        ...epdData[0],
        type: 'EPD',
      },
      {
        id: '994300e4-f3a7-4710-8b06-4078508f751f',
        name: 'Test Assembly',
        type: 'Assembly',
        quantity: 1.0,
        unit: 'm2',
      },
      {
        id: '27048777-66a7-4b53-9f82-019672685718',
        name: 'Test Product',
        type: 'Product',
        quantity: 1.0,
        unit: 'kg',
        referenceServiceLife: 50,
      },
    ]

    const response = await server.executeOperation(
      {
        query: gql`
          mutation addLCAxData($values: [LCAxInput!]!) {
            addLCAxData(values: $values)
          }
        `,
        variables: { values },
      },
      {
        contextValue: adminContext,
      },
    )

    const result = response.body as unknown as ResponseBody<{ addLCAxData: any[] }>

    expect(result.kind).toBe('single')
    expect(result.singleResult.errors).toBeUndefined()
    expect(result.singleResult.data.addLCAxData.length).toBe(3)

    const epdCount = await dbConnection.select().from(epds)
    const assemblyCount = await dbConnection.select().from(assemblies)
    const productCount = await dbConnection.select().from(products)

    expect(epdCount.length).toBe(1)
    expect(assemblyCount.length).toBe(1)
    expect(productCount.length).toBe(1)
  })
})
