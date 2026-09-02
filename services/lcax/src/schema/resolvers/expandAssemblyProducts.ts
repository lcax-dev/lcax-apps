import { and, desc, inArray, type SQL } from 'drizzle-orm'
import type { GraphQLResolveInfo, SelectionNode } from 'graphql'
import type { ImpactData, Product as LCAxProduct, ProductReference, Reference } from 'lcax'
import { dbConnection } from '@/config/database'
import * as models from '@/models'
import type { EPD, Product } from '@/models/types'
import type { GraphQLContext } from '@/schema/context'
import { visibilityFilter } from '@/schema/utils/visibility'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

type CatalogId = string
type AssemblyWithProducts = {
  id?: string
  products?: unknown
}

const catalogIdFromUri = (uri: string | null | undefined): CatalogId | undefined => {
  if (!uri) return undefined
  return UUID_RE.test(uri) ? uri : undefined
}

const isReference = (value: { type?: string } | null | undefined): value is { type: 'reference' } & Reference =>
  value?.type === 'reference'

const isInlineProduct = (value: ProductReference): value is { type: 'product' } & LCAxProduct =>
  value.type === 'product'

const combineSql = (...parts: (SQL | undefined)[]): SQL | undefined => {
  const defined = parts.filter((part): part is SQL => part !== undefined)
  if (defined.length === 0) return undefined
  if (defined.length === 1) return defined[0]
  return and(...defined)
}

export const selectionIncludesField = (info: GraphQLResolveInfo | null | undefined, fieldName: string): boolean => {
  if (!info?.fieldNodes) return false

  const visit = (selections: readonly SelectionNode[]): boolean => {
    for (const selection of selections) {
      if (selection.kind === 'Field') {
        if (selection.name.value === fieldName) return true
        if (selection.selectionSet && visit(selection.selectionSet.selections)) return true
      } else if (selection.kind === 'InlineFragment' && selection.selectionSet) {
        if (visit(selection.selectionSet.selections)) return true
      } else if (selection.kind === 'FragmentSpread') {
        const fragment = info.fragments[selection.name.value]
        if (fragment && visit(fragment.selectionSet.selections)) return true
      }
    }
    return false
  }

  return info.fieldNodes.some((node) => node.selectionSet && visit(node.selectionSet.selections))
}

const collectImpactEpdIds = (impactData: ImpactData[] | null | undefined, epdIds: Set<CatalogId>) => {
  for (const item of impactData ?? []) {
    if (isReference(item)) {
      const id = catalogIdFromUri(item.uri)
      if (id) epdIds.add(id)
    }
  }
}

const fetchVisibleProducts = async (ids: CatalogId[], context: GraphQLContext): Promise<Map<CatalogId, Product>> => {
  if (ids.length === 0) return new Map()

  const visibilitySql = visibilityFilter(models.products, context)
  const whereSql = combineSql(inArray(models.products.id, ids), visibilitySql)
  let query = dbConnection.select().from(models.products).$dynamic()
  if (whereSql) {
    query = query.where(whereSql)
  }
  const rows = await query
  return new Map(rows.map((row) => [row.id, row]))
}

const fetchVisibleEpds = async (ids: CatalogId[], context: GraphQLContext): Promise<Map<CatalogId, EPD>> => {
  if (ids.length === 0) return new Map()

  const visibilitySql = visibilityFilter(models.epds, context)
  const whereSql = combineSql(inArray(models.epds.id, ids), visibilitySql)
  let query = dbConnection.select().from(models.epds).$dynamic()
  if (whereSql) {
    query = query.where(whereSql)
  }
  const rows = await query.orderBy(desc(models.epds.publishedDate))
  const byId = new Map<CatalogId, EPD>()
  for (const row of rows) {
    if (!byId.has(row.id)) {
      byId.set(row.id, row)
    }
  }
  return byId
}

const filterImpactData = (impactData: ImpactData[] | null | undefined, catalogEpds: Map<CatalogId, EPD>) => {
  const expanded: unknown[] = []
  for (const item of impactData ?? []) {
    if (isReference(item)) {
      const id = catalogIdFromUri(item.uri)
      if (!id) continue
      const epd = catalogEpds.get(id)
      if (epd) expanded.push(epd)
      continue
    }
    expanded.push(item)
  }
  return expanded
}

const expandProducts = (
  refs: ProductReference[],
  catalogProducts: Map<CatalogId, Product>,
  catalogEpds: Map<CatalogId, EPD>,
) => {
  const expanded: unknown[] = []
  for (const ref of refs) {
    if (isInlineProduct(ref)) {
      expanded.push({
        ...ref,
        type: 'product',
        impactData: filterImpactData(ref.impactData, catalogEpds),
      })
      continue
    }
    if (isReference(ref)) {
      const id = catalogIdFromUri(ref.uri)
      if (!id) continue
      const product = catalogProducts.get(id)
      if (!product) continue
      expanded.push({
        ...product,
        type: 'product',
        impactData: filterImpactData(product.impactData, catalogEpds),
      })
    }
  }
  return expanded
}

export const expandAssemblyProducts = async <T extends AssemblyWithProducts>(
  rows: T[],
  context: GraphQLContext,
): Promise<(T & { products: unknown[]; type: string })[]> => {
  const productIds = new Set<CatalogId>()
  const epdIds = new Set<CatalogId>()

  for (const row of rows) {
    for (const ref of (row.products ?? []) as ProductReference[]) {
      if (isReference(ref)) {
        const id = catalogIdFromUri(ref.uri)
        if (id) productIds.add(id)
      } else if (isInlineProduct(ref)) {
        collectImpactEpdIds(ref.impactData, epdIds)
      }
    }
  }

  const catalogProducts = await fetchVisibleProducts([...productIds], context)
  for (const product of catalogProducts.values()) {
    collectImpactEpdIds(product.impactData, epdIds)
  }
  const catalogEpds = await fetchVisibleEpds([...epdIds], context)

  return rows.map((row) => ({
    ...row,
    type: 'assembly',
    products: expandProducts((row.products ?? []) as ProductReference[], catalogProducts, catalogEpds),
  }))
}
