import { describe, expect, it } from 'vitest'
import { createEmptyProduct } from './editorState'
import { formatGwpLabel, toLcaxProduct, toLcaxUnit } from './liveGwp'
import type { EditorEpd } from './types'

const epd: EditorEpd = {
  id: 'd61fc8da-1a0d-4baa-a0fa-194c1f8a5218',
  name: 'Test fase (A1-A3)',
  version: '00.02.000',
  declaredUnit: 'm3',
  publishedDate: '1970-01-01',
  referenceServiceLife: null,
  impacts: { gwp: { a1a3: 818 } },
}

describe('toLcaxUnit', () => {
  it('maps GraphQL enum names to lcax units', () => {
    expect(toLcaxUnit('PCS')).toBe('pcs')
    expect(toLcaxUnit('M2')).toBe('m2')
    expect(toLcaxUnit('TONES_KM')).toBe('tones_km')
    expect(toLcaxUnit('pcs')).toBe('pcs')
  })

  it('falls back to unknown for empty or invalid units', () => {
    expect(toLcaxUnit(null)).toBe('unknown')
    expect(toLcaxUnit('nope')).toBe('unknown')
  })
})

describe('formatGwpLabel', () => {
  it('formats numbers to two decimals and uses an em dash when missing', () => {
    expect(formatGwpLabel(12.345)).toBe('12.35')
    expect(formatGwpLabel(null)).toBe('—')
    expect(formatGwpLabel(Number.NaN)).toBe('—')
  })
})

describe('toLcaxProduct', () => {
  it('returns null when there are no resolved EPDs', () => {
    expect(toLcaxProduct(createEmptyProduct())).toBeNull()
    expect(
      toLcaxProduct({
        ...createEmptyProduct(),
        impactData: [{ id: 'missing', version: '1', epd: null }],
      }),
    ).toBeNull()
  })

  it('inlines resolved EPDs and skips holes', () => {
    const product = toLcaxProduct({
      ...createEmptyProduct(),
      id: 'prod-1',
      name: 'Test produkt',
      quantity: 0.5,
      unit: 'kg',
      referenceServiceLife: 80,
      impactData: [
        { id: epd.id, version: epd.version, epd },
        { id: 'missing', version: '9', epd: null },
      ],
    })
    expect(product).not.toBeNull()
    expect(product?.impactData).toHaveLength(1)
    expect(product?.impactData[0]).toMatchObject({ type: 'EPD', id: epd.id, version: epd.version })
  })
})
