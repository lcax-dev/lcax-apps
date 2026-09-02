export const organizationAssemblyStatusLabel = (assembly: {
  incomplete: boolean
  visibility: string
}): 'Draft' | 'Private' | 'Public' => {
  if (assembly.incomplete) return 'Draft'
  if (assembly.visibility === 'Public') return 'Public'
  return 'Private'
}

export const organizationAssemblyGwpLabel = (assembly: {
  incomplete: boolean
  results?: { gwp?: { a1a3?: number | null } | null } | null
}): string => {
  if (assembly.incomplete) return '—'
  const value = assembly.results?.gwp?.a1a3
  if (value == null || Number.isNaN(value)) return '—'
  return value.toFixed(2)
}
