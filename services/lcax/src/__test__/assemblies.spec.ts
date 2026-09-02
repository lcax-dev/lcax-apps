import gql from 'graphql-tag'
import { afterEach, beforeEach, describe, test } from 'vitest'
import { server } from '@/config'
import { assemblies, epds, organization, products } from '@/models'
import type { GraphQLContext } from '@/schema/context'
import type { HttpLogger } from 'pino-http'
import { dbConnection } from '@/config/database'
import { ResponseBody } from '@/__test__/__mock__'

const orgAId = '00000000-0000-0000-0000-00000000000a'
const orgBId = '00000000-0000-0000-0000-00000000000b'

const publicAssemblyId = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1'
const publicProductId = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb1'
const privateProductId = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb2'
const missingProductId = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb3'
const inlineProductId = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb4'
const publicEpdId = 'cccccccc-cccc-cccc-cccc-ccccccccccc1'
const privateEpdId = 'cccccccc-cccc-cccc-cccc-ccccccccccc2'
const inlineImpactEpdId = 'cccccccc-cccc-cccc-cccc-ccccccccccc3'

type ImpactEpd = { id?: string | null; name?: string | null }
type AssemblyProduct = {
  id?: string | null
  name?: string | null
  type?: string | null
  quantity?: number | null
  unit?: string | null
  impactData?: ImpactEpd[] | null
}
type AssemblyRow = {
  id: string
  name: string
  type: string
  products: AssemblyProduct[]
}

const GET_ASSEMBLY = gql`
  query assemblies($where: AssembliesFilters) {
    assemblies(where: $where, limit: 1) {
      id
      name
      type
      products {
        id
        name
        type
        quantity
        unit
        impactData {
          id
          name
        }
      }
    }
  }
`

const SEARCH_WITH_PRODUCTS = gql`
  query search {
    search(kinds: [ASSEMBLY]) {
      __typename
      ... on Assembly {
        id
        name
        type
        products {
          id
          name
        }
      }
    }
  }
`

const SEARCH_WITHOUT_PRODUCTS = gql`
  query search {
    search(kinds: [ASSEMBLY]) {
      __typename
      ... on Assembly {
        id
        name
        type
      }
    }
  }
`

const anonymousContext: GraphQLContext = { logger: {} as HttpLogger, session: null }

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

const getAssembly = async (id: string, context: GraphQLContext = anonymousContext) => {
  const response = await server.executeOperation(
    { query: GET_ASSEMBLY, variables: { where: { id: { eq: id } } } },
    { contextValue: context },
  )
  return response.body as unknown as ResponseBody<{ assemblies: AssemblyRow[] }>
}

describe('assemblies query', () => {
  beforeEach(async () => {
    await dbConnection.insert(organization).values([
      { id: orgAId, name: 'Org A', slug: 'org-a', createdAt: new Date() },
      { id: orgBId, name: 'Org B', slug: 'org-b', createdAt: new Date() },
    ])
    await dbConnection.insert(epds).values([
      {
        id: publicEpdId,
        name: 'Public impact EPD',
        version: '1',
        visibility: 'Public',
        declaredUnit: 'kg',
        publishedDate: '2025-01-01',
        standard: 'en15804a2',
        location: 'dnk',
        subtype: 'generic',
      },
      {
        id: privateEpdId,
        name: 'Private impact EPD',
        version: '1',
        visibility: 'Private',
        organizationId: orgBId,
        declaredUnit: 'kg',
        publishedDate: '2025-01-01',
        standard: 'en15804a2',
        location: 'dnk',
        subtype: 'generic',
      },
    ] as any)
    await dbConnection.insert(products).values([
      {
        id: publicProductId,
        name: 'Public catalog product',
        referenceServiceLife: 50,
        quantity: 2,
        unit: 'kg',
        visibility: 'Public',
        impactData: [{ type: 'reference', uri: publicEpdId }],
      },
      {
        id: privateProductId,
        name: 'Private catalog product',
        referenceServiceLife: 50,
        quantity: 3,
        unit: 'kg',
        visibility: 'Private',
        organizationId: orgBId,
        impactData: [],
      },
    ] as any)
    await dbConnection.insert(assemblies).values([
      {
        id: publicAssemblyId,
        name: 'Visible wall',
        quantity: 1,
        unit: 'm2',
        visibility: 'Public',
        classification: [],
        products: [
          {
            type: 'product',
            id: inlineProductId,
            name: 'Inline product',
            description: null,
            referenceServiceLife: 80,
            quantity: 0.5,
            unit: 'kg',
            transport: null,
            results: null,
            metaData: null,
            impactData: [
              {
                type: 'EPD',
                id: inlineImpactEpdId,
                name: 'Inline impact EPD',
                declaredUnit: 'kg',
                version: '1',
                publishedDate: '2025-01-01',
                validUntil: '2030-01-01',
                standard: 'en15804a2',
                location: 'dnk',
                subtype: 'generic',
                impacts: {},
              },
              { type: 'reference', uri: publicEpdId },
              { type: 'reference', uri: privateEpdId },
            ],
          },
          { type: 'reference', uri: publicProductId },
          { type: 'reference', uri: privateProductId },
          { type: 'reference', uri: missingProductId },
          { type: 'reference', uri: 'https://example.com/products/not-a-catalog-id' },
        ],
      },
    ] as any)
  })

  afterEach(async () => {
    await dbConnection.delete(assemblies)
    await dbConnection.delete(products)
    await dbConnection.delete(epds)
    await dbConnection.delete(organization)
  })

  test('returns the Assembly with type assembly even though the column does not exist', async ({ expect }) => {
    const result = await getAssembly(publicAssemblyId)
    expect(result.singleResult.errors).toBeUndefined()
    expect(result.singleResult.data.assemblies).toHaveLength(1)
    expect(result.singleResult.data.assemblies[0]).toMatchObject({
      id: publicAssemblyId,
      name: 'Visible wall',
      type: 'assembly',
    })
  })

  test('keeps inline products on a visible Assembly', async ({ expect }) => {
    const result = await getAssembly(publicAssemblyId)
    const names = result.singleResult.data.assemblies[0].products.map((product) => product.name)
    expect(names).toContain('Inline product')
    const inline = result.singleResult.data.assemblies[0].products.find((product) => product.id === inlineProductId)
    expect(inline).toMatchObject({ type: 'product', quantity: 0.5, unit: 'kg' })
  })

  test('resolves public catalog references and omits private catalog children', async ({ expect }) => {
    const result = await getAssembly(publicAssemblyId)
    const names = result.singleResult.data.assemblies[0].products.map((product) => product.name)
    expect(names).toContain('Public catalog product')
    expect(names).not.toContain('Private catalog product')
  })

  test('omits unresolved and external references without failing the Assembly', async ({ expect }) => {
    const result = await getAssembly(publicAssemblyId)
    expect(result.singleResult.errors).toBeUndefined()
    expect(result.singleResult.data.assemblies).toHaveLength(1)
    const ids = result.singleResult.data.assemblies[0].products.map((product) => product.id)
    expect(ids).not.toContain(missingProductId)
    expect(ids).not.toContain('https://example.com/products/not-a-catalog-id')
  })

  test('filters impact EPD references with the same Visibility rule', async ({ expect }) => {
    const result = await getAssembly(publicAssemblyId)
    const inline = result.singleResult.data.assemblies[0].products.find((product) => product.id === inlineProductId)
    const impactNames = (inline?.impactData ?? []).map((epd) => epd.name)
    expect(impactNames).toContain('Inline impact EPD')
    expect(impactNames).toContain('Public impact EPD')
    expect(impactNames).not.toContain('Private impact EPD')
  })

  test('member can resolve own-org private catalog products', async ({ expect }) => {
    const result = await getAssembly(publicAssemblyId, createMockContext('user', orgBId))
    const names = result.singleResult.data.assemblies[0].products.map((product) => product.name)
    expect(names).toContain('Private catalog product')
    const inline = result.singleResult.data.assemblies[0].products.find((product) => product.id === inlineProductId)
    const impactNames = (inline?.impactData ?? []).map((epd) => epd.name)
    expect(impactNames).toContain('Private impact EPD')
  })
})

describe('search product expansion', () => {
  beforeEach(async () => {
    await dbConnection
      .insert(organization)
      .values([{ id: orgAId, name: 'Org A', slug: 'org-a', createdAt: new Date() }])
    await dbConnection.insert(products).values([
      {
        id: publicProductId,
        name: 'Public catalog product',
        referenceServiceLife: 50,
        quantity: 2,
        unit: 'kg',
        visibility: 'Public',
        impactData: [],
      },
    ] as any)
    await dbConnection.insert(assemblies).values([
      {
        id: publicAssemblyId,
        name: 'Visible wall',
        quantity: 1,
        unit: 'm2',
        visibility: 'Public',
        classification: [],
        products: [
          { type: 'reference', uri: publicProductId },
          { type: 'reference', uri: missingProductId },
        ],
      },
    ] as any)
  })

  afterEach(async () => {
    await dbConnection.delete(assemblies)
    await dbConnection.delete(products)
    await dbConnection.delete(organization)
  })

  test('hydrates products when the search selection includes them', async ({ expect }) => {
    const response = await server.executeOperation({ query: SEARCH_WITH_PRODUCTS }, { contextValue: anonymousContext })
    const result = response.body as unknown as ResponseBody<{
      search: { id: string; name: string; type: string; products: AssemblyProduct[] }[]
    }>
    expect(result.singleResult.errors).toBeUndefined()
    expect(result.singleResult.data.search[0].products.map((product) => product.name)).toEqual([
      'Public catalog product',
    ])
  })

  test('still returns Assemblies when products are not selected', async ({ expect }) => {
    const response = await server.executeOperation(
      { query: SEARCH_WITHOUT_PRODUCTS },
      { contextValue: anonymousContext },
    )
    const result = response.body as unknown as ResponseBody<{
      search: { id: string; name: string; type: string; products?: AssemblyProduct[] }[]
    }>
    expect(result.singleResult.errors).toBeUndefined()
    expect(result.singleResult.data.search[0]).toMatchObject({
      id: publicAssemblyId,
      name: 'Visible wall',
      type: 'assembly',
    })
    expect(result.singleResult.data.search[0].products).toBeUndefined()
  })
})
