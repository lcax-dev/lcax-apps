import gql from 'graphql-tag'
import { afterEach, describe, test, expect } from 'vitest'
import { epdData } from '@/__test__/__data__'
import { ResponseBody } from '@/__test__/__mock__'
import { server } from '@/config'
import { epds } from '@/models'
import { dbConnection } from '@/config/database'
import type { GraphQLContext } from '@/schema/context'
import type { HttpLogger } from 'pino-http'

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

const userContext: GraphQLContext = {
  logger: {} as HttpLogger,
  session: {
    session: {
      id: 'session-id',
      userId: 'user-id',
      token: 'user-token',
      expiresAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    user: {
      id: 'user-id',
      name: 'Regular User',
      email: 'user@example.com',
      emailVerified: true,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  } as any,
}

const GET_EPD_STATISTICS = gql`
  query getEpdStatistics {
    epdStatistics {
      totalCount
      uploads {
        date
        count
      }
    }
  }
`

describe('getEPDStatistics resolver', () => {
  afterEach(async () => {
    await dbConnection.delete(epds)
  })

  test('should throw error if user is not authenticated', async () => {
    const response = await server.executeOperation({
      query: GET_EPD_STATISTICS,
    })

    const result = response.body as unknown as ResponseBody<any>
    expect(result.kind).toBe('single')
    expect(result.singleResult.errors).toBeDefined()
    expect(result.singleResult.errors![0].message).toBe('User is not authorized to view statistics')
    expect(result.singleResult.errors![0].extensions?.code).toBe('FORBIDDEN')
  })

  test('should throw error if user is not an admin', async () => {
    const response = await server.executeOperation(
      {
        query: GET_EPD_STATISTICS,
      },
      {
        contextValue: userContext,
      },
    )

    const result = response.body as unknown as ResponseBody<any>
    expect(result.kind).toBe('single')
    expect(result.singleResult.errors).toBeDefined()
    expect(result.singleResult.errors![0].message).toBe('User is not authorized to view statistics')
    expect(result.singleResult.errors![0].extensions?.code).toBe('FORBIDDEN')
  })

  test('should return zero statistics when database is empty', async () => {
    const response = await server.executeOperation(
      {
        query: GET_EPD_STATISTICS,
      },
      {
        contextValue: adminContext,
      },
    )

    const result = response.body as unknown as ResponseBody<{ epdStatistics: { totalCount: number; uploads: any[] } }>
    expect(result.kind).toBe('single')
    expect(result.singleResult.errors).toBeUndefined()
    expect(result.singleResult.data?.epdStatistics.totalCount).toBe(0)
    expect(result.singleResult.data?.epdStatistics.uploads).toEqual([])
  })

  test('should return correct statistics with data', async () => {
    const testData = [
      {
        ...epdData[0],
        id: '00000000-0000-0000-0000-000000000001',
        metaData: { uploadedAt: '2024-01-01T10:00:00Z' },
      },
      {
        ...epdData[1],
        id: '00000000-0000-0000-0000-000000000002',
        metaData: { uploadedAt: '2024-01-01T15:00:00Z' },
      },
      {
        ...epdData[0],
        id: '00000000-0000-0000-0000-000000000003',
        metaData: { uploadedAt: '2024-01-02T10:00:00Z' },
      },
    ]

    await dbConnection.insert(epds).values(testData as any)

    const response = await server.executeOperation(
      {
        query: GET_EPD_STATISTICS,
      },
      {
        contextValue: adminContext,
      },
    )

    const result = response.body as unknown as ResponseBody<{
      epdStatistics: { totalCount: number; uploads: { date: string; count: number }[] }
    }>
    expect(result.kind).toBe('single')
    expect(result.singleResult.errors).toBeUndefined()
    expect(result.singleResult.data?.epdStatistics.totalCount).toBe(3)

    const uploads = result.singleResult.data?.epdStatistics.uploads
    expect(uploads).toHaveLength(2)
    expect(uploads).toContainEqual({ date: '2024-01-01', count: 2 })
    expect(uploads).toContainEqual({ date: '2024-01-02', count: 1 })
    // Verify sorting
    expect(uploads![0].date).toBe('2024-01-01')
    expect(uploads![1].date).toBe('2024-01-02')
  })

  test('should handle EPDs without uploadedAt field', async () => {
    const testData = [
      {
        ...epdData[0],
        id: '00000000-0000-0000-0000-000000000001',
        metaData: { uploadedAt: '2024-01-01T10:00:00Z' },
      },
      {
        ...epdData[1],
        id: '00000000-0000-0000-0000-000000000002',
        metaData: { someOtherField: 'value' }, // No uploadedAt
      },
    ]

    await dbConnection.insert(epds).values(testData as any)

    const response = await server.executeOperation(
      {
        query: GET_EPD_STATISTICS,
      },
      {
        contextValue: adminContext,
      },
    )

    const result = response.body as unknown as ResponseBody<{
      epdStatistics: { totalCount: number; uploads: { date: string; count: number }[] }
    }>
    expect(result.singleResult.data?.epdStatistics.totalCount).toBe(2)
    expect(result.singleResult.data?.epdStatistics.uploads).toHaveLength(1)
    expect(result.singleResult.data?.epdStatistics.uploads[0]).toEqual({ date: '2024-01-01', count: 1 })
  })

  test('should handle EPDs with null metadata', async () => {
    const testData = [
      {
        ...epdData[0],
        id: '00000000-0000-0000-0000-000000000001',
        metaData: null,
      },
    ]

    await dbConnection.insert(epds).values(testData as any)

    const response = await server.executeOperation(
      {
        query: GET_EPD_STATISTICS,
      },
      {
        contextValue: adminContext,
      },
    )

    const result = response.body as unknown as ResponseBody<{
      epdStatistics: { totalCount: number; uploads: { date: string; count: number }[] }
    }>
    expect(result.singleResult.data?.epdStatistics.totalCount).toBe(1)
    expect(result.singleResult.data?.epdStatistics.uploads).toHaveLength(0)
  })
})
