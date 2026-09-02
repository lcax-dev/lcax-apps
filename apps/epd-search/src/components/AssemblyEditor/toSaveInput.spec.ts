import { describe, expect, it } from 'vitest'
import { createEmptyEditorState, createEmptyProduct } from './editorState'
import { toSaveOrganizationAssemblyInput } from './toSaveInput'
import type { EditorEpd } from './types'

const epd: EditorEpd = {
  id: 'epd-1',
  name: 'CLT',
  version: '3',
  declaredUnit: 'm2',
  publishedDate: '2024-01-01',
  referenceServiceLife: 50,
  impacts: { gwp: { a1a3: 1.2 } },
}

describe('toSaveOrganizationAssemblyInput', () => {
  it('maps draft fields, omits new product ids, and does not send results', () => {
    const state = {
      ...createEmptyEditorState(),
      name: 'Wall',
      description: 'desc',
      comment: 'note',
      classification: [
        { name: 'Walls', system: 'LCAByg', code: '1' },
        { name: '', system: '', code: '' },
      ],
      products: [
        {
          ...createEmptyProduct(),
          id: null,
          name: 'Insulation',
          quantity: 2,
          unit: 'm2',
          impactData: [
            { id: epd.id, version: epd.version, epd },
            { id: 'missing', version: '9', epd: null },
          ],
        },
      ],
    }

    const input = toSaveOrganizationAssemblyInput(state, { kind: 'DRAFT' })
    expect(input.id).toBeUndefined()
    expect(input.kind).toBe('DRAFT')
    expect(input.visibility).toBeUndefined()
    expect(input.results).toBeUndefined()
    expect(input.assembly.classification).toEqual([{ name: 'Walls', system: 'LCAByg', code: '1' }])
    expect(input.assembly.products?.[0]?.id).toBeUndefined()
    expect(input.assembly.products?.[0]?.impactData).toEqual([
      { id: 'epd-1', version: '3' },
      { id: 'missing', version: '9' },
    ])
  })

  it('maps complete save with visibility, client results, and existing product ids', () => {
    const results = { gwp: { a1a3: 4.2 } }
    const state = {
      ...createEmptyEditorState(),
      id: 'asm-1',
      name: 'Wall',
      products: [
        {
          ...createEmptyProduct(),
          id: 'prod-1',
          name: 'Insulation',
          impactData: [{ id: epd.id, version: epd.version, epd }],
        },
      ],
    }

    const input = toSaveOrganizationAssemblyInput(state, {
      kind: 'COMPLETE',
      visibility: 'Public',
      confirmForcePublish: true,
      results,
    })
    expect(input.id).toBe('asm-1')
    expect(input.kind).toBe('COMPLETE')
    expect(input.visibility).toBe('Public')
    expect(input.confirmForcePublish).toBe(true)
    expect(input.results).toEqual(results)
    expect(input.assembly.products?.[0]?.id).toBe('prod-1')
  })
})
