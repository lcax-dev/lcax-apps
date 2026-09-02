export type GroupableEpd = {
  id?: string | null
  name?: string | null
  version?: string | null
  publishedDate?: string | null
}

const publishedAt = (value: string | null | undefined): number => {
  if (!value) return 0
  const time = Date.parse(value)
  return Number.isNaN(time) ? 0 : time
}

export const groupLatestEpds = <T extends GroupableEpd>(epds: T[]): T[] => {
  const latest = new Map<string, T>()
  for (const epd of epds) {
    if (!epd.id) continue
    const current = latest.get(epd.id)
    if (!current || publishedAt(epd.publishedDate) > publishedAt(current.publishedDate)) {
      latest.set(epd.id, epd)
    }
  }
  return [...latest.values()]
}
