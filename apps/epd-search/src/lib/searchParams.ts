export const LCAX_KINDS = ['EPD', 'ASSEMBLY'] as const

export type LCAxKindParam = (typeof LCAX_KINDS)[number]

const isLCAxKind = (value: string): value is LCAxKindParam => value === 'EPD' || value === 'ASSEMBLY'

export const parseKinds = (searchParams: URLSearchParams): LCAxKindParam[] => {
  const unique = new Set<LCAxKindParam>()
  for (const value of searchParams.getAll('kinds')) {
    for (const part of value.split(',')) {
      const kind = part.trim().toUpperCase()
      if (isLCAxKind(kind)) unique.add(kind)
    }
  }
  return LCAX_KINDS.filter((kind) => unique.has(kind))
}

export const kindsForQuery = (kinds: LCAxKindParam[]): LCAxKindParam[] | undefined => {
  if (kinds.length === 0 || kinds.length === LCAX_KINDS.length) return undefined
  return kinds
}

export const toggleKind = (selected: LCAxKindParam[], kind: LCAxKindParam): LCAxKindParam[] => {
  if (selected.includes(kind)) return selected.filter((value) => value !== kind)
  return LCAX_KINDS.filter((value) => value === kind || selected.includes(value))
}

export const setKindsParam = (params: URLSearchParams, kinds: LCAxKindParam[]): void => {
  params.delete('kinds')
  for (const kind of kinds) {
    params.append('kinds', kind)
  }
}

export const parseUnit = (searchParams: URLSearchParams): string => {
  return searchParams.get('unit') || searchParams.get('declaredUnit') || ''
}

export const setUnitParam = (params: URLSearchParams, unit: string | null): void => {
  params.delete('declaredUnit')
  if (unit) {
    params.set('unit', unit)
  } else {
    params.delete('unit')
  }
}
