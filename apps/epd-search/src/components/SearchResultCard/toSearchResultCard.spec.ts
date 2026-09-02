import { describe, expect, it } from 'vitest'
import { CountryEnum, SubTypeEnum, UnitEnum } from '@/queries/generated/graphql.ts'
import { toSearchResultCard } from './toSearchResultCard'

describe('toSearchResultCard', () => {
  it('maps an EPD hit to the shared card model and EPD detail link', () => {
    expect(
      toSearchResultCard({
        __typename: 'EPD',
        epdId: 'epd-1',
        epdName: 'Timber EPD',
        declaredUnit: UnitEnum.M3,
        location: CountryEnum.Dnk,
        subtype: SubTypeEnum.Specific,
        metaData: { manufacturer: 'Wood Co' },
      }),
    ).toEqual({
      id: 'epd-1',
      href: '/epds/epd-1',
      kind: 'EPD',
      name: 'Timber EPD',
      unit: UnitEnum.M3,
      subtype: SubTypeEnum.Specific,
      manufacturer: 'Wood Co',
      location: CountryEnum.Dnk,
    })
  })

  it('omits EPDs without an id', () => {
    expect(
      toSearchResultCard({
        __typename: 'EPD',
        epdId: null,
        epdName: 'Missing',
        declaredUnit: null,
        location: null,
        subtype: null,
        metaData: null,
      }),
    ).toBeNull()
  })

  it('maps an Assembly hit using the first classification name', () => {
    expect(
      toSearchResultCard({
        __typename: 'Assembly',
        assemblyId: 'asm-1',
        assemblyName: 'Timber wall',
        unit: UnitEnum.M2,
        classification: [{ name: 'Walls' }, { name: 'External' }],
      }),
    ).toEqual({
      id: 'asm-1',
      href: '/assemblies/asm-1',
      kind: 'Assembly',
      name: 'Timber wall',
      unit: UnitEnum.M2,
      classification: 'Walls',
    })
  })
})
