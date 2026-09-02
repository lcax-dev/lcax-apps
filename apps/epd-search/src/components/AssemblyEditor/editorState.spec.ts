import { describe, expect, it } from 'vitest'
import {
  applyFirstEpdDefaults,
  createEmptyEditorState,
  createEmptyProduct,
  editorStateFromQuery,
  isEditorDirty,
} from './editorState'
import type { EditorEpd, OrganizationAssemblyQueryData } from './types'

const firstEpd: EditorEpd = {
  id: 'epd-1',
  name: 'CLT panel',
  version: '3',
  declaredUnit: 'M2',
  publishedDate: '2024-01-01',
  referenceServiceLife: 80,
  impacts: { gwp: { a1a3: 1.2 } },
}

describe('createEmptyEditorState', () => {
  it('defaults assembly quantity 1 and unit pcs with no products', () => {
    const state = createEmptyEditorState()
    expect(state.name).toBe('')
    expect(state.quantity).toBe(1)
    expect(state.unit).toBe('pcs')
    expect(state.products).toEqual([])
  })
})

describe('createEmptyProduct', () => {
  it('defaults product quantity to 1', () => {
    const product = createEmptyProduct()
    expect(product.quantity).toBe(1)
    expect(product.name).toBe('')
    expect(product.unit).toBe('')
    expect(product.referenceServiceLife).toBeNull()
    expect(product.impactData).toEqual([])
  })
})

describe('editorStateFromQuery', () => {
  it('keeps broken EPD refs as holes', () => {
    const data: OrganizationAssemblyQueryData = {
      id: 'asm-1',
      name: 'Wall',
      description: 'desc',
      comment: 'note',
      quantity: 2,
      unit: 'M2',
      visibility: 'Private',
      incomplete: true,
      classification: [{ name: 'Walls', system: 'LCAByg', code: '1' }],
      products: [
        {
          id: 'prod-1',
          name: 'Insulation',
          description: null,
          quantity: 3,
          unit: 'm3',
          referenceServiceLife: 50,
          classification: [],
          impactData: [
            { id: 'epd-1', version: '1.0', epd: firstEpd },
            { id: 'missing', version: '9', epd: null },
          ],
        },
      ],
    }

    const state = editorStateFromQuery(data)
    expect(state.unit).toBe('m2')
    expect(state.products[0].impactData).toHaveLength(2)
    expect(state.products[0].impactData[1]).toEqual({ id: 'missing', version: '9', epd: null })
  })
})

describe('applyFirstEpdDefaults', () => {
  it('fills name, unit, and RSL from the first EPD when those fields are empty', () => {
    const product = applyFirstEpdDefaults(createEmptyProduct(), firstEpd)
    expect(product.name).toBe('CLT panel')
    expect(product.unit).toBe('m2')
    expect(product.referenceServiceLife).toBe(80)
  })

  it('does not overwrite fields the member already set', () => {
    const product = applyFirstEpdDefaults(
      { ...createEmptyProduct(), name: 'Mine', unit: 'kg', referenceServiceLife: 10 },
      firstEpd,
    )
    expect(product.name).toBe('Mine')
    expect(product.unit).toBe('kg')
    expect(product.referenceServiceLife).toBe(10)
  })
})

describe('isEditorDirty', () => {
  it('is clean for an untouched empty editor and dirty after a name change', () => {
    const empty = createEmptyEditorState()
    expect(isEditorDirty(empty, empty)).toBe(false)
    expect(isEditorDirty({ ...empty, name: 'Wall' }, empty)).toBe(true)
  })
})
