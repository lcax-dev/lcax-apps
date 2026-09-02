import { describe, expect, it } from 'vitest'
import { groupLatestEpds } from './groupLatestEpds'

describe('groupLatestEpds', () => {
  it('keeps one hit per id using the latest publishedDate and pins that version', () => {
    expect(
      groupLatestEpds([
        { id: 'epd-1', name: 'Concrete v1', version: '1.0', publishedDate: '2020-01-01' },
        { id: 'epd-1', name: 'Concrete v2', version: '2.0', publishedDate: '2024-06-01' },
        { id: 'epd-2', name: 'Steel', version: '1.0', publishedDate: '2023-01-01' },
      ]),
    ).toEqual([
      { id: 'epd-1', name: 'Concrete v2', version: '2.0', publishedDate: '2024-06-01' },
      { id: 'epd-2', name: 'Steel', version: '1.0', publishedDate: '2023-01-01' },
    ])
  })

  it('treats missing publishedDate as older than a dated version', () => {
    expect(
      groupLatestEpds([
        { id: 'epd-1', name: 'Undated', version: '0', publishedDate: null },
        { id: 'epd-1', name: 'Dated', version: '1', publishedDate: '2021-01-01' },
      ]),
    ).toEqual([{ id: 'epd-1', name: 'Dated', version: '1', publishedDate: '2021-01-01' }])
  })

  it('drops hits without an id', () => {
    expect(
      groupLatestEpds([
        { id: null, name: 'No id', version: '1', publishedDate: '2024-01-01' },
        { id: 'epd-1', name: 'Keep', version: '1', publishedDate: '2024-01-01' },
      ]),
    ).toEqual([{ id: 'epd-1', name: 'Keep', version: '1', publishedDate: '2024-01-01' }])
  })
})
