export const RESULTS_PATH = '/results'

export const resultsBackTo = (fromResults?: string | null): string => {
  if (!fromResults) return RESULTS_PATH

  try {
    const url = new URL(fromResults, 'http://lcax.local')
    if (url.pathname !== RESULTS_PATH) return RESULTS_PATH
    return `${url.pathname}${url.search}`
  } catch {
    return RESULTS_PATH
  }
}
