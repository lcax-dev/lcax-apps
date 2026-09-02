import { describe, expect, it } from 'vitest'
import { addImpactEpd } from './addImpactEpd'
import type { EditorImpactRef } from './types'

const existing: EditorImpactRef[] = [
  {
    id: 'epd-1',
    version: '1.0',
    epd: {
      id: 'epd-1',
      name: 'Concrete',
      version: '1.0',
      declaredUnit: 'm3',
      publishedDate: '2024-01-01',
      referenceServiceLife: 50,
      impacts: null,
    },
  },
]

describe('addImpactEpd', () => {
  it('appends a new id and version', () => {
    const next = addImpactEpd(existing, {
      id: 'epd-1',
      name: 'Concrete',
      version: '2.0',
      declaredUnit: 'm3',
      publishedDate: '2025-01-01',
      referenceServiceLife: 50,
      impacts: null,
    })
    expect(next).toHaveLength(2)
    expect(next[1]).toMatchObject({ id: 'epd-1', version: '2.0' })
  })

  it('is a no-op when the same id and version are already attached', () => {
    const candidate = {
      id: 'epd-1',
      name: 'Concrete',
      version: '1.0',
      declaredUnit: 'm3',
      publishedDate: '2024-01-01',
      referenceServiceLife: 50,
      impacts: null,
    }
    expect(addImpactEpd(existing, candidate)).toEqual(existing)
  })
})
