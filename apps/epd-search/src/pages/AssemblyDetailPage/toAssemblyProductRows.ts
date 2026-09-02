export type AssemblyImpactEpd = {
  id?: string | null
  name?: string | null
}

export type AssemblyProductInput = {
  id?: string | null
  name?: string | null
  quantity?: number | null
  unit?: string | null
  impactData?: Array<AssemblyImpactEpd | null> | null
}

export type AssemblyImpactEpdLink = {
  id: string
  name: string
  href: string
}

export type AssemblyProductRow = {
  key: string
  name: string
  quantity: number | null
  unit: string | null
  impactEpds: AssemblyImpactEpdLink[]
}

const impactEpdLink = (epd: AssemblyImpactEpd | null): AssemblyImpactEpdLink | null => {
  if (!epd?.id) return null
  return {
    id: epd.id,
    name: epd.name?.trim() || epd.id,
    href: `/epds/${epd.id}`,
  }
}

export const toAssemblyProductRows = (
  products: Array<AssemblyProductInput | null> | null | undefined,
): AssemblyProductRow[] => {
  if (!products) return []

  return products.flatMap((product, index) => {
    if (!product) return []
    return [
      {
        key: product.id || `product-${index}`,
        name: product.name?.trim() || 'Untitled product',
        quantity: product.quantity ?? null,
        unit: product.unit ?? null,
        impactEpds: (product.impactData ?? []).flatMap((epd) => {
          const link = impactEpdLink(epd)
          return link ? [link] : []
        }),
      },
    ]
  })
}
