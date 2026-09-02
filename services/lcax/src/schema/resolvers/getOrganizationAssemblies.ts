import { and, asc, eq, inArray } from 'drizzle-orm'
import type { ImpactData } from 'lcax'
import { dbConnection } from '@/config/database'
import * as models from '@/models'
import type { Assembly, EPD, Product } from '@/models/types'
import type { GraphQLContext } from '@/schema/context'
import {
  UUID_RE,
  catalogIdFromUri,
  isReference,
  isVisibleToOrganization,
  productIdsFromRefs,
  requireOrganizationSession,
} from '@/schema/utils/organizationAssembly'

type ImpactRef = { type?: string; uri?: string | null; version?: string | null }

const impactRefsFromProduct = (impactData: ImpactData[] | null | undefined): ImpactRef[] =>
  (impactData ?? []) as ImpactRef[]

const mapImpactData = (
  impactData: ImpactData[] | null | undefined,
  epdsByKey: Map<string, EPD>,
  organizationId: string,
) => {
  const mapped: { id: string; version: string; epd: EPD | null }[] = []
  for (const item of impactRefsFromProduct(impactData)) {
    if (!isReference(item)) continue
    const id = catalogIdFromUri(item.uri)
    if (!id) continue
    const version = item.version ?? ''
    const epd = epdsByKey.get(`${id}:${version}`)
    mapped.push({
      id,
      version,
      epd: epd && isVisibleToOrganization(epd, organizationId) ? epd : null,
    })
  }
  return mapped
}

const mapProduct = (product: Product, epdsByKey: Map<string, EPD>, organizationId: string) => ({
  id: product.id,
  name: product.name,
  description: product.description,
  quantity: product.quantity,
  unit: product.unit,
  referenceServiceLife: product.referenceServiceLife,
  classification: product.classification ?? [],
  impactData: mapImpactData(product.impactData, epdsByKey, organizationId),
  results: product.results,
})

export const hydrateOrganizationAssemblies = async (rows: Assembly[], organizationId: string) => {
  const productIds = [...new Set(rows.flatMap((row) => productIdsFromRefs(row.products)))]
  const productRows =
    productIds.length > 0
      ? await dbConnection.select().from(models.products).where(inArray(models.products.id, productIds))
      : []
  const productsById = new Map(productRows.map((product) => [product.id, product]))

  const epdIds = new Set<string>()
  for (const product of productRows) {
    for (const item of impactRefsFromProduct(product.impactData)) {
      if (!isReference(item)) continue
      const id = catalogIdFromUri(item.uri)
      if (id) epdIds.add(id)
    }
  }

  const epdRows =
    epdIds.size > 0
      ? await dbConnection
          .select()
          .from(models.epds)
          .where(inArray(models.epds.id, [...epdIds]))
      : []
  const epdsByKey = new Map(epdRows.map((epd) => [`${epd.id}:${epd.version}`, epd]))

  return rows.map((row) => {
    const products = productIdsFromRefs(row.products).flatMap((productId) => {
      const product = productsById.get(productId)
      if (!product) return []
      if (!isVisibleToOrganization(product, organizationId)) return []
      return [mapProduct(product, epdsByKey, organizationId)]
    })

    return {
      ...row,
      classification: row.classification ?? [],
      productCount: productIdsFromRefs(row.products).length,
      products,
    }
  })
}

export const getOrganizationAssembliesResolver = async (_source, _args, context: GraphQLContext) => {
  const organizationId = requireOrganizationSession(context)
  const rows = await dbConnection
    .select()
    .from(models.assemblies)
    .where(eq(models.assemblies.organizationId, organizationId))
    .orderBy(asc(models.assemblies.name))
  return hydrateOrganizationAssemblies(rows, organizationId)
}

export const getOrganizationAssemblyResolver = async (_source, args, context: GraphQLContext) => {
  const organizationId = requireOrganizationSession(context)
  const { id } = args
  if (!UUID_RE.test(id)) return null

  const rows = await dbConnection
    .select()
    .from(models.assemblies)
    .where(and(eq(models.assemblies.id, id), eq(models.assemblies.organizationId, organizationId)))
  if (rows.length === 0) return null

  const [assembly] = await hydrateOrganizationAssemblies(rows, organizationId)
  return assembly
}
