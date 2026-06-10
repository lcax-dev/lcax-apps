import gql from 'graphql-tag'
import { afterEach, beforeEach, describe, test } from 'vitest'
import { server } from '@/config'
import { epds, organization } from '@/models'
import { type EPD } from '@/models/types'
import type { GraphQLContext } from '@/schema/context'
import type { HttpLogger } from 'pino-http'
import { dbConnection } from '@/config/database'
import { ResponseBody } from '@/__test__/__mock__'

const orgAId = '00000000-0000-0000-0000-00000000000a'
const orgBId = '00000000-0000-0000-0000-00000000000b'

const visibilityTestData = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    name: 'Public EPD',
    version: '1',
    visibility: 'Public',
    organizationId: null,
    declaredUnit: 'm2',
    publishedDate: '2025-01-01',
    standard: 'en15804a2',
    location: 'dnk',
    subtype: 'generic',
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    name: 'Org A Private EPD',
    version: '1',
    visibility: 'Private',
    organizationId: orgAId,
    declaredUnit: 'm2',
    publishedDate: '2025-01-01',
    standard: 'en15804a2',
    location: 'dnk',
    subtype: 'generic',
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    name: 'Org B Private EPD',
    version: '1',
    visibility: 'Private',
    organizationId: orgBId,
    declaredUnit: 'm2',
    publishedDate: '2025-01-01',
    standard: 'en15804a2',
    location: 'dnk',
    subtype: 'generic',
  },
] as unknown as EPD[]

const createMockContext = (role: string | null, orgId: string | null): GraphQLContext => ({
  logger: {} as HttpLogger,
  session: {
    session: {
      activeOrganizationId: orgId,
    },
    user: {
      role: role,
    },
  } as any,
})

describe('EPD Visibility Filtering', async () => {
  beforeEach(async () => {
    await dbConnection.insert(organization).values([
      { id: orgAId, name: 'Org A', slug: 'org-a' },
      { id: orgBId, name: 'Org B', slug: 'org-b' },
    ])
    await dbConnection.insert(epds).values(visibilityTestData)
  })
  afterEach(async () => {
    await dbConnection.delete(epds)
    await dbConnection.delete(organization)
  })

  test('Admin sees everything', async ({ expect }) => {
    const context = createMockContext('admin', null)
    const response = await server.executeOperation(
      { query: 'query epds { epds { id } }' },
      { contextValue: context }
    )
    const result = response.body as unknown as ResponseBody<{ epds: EPD[] }>
    expect(result.singleResult.data.epds.length).toBe(3)
  })

  test('User in Org A sees Public and Org A Private EPDs', async ({ expect }) => {
    const context = createMockContext('user', orgAId)
    const response = await server.executeOperation(
      { query: 'query epds { epds { id } }' },
      { contextValue: context }
    )
    const result = response.body as unknown as ResponseBody<{ epds: EPD[] }>
    expect(result.singleResult.data.epds.length).toBe(2)
    const ids = result.singleResult.data.epds.map(e => e.id)
    expect(ids).toContain(visibilityTestData[0].id)
    expect(ids).toContain(visibilityTestData[1].id)
    expect(ids).not.toContain(visibilityTestData[2].id)
  })

  test('User in Org C sees only Public EPDs', async ({ expect }) => {
    const context = createMockContext('user', '00000000-0000-0000-0000-00000000000c')
    const response = await server.executeOperation(
      { query: 'query epds { epds { id } }' },
      { contextValue: context }
    )
    const result = response.body as unknown as ResponseBody<{ epds: EPD[] }>
    expect(result.singleResult.data.epds.length).toBe(1)
    expect(result.singleResult.data.epds[0].id).toBe(visibilityTestData[0].id)
  })

  test('Anonymous user sees only Public EPDs', async ({ expect }) => {
    const context: GraphQLContext = { logger: {} as HttpLogger, session: null }
    const response = await server.executeOperation(
      { query: 'query epds { epds { id } }' },
      { contextValue: context }
    )
    const result = response.body as unknown as ResponseBody<{ epds: EPD[] }>
    expect(result.singleResult.data.epds.length).toBe(1)
    expect(result.singleResult.data.epds[0].id).toBe(visibilityTestData[0].id)
  })
})
