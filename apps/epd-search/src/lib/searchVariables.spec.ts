import { describe, expect, it } from 'vitest'
import { LcAxKind, UnitEnum } from '@/queries/generated/graphql.ts'
import { buildSearchVariables } from './searchVariables'

describe('buildSearchVariables', () => {
  it('defaults to both types, limit 50, and no where when the URL is empty', () => {
    expect(buildSearchVariables(new URLSearchParams())).toEqual({
      q: undefined,
      kinds: undefined,
      where: undefined,
      limit: 50,
    })
  })

  it('sends a single kind chip and keeps EPD-only filters in the union where', () => {
    const params = new URLSearchParams('q=timber&kinds=ASSEMBLY&standard=EN15804_A2&classification=walls')
    expect(buildSearchVariables(params)).toEqual({
      q: 'timber',
      kinds: [LcAxKind.Assembly],
      where: {
        standard: { eq: 'EN15804_A2' },
        classification: { contains: 'walls' },
      },
      limit: 50,
    })
  })

  it('maps the merged unit param, including the declaredUnit alias', () => {
    expect(buildSearchVariables(new URLSearchParams('unit=M2')).where).toEqual({
      unit: { eq: UnitEnum.M2 },
    })
    expect(buildSearchVariables(new URLSearchParams('declaredUnit=KG')).where).toEqual({
      unit: { eq: UnitEnum.Kg },
    })
  })

  it('omits kinds when none or both chips are selected', () => {
    expect(buildSearchVariables(new URLSearchParams('kinds=EPD&kinds=ASSEMBLY')).kinds).toBeUndefined()
  })
})
