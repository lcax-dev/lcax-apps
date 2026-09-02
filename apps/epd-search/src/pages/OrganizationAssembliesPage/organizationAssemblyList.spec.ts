import { describe, expect, it } from 'vitest'
import { organizationAssemblyGwpLabel, organizationAssemblyStatusLabel } from './organizationAssemblyList'

describe('organizationAssemblyStatusLabel', () => {
  it('labels incomplete assemblies as Draft', () => {
    expect(organizationAssemblyStatusLabel({ incomplete: true, visibility: 'Private' })).toBe('Draft')
    expect(organizationAssemblyStatusLabel({ incomplete: true, visibility: 'Public' })).toBe('Draft')
  })

  it('labels complete assemblies from visibility', () => {
    expect(organizationAssemblyStatusLabel({ incomplete: false, visibility: 'Public' })).toBe('Public')
    expect(organizationAssemblyStatusLabel({ incomplete: false, visibility: 'Private' })).toBe('Private')
  })
})

describe('organizationAssemblyGwpLabel', () => {
  it('uses an em dash for drafts even when results exist', () => {
    expect(
      organizationAssemblyGwpLabel({
        incomplete: true,
        results: { gwp: { a1a3: 12.34 } },
      }),
    ).toBe('—')
  })

  it('formats persisted GWP for complete assemblies', () => {
    expect(
      organizationAssemblyGwpLabel({
        incomplete: false,
        results: { gwp: { a1a3: 12.345 } },
      }),
    ).toBe('12.35')
  })

  it('uses an em dash when complete assemblies have no GWP', () => {
    expect(organizationAssemblyGwpLabel({ incomplete: false, results: null })).toBe('—')
    expect(organizationAssemblyGwpLabel({ incomplete: false, results: { gwp: { a1a3: null } } })).toBe('—')
  })
})
