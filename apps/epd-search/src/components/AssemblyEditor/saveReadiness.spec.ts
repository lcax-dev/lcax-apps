import { describe, expect, it } from 'vitest'
import { createEmptyEditorState, createEmptyProduct } from './editorState'
import { canCompleteSave, canSaveDraft, hasBrokenEpdRefs, hasEmptyProducts } from './saveReadiness'
import type { EditorEpd, EditorProduct } from './types'

const epd: EditorEpd = {
  id: 'epd-1',
  name: 'CLT',
  version: '1',
  declaredUnit: 'm2',
  publishedDate: '2024-01-01',
  referenceServiceLife: 50,
  impacts: { gwp: { a1a3: 1 } },
}

const completeProduct = (): EditorProduct => ({
  ...createEmptyProduct(),
  name: 'Insulation',
  impactData: [{ id: epd.id, version: epd.version, epd }],
})

describe('canSaveDraft', () => {
  it('requires a name and allows empty or broken composition', () => {
    const empty = createEmptyEditorState()
    expect(canSaveDraft(empty)).toBe(false)
    expect(canSaveDraft({ ...empty, name: '  Wall  ' })).toBe(true)
    expect(
      canSaveDraft({
        ...empty,
        name: 'Wall',
        products: [
          {
            ...createEmptyProduct(),
            impactData: [{ id: 'missing', version: '9', epd: null }],
          },
        ],
      }),
    ).toBe(true)
  })
})

describe('canCompleteSave', () => {
  it('is disabled for unnamed, empty products, empty EPD lists, or holes', () => {
    const named = { ...createEmptyEditorState(), name: 'Wall' }
    expect(canCompleteSave(named)).toBe(false)
    expect(hasEmptyProducts(named)).toBe(true)

    const emptyProduct = { ...named, products: [createEmptyProduct()] }
    expect(canCompleteSave(emptyProduct)).toBe(false)
    expect(hasEmptyProducts(emptyProduct)).toBe(true)

    const hole = {
      ...named,
      products: [
        {
          ...createEmptyProduct(),
          impactData: [{ id: 'missing', version: '9', epd: null }],
        },
      ],
    }
    expect(hasBrokenEpdRefs(hole)).toBe(true)
    expect(canCompleteSave(hole)).toBe(false)

    expect(canCompleteSave({ ...named, products: [completeProduct()] })).toBe(true)
  })
})
