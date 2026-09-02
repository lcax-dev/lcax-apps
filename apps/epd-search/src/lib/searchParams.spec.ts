import { describe, expect, it } from 'vitest'
import { kindsForQuery, parseKinds, parseUnit, setKindsParam, setUnitParam, toggleKind } from './searchParams'

describe('parseKinds', () => {
  it('treats a missing kinds param as none selected', () => {
    expect(parseKinds(new URLSearchParams())).toEqual([])
  })

  it('parses repeated kinds params and ignores Product', () => {
    const params = new URLSearchParams('kinds=EPD&kinds=PRODUCT&kinds=ASSEMBLY')
    expect(parseKinds(params)).toEqual(['EPD', 'ASSEMBLY'])
  })

  it('parses comma-separated kinds case-insensitively', () => {
    expect(parseKinds(new URLSearchParams('kinds=assembly,epd'))).toEqual(['EPD', 'ASSEMBLY'])
  })
})

describe('kindsForQuery', () => {
  it('omits kinds when none or both types are selected', () => {
    expect(kindsForQuery([])).toBeUndefined()
    expect(kindsForQuery(['EPD', 'ASSEMBLY'])).toBeUndefined()
  })

  it('sends a single selected kind to the search query', () => {
    expect(kindsForQuery(['ASSEMBLY'])).toEqual(['ASSEMBLY'])
  })
})

describe('toggleKind', () => {
  it('selects and deselects a kind without adding Product', () => {
    expect(toggleKind([], 'ASSEMBLY')).toEqual(['ASSEMBLY'])
    expect(toggleKind(['ASSEMBLY'], 'EPD')).toEqual(['EPD', 'ASSEMBLY'])
    expect(toggleKind(['EPD', 'ASSEMBLY'], 'EPD')).toEqual(['ASSEMBLY'])
  })
})

describe('setKindsParam', () => {
  it('writes selected kinds and clears them when none remain', () => {
    const params = new URLSearchParams('q=timber')
    setKindsParam(params, ['ASSEMBLY'])
    expect(params.getAll('kinds')).toEqual(['ASSEMBLY'])
    setKindsParam(params, [])
    expect(params.getAll('kinds')).toEqual([])
    expect(params.get('q')).toBe('timber')
  })
})

describe('unit param', () => {
  it('reads unit and falls back to declaredUnit as a legacy alias', () => {
    expect(parseUnit(new URLSearchParams('unit=M2'))).toBe('M2')
    expect(parseUnit(new URLSearchParams('declaredUnit=KG'))).toBe('KG')
    expect(parseUnit(new URLSearchParams('unit=M2&declaredUnit=KG'))).toBe('M2')
  })

  it('writes the merged unit param and drops the declaredUnit alias', () => {
    const params = new URLSearchParams('declaredUnit=KG')
    setUnitParam(params, 'M2')
    expect(params.get('unit')).toBe('M2')
    expect(params.get('declaredUnit')).toBeNull()
  })
})
