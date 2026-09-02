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

const publicEpdId = 'cccccccc-cccc-cccc-cccc-ccccccccccc1'
const privateEpdId = 'cccccccc-cccc-cccc-cccc-ccccccccccc2'
const otherOrgPrivateEpdId = 'cccccccc-cccc-cccc-cccc-ccccccccccc3'
const versionedEpdId = 'cccccccc-cccc-cccc-cccc-ccccccccccc4'
const missingEpdId = 'cccccccc-cccc-cccc-cccc-ccccccccccc9'

const publicAssemblyId = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1'
const privateAssemblyId = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2'
const draftAssemblyId = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3'
const otherOrgAssemblyId = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa4'
const brokenAssemblyId = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa5'
const versionedAssemblyId = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa6'

const publicProductId = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb1'
const privateProductId = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb2'
const draftProductId = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb3'
const otherOrgProductId = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb4'
const brokenProductId = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb5'
const versionedProductId = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb6'

type ImpactRef = { id: string; version: string; epd: { id: string; name: string; version: string } | null }
type Classification = { name: string; system: string; code: string }
type OrgProduct = { id: string; name: string; classification: Classification[]; impactData: ImpactRef[] }
type OrgAssembly = {
  id: string
  name: string
  visibility: string
  incomplete: boolean
  productCount: number
  organizationId: string | null
  results: { gwp?: { a1a3?: number | null } | null } | null
  products: OrgProduct[]
}

const LIST_QUERY = gql`
  query organizationAssemblies {
    organizationAssemblies {
      id
      name
      visibility
      incomplete
      productCount
      organizationId
      results {
        gwp {
          a1a3
        }
      }
    }
  }
`

const GET_QUERY = gql`
  query organizationAssembly($id: String!) {
    organizationAssembly(id: $id) {
      id
      name
      visibility
      incomplete
      productCount
      organizationId
      results {
        gwp {
          a1a3
        }
      }
      products {
        id
        name
        classification {
          name
          system
          code
        }
        impactData {
          id
          version
          epd {
            id
            name
            version
          }
        }
      }
    }
  }
`

const SAVE_MUTATION = gql`
  mutation saveOrganizationAssembly($input: SaveOrganizationAssemblyInput!) {
    saveOrganizationAssembly(input: $input) {
      id
      name
      visibility
      incomplete
      productCount
      results {
        gwp {
          a1a3
        }
      }
      products {
        id
        name
        classification {
          name
          system
          code
        }
        impactData {
          id
          version
          epd {
            id
            name
            version
          }
        }
      }
    }
  }
`

const DELETE_MUTATION = gql`
  mutation deleteOrganizationAssembly($id: String!) {
    deleteOrganizationAssembly(id: $id)
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

const memberContext = createMockContext('user', orgAId)

const epdSeed = (overrides: Record<string, unknown>) =>
  ({
    version: '1',
    declaredUnit: 'kg',
    publishedDate: '2025-01-01',
    standard: 'en15804a2',
    location: 'dnk',
    subtype: 'generic',
    ...overrides,
  }) as any

const productSeed = (overrides: Record<string, unknown>) =>
  ({
    referenceServiceLife: 50,
    quantity: 1,
    unit: 'kg',
    impactData: [],
    ...overrides,
  }) as any

const assemblySeed = (overrides: Record<string, unknown>) =>
  ({
    quantity: 1,
    unit: 'm2',
    classification: [],
    products: [],
    incomplete: false,
    ...overrides,
  }) as any

const execute = async <T>(
  query: unknown,
  variables?: Record<string, unknown>,
  context: GraphQLContext = memberContext,
) => {
  const response = await server.executeOperation({ query, variables } as any, { contextValue: context })
  return response.body as unknown as ResponseBody<T>
}

describe('organization assemblies GraphQL', () => {
  beforeEach(async () => {
    await dbConnection.insert(organization).values([
      { id: orgAId, name: 'Org A', slug: 'org-a', createdAt: new Date() },
      { id: orgBId, name: 'Org B', slug: 'org-b', createdAt: new Date() },
    ])
    await dbConnection.insert(epds).values([
      epdSeed({ id: publicEpdId, name: 'Public impact EPD', visibility: 'Public' }),
      epdSeed({ id: privateEpdId, name: 'Org A private EPD', visibility: 'Private', organizationId: orgAId }),
      epdSeed({
        id: otherOrgPrivateEpdId,
        name: 'Org B private EPD',
        visibility: 'Private',
        organizationId: orgBId,
      }),
      epdSeed({
        id: versionedEpdId,
        name: 'Older version',
        version: '1',
        visibility: 'Public',
        publishedDate: '2024-01-01',
      }),
      epdSeed({
        id: versionedEpdId,
        name: 'Newer version',
        version: '2',
        visibility: 'Public',
        publishedDate: '2026-01-01',
      }),
    ])
    await dbConnection.insert(products).values([
      productSeed({
        id: publicProductId,
        name: 'Public product',
        visibility: 'Public',
        organizationId: orgAId,
        impactData: [{ type: 'reference', uri: publicEpdId, format: 'lcax', version: '1' }],
      }),
      productSeed({
        id: privateProductId,
        name: 'Private product',
        visibility: 'Private',
        organizationId: orgAId,
        impactData: [{ type: 'reference', uri: privateEpdId, format: 'lcax', version: '1' }],
      }),
      productSeed({
        id: draftProductId,
        name: 'Draft product',
        visibility: 'Private',
        organizationId: orgAId,
        impactData: [],
      }),
      productSeed({
        id: otherOrgProductId,
        name: 'Org B product',
        visibility: 'Private',
        organizationId: orgBId,
        impactData: [{ type: 'reference', uri: otherOrgPrivateEpdId, format: 'lcax', version: '1' }],
      }),
      productSeed({
        id: brokenProductId,
        name: 'Broken product',
        visibility: 'Private',
        organizationId: orgAId,
        impactData: [
          { type: 'reference', uri: missingEpdId, format: 'lcax', version: '1' },
          { type: 'reference', uri: otherOrgPrivateEpdId, format: 'lcax', version: '1' },
        ],
      }),
      productSeed({
        id: versionedProductId,
        name: 'Versioned product',
        visibility: 'Public',
        organizationId: orgAId,
        impactData: [{ type: 'reference', uri: versionedEpdId, format: 'lcax', version: '1' }],
      }),
    ])
    await dbConnection.insert(assemblies).values([
      assemblySeed({
        id: publicAssemblyId,
        name: 'Public wall',
        visibility: 'Public',
        organizationId: orgAId,
        incomplete: false,
        results: { gwp: { a1a3: 12.5 } },
        products: [{ type: 'reference', uri: publicProductId, format: 'lcax', version: null }],
      }),
      assemblySeed({
        id: privateAssemblyId,
        name: 'Private wall',
        visibility: 'Private',
        organizationId: orgAId,
        incomplete: false,
        results: { gwp: { a1a3: 8 } },
        products: [{ type: 'reference', uri: privateProductId, format: 'lcax', version: null }],
      }),
      assemblySeed({
        id: draftAssemblyId,
        name: 'Draft wall',
        visibility: 'Private',
        organizationId: orgAId,
        incomplete: true,
        results: null,
        products: [{ type: 'reference', uri: draftProductId, format: 'lcax', version: null }],
      }),
      assemblySeed({
        id: otherOrgAssemblyId,
        name: 'Org B private wall',
        visibility: 'Private',
        organizationId: orgBId,
        incomplete: false,
        products: [{ type: 'reference', uri: otherOrgProductId, format: 'lcax', version: null }],
      }),
      assemblySeed({
        id: brokenAssemblyId,
        name: 'Broken wall',
        visibility: 'Private',
        organizationId: orgAId,
        incomplete: true,
        products: [{ type: 'reference', uri: brokenProductId, format: 'lcax', version: null }],
      }),
      assemblySeed({
        id: versionedAssemblyId,
        name: 'Versioned wall',
        visibility: 'Public',
        organizationId: orgAId,
        incomplete: false,
        products: [{ type: 'reference', uri: versionedProductId, format: 'lcax', version: null }],
      }),
    ])
  })

  afterEach(async () => {
    await dbConnection.delete(assemblies)
    await dbConnection.delete(products)
    await dbConnection.delete(epds)
    await dbConnection.delete(organization)
  })

  test('lists this org Public, Private, and Draft assemblies and omits other-org Private', async ({ expect }) => {
    const result = await execute<{ organizationAssemblies: OrgAssembly[] }>(LIST_QUERY)
    expect(result.singleResult.errors).toBeUndefined()
    const rows = result.singleResult.data.organizationAssemblies
    const ids = rows.map((row) => row.id)
    expect(ids).toEqual(
      expect.arrayContaining([publicAssemblyId, privateAssemblyId, draftAssemblyId, brokenAssemblyId]),
    )
    expect(ids).not.toContain(otherOrgAssemblyId)

    const draft = rows.find((row) => row.id === draftAssemblyId)
    expect(draft).toMatchObject({ visibility: 'Private', incomplete: true, results: null, productCount: 1 })
  })

  test('editor query keeps broken EPD refs as holes instead of dropping them', async ({ expect }) => {
    const result = await execute<{ organizationAssembly: OrgAssembly }>(GET_QUERY, { id: brokenAssemblyId })
    expect(result.singleResult.errors).toBeUndefined()
    const impactData = result.singleResult.data.organizationAssembly.products[0].impactData
    expect(impactData).toHaveLength(2)
    expect(impactData).toEqual(
      expect.arrayContaining([
        { id: missingEpdId, version: '1', epd: null },
        { id: otherOrgPrivateEpdId, version: '1', epd: null },
      ]),
    )
  })

  test('editor query hydrates the pinned EPD version rather than the latest', async ({ expect }) => {
    const result = await execute<{ organizationAssembly: OrgAssembly }>(GET_QUERY, { id: versionedAssemblyId })
    expect(result.singleResult.errors).toBeUndefined()
    expect(result.singleResult.data.organizationAssembly.products[0].impactData[0]).toMatchObject({
      id: versionedEpdId,
      version: '1',
      epd: { id: versionedEpdId, name: 'Older version', version: '1' },
    })
  })

  test('DRAFT save requires a name, forces Private and incomplete, and allows empty Products', async ({ expect }) => {
    const unnamed = await execute<{ saveOrganizationAssembly: OrgAssembly }>(SAVE_MUTATION, {
      input: { kind: 'DRAFT', assembly: { name: '  ' } },
    })
    expect(unnamed.singleResult.errors?.[0].extensions?.code).toBe('BAD_USER_INPUT')

    const result = await execute<{ saveOrganizationAssembly: OrgAssembly }>(SAVE_MUTATION, {
      input: { kind: 'DRAFT', visibility: 'Public', results: { gwp: { a1a3: 99 } }, assembly: { name: 'Name only' } },
    })
    expect(result.singleResult.errors).toBeUndefined()
    expect(result.singleResult.data.saveOrganizationAssembly).toMatchObject({
      name: 'Name only',
      visibility: 'Private',
      incomplete: true,
      productCount: 0,
      results: null,
      products: [],
    })
  })

  test('product classification survives organization assembly save and editor reload', async ({ expect }) => {
    const classification = { name: 'Wall', system: 'OmniClass', code: '21-11 00 00' }
    const saved = await execute<{ saveOrganizationAssembly: OrgAssembly }>(SAVE_MUTATION, {
      input: {
        kind: 'COMPLETE',
        visibility: 'Private',
        assembly: {
          name: 'Classified wall',
          products: [
            {
              name: 'Classified product',
              classification: [classification],
              impactData: [{ id: publicEpdId, version: '1' }],
            },
          ],
        },
      },
    })

    expect(saved.singleResult.errors).toBeUndefined()
    const savedAssembly = saved.singleResult.data.saveOrganizationAssembly
    expect(savedAssembly.products[0].classification).toEqual([classification])

    const reloaded = await execute<{ organizationAssembly: OrgAssembly }>(GET_QUERY, { id: savedAssembly.id })
    expect(reloaded.singleResult.errors).toBeUndefined()
    expect(reloaded.singleResult.data.organizationAssembly.products[0].classification).toEqual([classification])
  })

  test('COMPLETE save is rejected for zero Products, empty Product, or a broken EPD ref', async ({ expect }) => {
    const zeroProducts = await execute<{ saveOrganizationAssembly: OrgAssembly }>(SAVE_MUTATION, {
      input: { kind: 'COMPLETE', visibility: 'Private', assembly: { name: 'Empty' } },
    })
    expect(zeroProducts.singleResult.errors?.[0].extensions?.code).toBe('BAD_USER_INPUT')

    const emptyProduct = await execute<{ saveOrganizationAssembly: OrgAssembly }>(SAVE_MUTATION, {
      input: {
        kind: 'COMPLETE',
        visibility: 'Private',
        assembly: { name: 'Empty product', products: [{ name: 'P', impactData: [] }] },
      },
    })
    expect(emptyProduct.singleResult.errors?.[0].extensions?.code).toBe('BAD_USER_INPUT')

    const broken = await execute<{ saveOrganizationAssembly: OrgAssembly }>(SAVE_MUTATION, {
      input: {
        kind: 'COMPLETE',
        visibility: 'Private',
        assembly: {
          name: 'Broken',
          products: [{ name: 'P', impactData: [{ id: missingEpdId, version: '1' }] }],
        },
      },
    })
    expect(broken.singleResult.errors?.[0].extensions?.code).toBe('BAD_USER_INPUT')
  })

  test('COMPLETE Public without confirmForcePublish returns Private EPD names and does not write', async ({
    expect,
  }) => {
    const result = await execute<{ saveOrganizationAssembly: OrgAssembly }>(SAVE_MUTATION, {
      input: {
        kind: 'COMPLETE',
        visibility: 'Public',
        assembly: {
          name: 'Force publish wall',
          products: [{ name: 'P', impactData: [{ id: privateEpdId, version: '1' }] }],
        },
      },
    })
    const extensions = result.singleResult.errors?.[0]?.extensions as
      | { code?: string; epds?: { id: string; name: string }[] }
      | undefined
    expect(extensions?.code).toBe('CONFIRM_FORCE_PUBLISH')
    expect(extensions?.epds).toEqual([{ id: privateEpdId, name: 'Org A private EPD' }])

    const listed = await execute<{ organizationAssemblies: OrgAssembly[] }>(LIST_QUERY)
    expect(listed.singleResult.data.organizationAssemblies.map((row) => row.name)).not.toContain('Force publish wall')
    const privateRow = (await dbConnection.select().from(epds)).find((row) => row.id === privateEpdId)
    expect(privateRow?.visibility).toBe('Private')
  })

  test('COMPLETE Public with confirmForcePublish publishes Private EPDs and the Assembly', async ({ expect }) => {
    const result = await execute<{ saveOrganizationAssembly: OrgAssembly }>(SAVE_MUTATION, {
      input: {
        kind: 'COMPLETE',
        visibility: 'Public',
        confirmForcePublish: true,
        results: { gwp: { a1a3: 3.2 } },
        assembly: {
          name: 'Published wall',
          products: [
            {
              name: 'P',
              impactData: [
                { id: privateEpdId, version: '1' },
                { id: privateEpdId, version: '1' },
              ],
            },
          ],
        },
      },
    })
    expect(result.singleResult.errors).toBeUndefined()
    expect(result.singleResult.data.saveOrganizationAssembly).toMatchObject({
      name: 'Published wall',
      visibility: 'Public',
      incomplete: false,
      results: { gwp: { a1a3: 3.2 } },
    })
    expect(result.singleResult.data.saveOrganizationAssembly.products[0].impactData).toHaveLength(1)
    const privateRow = (await dbConnection.select().from(epds)).find((row) => row.id === privateEpdId)
    expect(privateRow?.visibility).toBe('Public')
  })

  test('DRAFT on Public without confirmPrivatize does not write; with confirm, children stay Public', async ({
    expect,
  }) => {
    const denied = await execute<{ saveOrganizationAssembly: OrgAssembly }>(SAVE_MUTATION, {
      input: {
        id: publicAssemblyId,
        kind: 'DRAFT',
        assembly: { name: 'Public wall', products: [{ id: publicProductId, name: 'Public product' }] },
      },
    })
    expect(denied.singleResult.errors?.[0].extensions?.code).toBe('CONFIRM_PRIVATIZE')
    const stillPublic = await dbConnection.select().from(assemblies)
    expect(stillPublic.find((row) => row.id === publicAssemblyId)?.visibility).toBe('Public')
    expect(stillPublic.find((row) => row.id === publicAssemblyId)?.incomplete).toBe(false)

    const confirmed = await execute<{ saveOrganizationAssembly: OrgAssembly }>(SAVE_MUTATION, {
      input: {
        id: publicAssemblyId,
        kind: 'DRAFT',
        confirmPrivatize: true,
        assembly: { name: 'Public wall', products: [{ id: publicProductId, name: 'Public product' }] },
      },
    })
    expect(confirmed.singleResult.errors).toBeUndefined()
    expect(confirmed.singleResult.data.saveOrganizationAssembly).toMatchObject({
      id: publicAssemblyId,
      visibility: 'Private',
      incomplete: true,
      results: null,
    })
    const product = (await dbConnection.select().from(products)).find((row) => row.id === publicProductId)
    expect(product?.visibility).toBe('Public')
    const epd = (await dbConnection.select().from(epds)).find((row) => row.id === publicEpdId)
    expect(epd?.visibility).toBe('Public')
  })

  test('delete removes the Assembly and its Product rows but leaves EPDs', async ({ expect }) => {
    const result = await execute<{ deleteOrganizationAssembly: boolean }>(DELETE_MUTATION, { id: publicAssemblyId })
    expect(result.singleResult.errors).toBeUndefined()
    expect(result.singleResult.data.deleteOrganizationAssembly).toBe(true)

    const remainingAssemblies = await dbConnection.select().from(assemblies)
    expect(remainingAssemblies.map((row) => row.id)).not.toContain(publicAssemblyId)
    const remainingProducts = await dbConnection.select().from(products)
    expect(remainingProducts.map((row) => row.id)).not.toContain(publicProductId)
    const remainingEpds = await dbConnection.select().from(epds)
    expect(remainingEpds.map((row) => row.id)).toContain(publicEpdId)
  })

  test('unauthenticated writes are UNAUTHENTICATED and missing active org is FORBIDDEN', async ({ expect }) => {
    const unauthenticated = await execute<{ saveOrganizationAssembly: OrgAssembly }>(
      SAVE_MUTATION,
      { input: { kind: 'DRAFT', assembly: { name: 'Nope' } } },
      anonymousContext,
    )
    expect(unauthenticated.singleResult.errors?.[0].extensions?.code).toBe('UNAUTHENTICATED')

    const noOrg = await execute<{ saveOrganizationAssembly: OrgAssembly }>(
      SAVE_MUTATION,
      { input: { kind: 'DRAFT', assembly: { name: 'Nope' } } },
      createMockContext('user', null),
    )
    expect(noOrg.singleResult.errors?.[0].extensions?.code).toBe('FORBIDDEN')

    const unauthenticatedList = await execute<{ organizationAssemblies: OrgAssembly[] }>(
      LIST_QUERY,
      undefined,
      anonymousContext,
    )
    expect(unauthenticatedList.singleResult.errors?.[0].extensions?.code).toBe('UNAUTHENTICATED')
  })

  test('a Product id from another Assembly is treated as new instead of updated in place', async ({ expect }) => {
    const result = await execute<{ saveOrganizationAssembly: OrgAssembly }>(SAVE_MUTATION, {
      input: {
        kind: 'COMPLETE',
        visibility: 'Private',
        assembly: {
          name: 'Copy attempt',
          products: [{ id: publicProductId, name: 'Stolen name', impactData: [{ id: publicEpdId, version: '1' }] }],
        },
      },
    })
    expect(result.singleResult.errors).toBeUndefined()
    const createdId = result.singleResult.data.saveOrganizationAssembly.products[0].id
    expect(createdId).not.toBe(publicProductId)
    const original = (await dbConnection.select().from(products)).find((row) => row.id === publicProductId)
    expect(original?.name).toBe('Public product')
  })
})
