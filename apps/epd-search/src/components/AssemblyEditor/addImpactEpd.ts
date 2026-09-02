import type { EditorEpd, EditorImpactRef } from './types'

export const impactKey = (id: string, version: string): string => `${id}::${version}`

export const addImpactEpd = (existing: EditorImpactRef[], epd: EditorEpd): EditorImpactRef[] => {
  const alreadyAttached = existing.some((item) => item.id === epd.id && item.version === epd.version)
  if (alreadyAttached) return existing
  return [...existing, { id: epd.id, version: epd.version, epd }]
}

export const typeaheadEpdToEditorEpd = (epd: {
  id?: string | null
  name?: string | null
  version?: string | null
  publishedDate?: string | null
  declaredUnit?: string | null
  referenceServiceLife?: number | null
  impacts?: EditorEpd['impacts']
}): EditorEpd | null => {
  if (!epd.id || !epd.version) return null
  return {
    id: epd.id,
    name: epd.name?.trim() || epd.id,
    version: epd.version,
    declaredUnit: epd.declaredUnit ?? null,
    publishedDate: epd.publishedDate ?? null,
    referenceServiceLife: epd.referenceServiceLife ?? null,
    impacts: epd.impacts ?? null,
  }
}
