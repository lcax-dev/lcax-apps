import { describe, expect, it } from 'vitest'
import { toAssemblyProductRows } from './toAssemblyProductRows'

describe('toAssemblyProductRows', () => {
  it('maps product name, quantity, and unit', () => {
    expect(toAssemblyProductRows([{ id: 'p1', name: 'CLT panel', quantity: 2.5, unit: 'M2', impactData: [] }])).toEqual(
      [
        {
          key: 'p1',
          name: 'CLT panel',
          quantity: 2.5,
          unit: 'M2',
          impactEpds: [],
        },
      ],
    )
  })

  it('links a nested impact EPD only when it has an id', () => {
    expect(
      toAssemblyProductRows([
        {
          id: 'p1',
          name: 'Insulation',
          quantity: 1,
          unit: 'M3',
          impactData: [
            { id: 'epd-public', name: 'Visible EPD' },
            { id: null, name: 'Hidden EPD' },
            { name: 'No id' },
            null,
          ],
        },
      ]),
    ).toEqual([
      {
        key: 'p1',
        name: 'Insulation',
        quantity: 1,
        unit: 'M3',
        impactEpds: [{ id: 'epd-public', name: 'Visible EPD', href: '/epds/epd-public' }],
      },
    ])
  })

  it('returns an empty list for missing products', () => {
    expect(toAssemblyProductRows(null)).toEqual([])
    expect(toAssemblyProductRows(undefined)).toEqual([])
    expect(toAssemblyProductRows([null])).toEqual([])
  })
})
