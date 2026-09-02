import { SearchQuery } from '@/queries/generated/graphql.ts'

export type SearchHit = SearchQuery['search'][number]

export type SearchResultCardModel = {
  id: string
  href: string
  kind: 'EPD' | 'Assembly'
  name: string
  unit?: string | null
  subtype?: string | null
  manufacturer?: string | null
  location?: string | null
  classification?: string | null
}

const manufacturerFromMeta = (metaData: unknown): string => {
  if (metaData && typeof metaData === 'object' && 'manufacturer' in metaData) {
    const manufacturer = (metaData as { manufacturer?: unknown }).manufacturer
    if (typeof manufacturer === 'string' && manufacturer.trim()) return manufacturer
  }
  return 'Unknown'
}

export const toSearchResultCard = (hit: SearchHit): SearchResultCardModel | null => {
  if (hit.__typename === 'EPD') {
    if (!hit.epdId) return null
    return {
      id: hit.epdId,
      href: `/epds/${hit.epdId}`,
      kind: 'EPD',
      name: hit.epdName || 'Untitled EPD',
      unit: hit.declaredUnit,
      subtype: hit.subtype,
      manufacturer: manufacturerFromMeta(hit.metaData),
      location: hit.location,
    }
  }

  if (hit.__typename === 'Assembly') {
    const classification = hit.classification.find((entry) => entry?.name)?.name ?? null
    return {
      id: hit.assemblyId,
      href: `/assemblies/${hit.assemblyId}`,
      kind: 'Assembly',
      name: hit.assemblyName || 'Untitled Assembly',
      unit: hit.unit,
      classification,
    }
  }

  return null
}
