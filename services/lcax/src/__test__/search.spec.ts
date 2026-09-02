import gql from 'graphql-tag'
import { afterEach, beforeEach, describe, test } from 'vitest'
import { server } from '@/config'
import { assemblies, epds, organization } from '@/models'
import type { GraphQLContext } from '@/schema/context'
import type { HttpLogger } from 'pino-http'
import { dbConnection } from '@/config/database'
import { ResponseBody } from '@/__test__/__mock__'

const orgAId = '00000000-0000-0000-0000-00000000000a'
const orgBId = '00000000-0000-0000-0000-00000000000b'

type SearchHit = {
  __typename: 'EPD' | 'Assembly'
  id: string
  name: string
  comment?: string | null
  description?: string | null
  declaredUnit?: string | null
  standard?: string | null
  unit?: string | null
}

type SearchRow = {
  __typename: 'EPD' | 'Assembly'
  epdId?: string | null
  epdName?: string | null
  assemblyId?: string
  assemblyName?: string
  comment?: string | null
  description?: string | null
  declaredUnit?: string | null
  standard?: string | null
  unit?: string | null
}

const SEARCH = gql`
  query search($q: String, $kinds: [LCAxKind!], $where: SearchFilters, $limit: Int, $offset: Int) {
    search(q: $q, kinds: $kinds, where: $where, limit: $limit, offset: $offset) {
      __typename
      ... on EPD {
        epdId: id
        epdName: name
        comment
        declaredUnit
        standard
      }
      ... on Assembly {
        assemblyId: id
        assemblyName: name
        description
        comment
        unit
        classification {
          name
        }
      }
    }
  }
`

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

const anonymousContext: GraphQLContext = { logger: {} as HttpLogger, session: null }

const pad = (value: number) => String(value).padStart(2, '0')

const mixedCatalogEpds = Array.from({ length: 30 }, (_, index) => ({
  id: `11111111-1111-1111-1111-${String(index).padStart(12, '0')}`,
  name: `Search ${pad(index * 2)}`,
  version: '1',
  visibility: 'Public',
  organizationId: null,
  declaredUnit: index % 2 === 0 ? 'm2' : 'kg',
  publishedDate: '2025-01-01',
  standard: index % 2 === 0 ? 'en15804a2' : 'en15804a1',
  location: 'dnk',
  subtype: 'generic',
  comment: null,
}))

const mixedCatalogAssemblies = Array.from({ length: 30 }, (_, index) => ({
  id: `22222222-2222-2222-2222-${String(index).padStart(12, '0')}`,
  name: `Search ${pad(index * 2 + 1)}`,
  quantity: 1,
  unit: index % 2 === 0 ? 'm2' : 'kg',
  visibility: 'Public',
  organizationId: null,
  description: null,
  comment: null,
  classification: [{ name: index === 0 ? 'External walls' : 'Floors', system: 'CCI', code: `${index}` }],
  products: [],
}))

const search = async (variables: Record<string, unknown> = {}, context: GraphQLContext = anonymousContext) => {
  const response = await server.executeOperation({ query: SEARCH, variables }, { contextValue: context })
  const result = response.body as unknown as ResponseBody<{ search: SearchRow[] }>
  return {
    ...result.singleResult,
    data: {
      search: (result.singleResult.data?.search ?? []).map((row) => ({
        __typename: row.__typename,
        id: row.__typename === 'EPD' ? row.epdId : row.assemblyId,
        name: row.__typename === 'EPD' ? row.epdName : row.assemblyName,
        comment: row.comment,
        description: row.description,
        declaredUnit: row.declaredUnit,
        standard: row.standard,
        unit: row.unit,
      })) as SearchHit[],
    },
    errors: result.singleResult.errors,
  }
}

describe('search query', () => {
  beforeEach(async () => {
    await dbConnection.insert(organization).values([
      { id: orgAId, name: 'Org A', slug: 'org-a', createdAt: new Date() },
      { id: orgBId, name: 'Org B', slug: 'org-b', createdAt: new Date() },
    ])
  })

  afterEach(async () => {
    await dbConnection.delete(epds)
    await dbConnection.delete(assemblies)
    await dbConnection.delete(organization)
  })

  describe('mixed results', () => {
    beforeEach(async () => {
      await dbConnection.insert(epds).values(mixedCatalogEpds as any)
      await dbConnection.insert(assemblies).values(mixedCatalogAssemblies as any)
    })

    test('returns Public EPDs and Assemblies name-sorted and capped at 50 by default', async ({ expect }) => {
      const result = await search()
      expect(result.errors).toBeUndefined()
      expect(result.data.search).toHaveLength(50)
      expect(result.data.search.map((hit) => hit.name)).toEqual(
        Array.from({ length: 50 }, (_, index) => `Search ${pad(index)}`),
      )
      expect(result.data.search[0]).toMatchObject({ __typename: 'EPD', name: 'Search 00' })
      expect(result.data.search[1]).toMatchObject({ __typename: 'Assembly', name: 'Search 01' })
    })

    test('kinds ASSEMBLY returns only Assemblies after the cap', async ({ expect }) => {
      const extraAssemblies = Array.from({ length: 30 }, (_, index) => ({
        id: `33333333-3333-3333-3333-${String(index).padStart(12, '0')}`,
        name: `Zebra ${pad(index)}`,
        quantity: 1,
        unit: 'm2',
        visibility: 'Public',
        classification: [],
        products: [],
      }))
      await dbConnection.insert(assemblies).values(extraAssemblies as any)

      const result = await search({ kinds: ['ASSEMBLY'] })
      expect(result.errors).toBeUndefined()
      expect(result.data.search).toHaveLength(50)
      expect(result.data.search.every((hit) => hit.__typename === 'Assembly')).toBe(true)
      expect(result.data.search.some((hit) => hit.name.startsWith('Zebra'))).toBe(true)
    })
  })

  describe('free text', () => {
    beforeEach(async () => {
      await dbConnection.insert(epds).values([
        {
          id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1',
          name: 'Timber floor EPD',
          version: '1',
          visibility: 'Public',
          declaredUnit: 'm2',
          publishedDate: '2025-01-01',
          standard: 'en15804a2',
          location: 'dnk',
          subtype: 'generic',
          comment: 'generic board',
        },
        {
          id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2',
          name: 'Concrete slab',
          version: '1',
          visibility: 'Public',
          declaredUnit: 'm2',
          publishedDate: '2025-01-01',
          standard: 'en15804a2',
          location: 'dnk',
          subtype: 'generic',
          comment: 'contains timber fibres',
        },
        {
          id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3',
          name: 'Steel beam',
          version: '1',
          visibility: 'Public',
          declaredUnit: 'kg',
          publishedDate: '2025-01-01',
          standard: 'en15804a2',
          location: 'dnk',
          subtype: 'generic',
          comment: 'structural steel',
        },
      ] as any)
      await dbConnection.insert(assemblies).values([
        {
          id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb1',
          name: 'Timber wall',
          quantity: 1,
          unit: 'm2',
          visibility: 'Public',
          description: 'load bearing',
          comment: 'ignore me',
          classification: [],
          products: [],
        },
        {
          id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb2',
          name: 'Steel frame',
          quantity: 1,
          unit: 'kg',
          visibility: 'Public',
          description: 'uses timber connectors',
          comment: 'metal only',
          classification: [],
          products: [],
        },
        {
          id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb3',
          name: 'Hidden comment assembly',
          quantity: 1,
          unit: 'm2',
          visibility: 'Public',
          description: 'concrete core',
          comment: 'timber leftover notes',
          classification: [],
          products: [],
        },
        {
          id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb4',
          name: 'Nested product assembly',
          quantity: 1,
          unit: 'm2',
          visibility: 'Public',
          description: 'composite panel',
          comment: null,
          classification: [],
          products: [{ type: 'product', name: 'timber plank', quantity: 1, unit: 'm3' }],
        },
      ] as any)
    })

    test('matches EPD name and comment and Assembly name and description', async ({ expect }) => {
      const result = await search({ q: 'timber' })
      expect(result.errors).toBeUndefined()
      expect(result.data.search.map((hit) => hit.name).sort()).toEqual([
        'Concrete slab',
        'Steel frame',
        'Timber floor EPD',
        'Timber wall',
      ])
    })

    test('does not match Assembly comment or nested Product names', async ({ expect }) => {
      const result = await search({ q: 'timber' })
      const names = result.data.search.map((hit) => hit.name)
      expect(names).not.toContain('Hidden comment assembly')
      expect(names).not.toContain('Nested product assembly')
    })
  })

  describe('union filters', () => {
    beforeEach(async () => {
      await dbConnection.insert(epds).values([
        {
          id: 'cccccccc-cccc-cccc-cccc-ccccccccccc1',
          name: 'Alpha EPD',
          version: '1',
          visibility: 'Public',
          declaredUnit: 'm2',
          publishedDate: '2025-01-01',
          standard: 'en15804a2',
          location: 'dnk',
          subtype: 'generic',
        },
        {
          id: 'cccccccc-cccc-cccc-cccc-ccccccccccc2',
          name: 'Bravo EPD',
          version: '1',
          visibility: 'Public',
          declaredUnit: 'kg',
          publishedDate: '2025-01-01',
          standard: 'en15804a1',
          location: 'dnk',
          subtype: 'generic',
        },
      ] as any)
      await dbConnection.insert(assemblies).values([
        {
          id: 'dddddddd-dddd-dddd-dddd-ddddddddddd1',
          name: 'Charlie Assembly',
          quantity: 1,
          unit: 'm2',
          visibility: 'Public',
          classification: [{ name: 'External walls', system: 'CCI', code: '21' }],
          products: [],
        },
        {
          id: 'dddddddd-dddd-dddd-dddd-ddddddddddd2',
          name: 'Delta Assembly',
          quantity: 1,
          unit: 'kg',
          visibility: 'Public',
          classification: [{ name: 'Floors', system: 'CCI', code: '23' }],
          products: [],
        },
      ] as any)
    })

    test('standard filter drops non-matching EPDs but does not hide Assemblies', async ({ expect }) => {
      const result = await search({ where: { standard: { eq: 'EN15804_A2' } } })
      expect(result.errors).toBeUndefined()
      expect(result.data.search.map((hit) => hit.name)).toEqual(['Alpha EPD', 'Charlie Assembly', 'Delta Assembly'])
    })

    test('unit filter applies to EPD declaredUnit and Assembly unit', async ({ expect }) => {
      const result = await search({ where: { unit: { eq: 'M2' } } })
      expect(result.errors).toBeUndefined()
      expect(result.data.search.map((hit) => hit.name)).toEqual(['Alpha EPD', 'Charlie Assembly'])
    })

    test('classification filter applies only to Assemblies', async ({ expect }) => {
      const result = await search({ where: { classification: { contains: 'External walls' } } })
      expect(result.errors).toBeUndefined()
      expect(result.data.search.map((hit) => hit.name)).toEqual(['Alpha EPD', 'Bravo EPD', 'Charlie Assembly'])
    })
  })

  describe('visibility', () => {
    beforeEach(async () => {
      await dbConnection.insert(epds).values([
        {
          id: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee1',
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
          id: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee2',
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
          id: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee3',
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
      ] as any)
      await dbConnection.insert(assemblies).values([
        {
          id: 'ffffffff-ffff-ffff-ffff-fffffffffff1',
          name: 'Public Assembly',
          quantity: 1,
          unit: 'm2',
          visibility: 'Public',
          organizationId: null,
          classification: [],
          products: [],
        },
        {
          id: 'ffffffff-ffff-ffff-ffff-fffffffffff2',
          name: 'Org A Private Assembly',
          quantity: 1,
          unit: 'm2',
          visibility: 'Private',
          organizationId: orgAId,
          classification: [],
          products: [],
        },
        {
          id: 'ffffffff-ffff-ffff-ffff-fffffffffff3',
          name: 'Org B Private Assembly',
          quantity: 1,
          unit: 'm2',
          visibility: 'Private',
          organizationId: orgBId,
          classification: [],
          products: [],
        },
      ] as any)
    })

    test('anonymous user sees only Public EPDs and Assemblies', async ({ expect }) => {
      const result = await search()
      expect(result.errors).toBeUndefined()
      expect(result.data.search.map((hit) => hit.name)).toEqual(['Public Assembly', 'Public EPD'])
    })

    test('Member sees own-org Private Assemblies and EPDs', async ({ expect }) => {
      const result = await search({}, createMockContext('user', orgAId))
      expect(result.errors).toBeUndefined()
      expect(result.data.search.map((hit) => hit.name)).toEqual([
        'Org A Private Assembly',
        'Org A Private EPD',
        'Public Assembly',
        'Public EPD',
      ])
    })

    test('admin sees all Assemblies and EPDs', async ({ expect }) => {
      const result = await search({}, createMockContext('admin', null))
      expect(result.errors).toBeUndefined()
      expect(result.data.search.map((hit) => hit.name)).toEqual([
        'Org A Private Assembly',
        'Org A Private EPD',
        'Org B Private Assembly',
        'Org B Private EPD',
        'Public Assembly',
        'Public EPD',
      ])
    })
  })
})
