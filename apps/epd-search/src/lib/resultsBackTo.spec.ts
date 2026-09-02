import { describe, expect, it } from 'vitest'
import { resultsBackTo } from './resultsBackTo'

describe('resultsBackTo', () => {
  it('keeps the results path and query string so filters survive the round trip', () => {
    expect(resultsBackTo('/results?q=timber&kinds=ASSEMBLY&unit=M2')).toBe('/results?q=timber&kinds=ASSEMBLY&unit=M2')
  })

  it('falls back to /results when the visitor did not come from search', () => {
    expect(resultsBackTo(undefined)).toBe('/results')
    expect(resultsBackTo(null)).toBe('/results')
    expect(resultsBackTo('/epds/abc')).toBe('/results')
  })
})
