import type { EditorAssemblyState, EditorClassification } from './types'

export type SaveKind = 'DRAFT' | 'COMPLETE'

export type SaveOptions = {
  kind: SaveKind
  visibility?: 'Public' | 'Private'
  confirmForcePublish?: boolean
  confirmPrivatize?: boolean
  results?: unknown
}

export type SaveOrganizationAssemblyInput = {
  id?: string
  kind: SaveKind
  visibility?: 'Public' | 'Private'
  confirmForcePublish?: boolean
  confirmPrivatize?: boolean
  results?: unknown
  assembly: {
    name: string
    description: string
    comment: string
    quantity: number
    unit: string
    classification: EditorClassification[]
    products: Array<{
      id?: string
      name: string
      description: string
      quantity: number
      unit: string
      referenceServiceLife: number
      classification: EditorClassification[]
      impactData: Array<{ id: string; version: string }>
    }>
  }
}

const mapClassification = (rows: EditorClassification[]) =>
  rows
    .filter((row) => row.name.trim() || row.system.trim() || row.code.trim())
    .map((row) => ({
      name: row.name,
      system: row.system,
      code: row.code,
    }))

export const toSaveOrganizationAssemblyInput = (
  state: EditorAssemblyState,
  options: SaveOptions,
): SaveOrganizationAssemblyInput => ({
  id: state.id ?? undefined,
  kind: options.kind,
  visibility: options.kind === 'COMPLETE' ? options.visibility : undefined,
  confirmForcePublish: options.confirmForcePublish,
  confirmPrivatize: options.confirmPrivatize,
  results: options.kind === 'COMPLETE' ? (options.results ?? null) : undefined,
  assembly: {
    name: state.name,
    description: state.description,
    comment: state.comment,
    quantity: state.quantity,
    unit: state.unit,
    classification: mapClassification(state.classification),
    products: state.products.map((product) => ({
      id: product.id ?? undefined,
      name: product.name,
      description: product.description,
      quantity: product.quantity,
      unit: product.unit,
      referenceServiceLife: product.referenceServiceLife ?? 0,
      classification: mapClassification(product.classification),
      impactData: product.impactData.map((item) => ({
        id: item.id,
        version: item.version,
      })),
    })),
  },
})
