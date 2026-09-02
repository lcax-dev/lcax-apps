import { calculateAssembly, calculateProduct, impactCategories, lifeCycleModules } from 'lcax'
import type { Assembly, EPD, Impacts, Product } from 'lcax'
import { toLcaxUnit } from './units'
import type { EditorAssemblyState, EditorEpd, EditorProduct } from './types'

export { formatGwpLabel } from './formatGwpLabel'
export { toLcaxUnit } from './units'

const calculationOptions = () => ({
  referenceStudyPeriod: null,
  lifeCycleModules: lifeCycleModules(),
  impactCategories: impactCategories(),
  overwriteExistingResults: true,
})

const toInlineEpd = (epd: EditorEpd): { type: 'EPD' } & EPD =>
  ({
    type: 'EPD',
    id: epd.id,
    name: epd.name,
    declaredUnit: toLcaxUnit(epd.declaredUnit),
    version: epd.version,
    publishedDate: epd.publishedDate ?? '1970-01-01',
    validUntil: epd.publishedDate ?? '1970-01-01',
    source: null,
    referenceServiceLife: epd.referenceServiceLife,
    standard: 'unknown',
    comment: null,
    location: 'unknown',
    subtype: 'generic',
    conversions: null,
    impacts: (epd.impacts ?? {}) as Impacts,
    metaData: null,
  }) as { type: 'EPD' } & EPD

export const toLcaxProduct = (product: EditorProduct): Product | null => {
  const impactData = product.impactData.flatMap((item) => (item.epd ? [toInlineEpd(item.epd)] : []))
  if (impactData.length === 0) return null
  return {
    id: product.id ?? product.key,
    name: product.name.trim() || 'Untitled product',
    description: product.description || null,
    referenceServiceLife: product.referenceServiceLife ?? 0,
    impactData,
    quantity: product.quantity,
    unit: toLcaxUnit(product.unit),
    transport: null,
    results: null,
    metaData: null,
  }
}

export const toLcaxAssembly = (state: EditorAssemblyState): Assembly | null => {
  const products = state.products.flatMap((product) => {
    const lcaxProduct = toLcaxProduct(product)
    if (!lcaxProduct) return []
    return [{ type: 'product' as const, ...lcaxProduct }]
  })
  if (products.length === 0) return null
  return {
    id: state.id ?? 'new-assembly',
    name: state.name.trim() || 'Untitled assembly',
    description: state.description || null,
    comment: state.comment || null,
    quantity: state.quantity,
    unit: toLcaxUnit(state.unit),
    classification: state.classification.map((row) => ({
      name: row.name,
      system: row.system,
      code: row.code,
    })),
    products,
    results: null,
    metaData: null,
  }
}

const gwpFromImpacts = (impacts: Impacts | null | undefined): number | null => {
  const value = impacts?.gwp?.a1a3
  if (value == null || Number.isNaN(value)) return null
  return value
}

export const liveProductGwp = (product: EditorProduct): number | null => {
  const lcaxProduct = toLcaxProduct(product)
  if (!lcaxProduct) return null
  try {
    return gwpFromImpacts(calculateProduct(lcaxProduct, calculationOptions()))
  } catch {
    return null
  }
}

export const liveAssemblyResults = (state: EditorAssemblyState): Impacts | null => {
  const assembly = toLcaxAssembly(state)
  if (!assembly) return null
  try {
    return calculateAssembly(assembly, calculationOptions())
  } catch {
    return null
  }
}

export const liveAssemblyGwp = (state: EditorAssemblyState): number | null => gwpFromImpacts(liveAssemblyResults(state))
