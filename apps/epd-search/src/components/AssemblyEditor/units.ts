import type { Unit } from 'lcax'

export const LCAX_UNITS = [
  'm',
  'm2',
  'm3',
  'kg',
  'tones',
  'pcs',
  'kwh',
  'l',
  'm2r1',
  'km',
  'tones_km',
  'kgm3',
  'unknown',
] as const satisfies readonly Unit[]

const UNIT_SET = new Set<string>(LCAX_UNITS)

export const toLcaxUnit = (unit: string | null | undefined): Unit => {
  if (!unit) return 'unknown'
  const normalized = unit.toLowerCase()
  return UNIT_SET.has(normalized) ? (normalized as Unit) : 'unknown'
}

export const unitSelectOptions = LCAX_UNITS.filter((unit) => unit !== 'unknown').map((unit) => ({
  value: unit,
  label: unit,
}))
