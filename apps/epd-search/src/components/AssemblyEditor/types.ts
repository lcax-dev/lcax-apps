export type EditorClassification = {
  name: string
  system: string
  code: string
}

export type EditorImpacts = {
  gwp?: { a1a3?: number | null } | null
} | null

export type EditorEpd = {
  id: string
  name: string
  version: string
  declaredUnit: string | null
  publishedDate: string | null
  referenceServiceLife: number | null
  impacts: EditorImpacts
}

export type EditorImpactRef = {
  id: string
  version: string
  epd: EditorEpd | null
}

export type EditorProduct = {
  key: string
  id: string | null
  name: string
  description: string
  quantity: number
  unit: string
  referenceServiceLife: number | null
  classification: EditorClassification[]
  impactData: EditorImpactRef[]
}

export type EditorAssemblyState = {
  id: string | null
  name: string
  description: string
  comment: string
  quantity: number
  unit: string
  classification: EditorClassification[]
  products: EditorProduct[]
  visibility: string
  incomplete: boolean
}

export type OrganizationAssemblyQueryData = {
  id: string
  name: string
  description?: string | null
  comment?: string | null
  quantity: number
  unit: string
  visibility: string
  incomplete: boolean
  classification: Array<{ name?: string | null; system?: string | null; code?: string | null } | null>
  products: Array<{
    id: string
    name: string
    description?: string | null
    quantity: number
    unit: string
    referenceServiceLife: number
    classification: Array<{ name?: string | null; system?: string | null; code?: string | null } | null>
    impactData: Array<{
      id: string
      version: string
      epd?: {
        id?: string | null
        name?: string | null
        version?: string | null
        declaredUnit?: string | null
        publishedDate?: string | null
        referenceServiceLife?: number | null
        impacts?: EditorImpacts
      } | null
    }>
  }>
}

export type TypeaheadEpd = {
  id?: string | null
  name?: string | null
  version?: string | null
  publishedDate?: string | null
  declaredUnit?: string | null
  referenceServiceLife?: number | null
  impacts?: EditorImpacts
}
