import { v4 as uuid4 } from 'uuid'
import { toLcaxUnit } from './units'
import type {
  EditorAssemblyState,
  EditorClassification,
  EditorEpd,
  EditorProduct,
  OrganizationAssemblyQueryData,
} from './types'

const mapClassification = (
  rows: Array<{ name?: string | null; system?: string | null; code?: string | null } | null> | null | undefined,
): EditorClassification[] =>
  (rows ?? []).flatMap((row) => {
    if (!row) return []
    return [
      {
        name: row.name ?? '',
        system: row.system ?? '',
        code: row.code ?? '',
      },
    ]
  })

const mapEpd = (
  epd: NonNullable<OrganizationAssemblyQueryData['products'][number]['impactData'][number]['epd']> | null | undefined,
): EditorEpd | null => {
  if (!epd?.id) return null
  return {
    id: epd.id,
    name: epd.name?.trim() || epd.id,
    version: epd.version ?? '',
    declaredUnit: epd.declaredUnit ?? null,
    publishedDate: epd.publishedDate ?? null,
    referenceServiceLife: epd.referenceServiceLife ?? null,
    impacts: epd.impacts ?? null,
  }
}

export const createEmptyClassification = (): EditorClassification => ({
  name: '',
  system: '',
  code: '',
})

export const createEmptyProduct = (): EditorProduct => ({
  key: uuid4(),
  id: null,
  name: '',
  description: '',
  quantity: 1,
  unit: '',
  referenceServiceLife: null,
  classification: [],
  impactData: [],
})

export const createEmptyEditorState = (): EditorAssemblyState => ({
  id: null,
  name: '',
  description: '',
  comment: '',
  quantity: 1,
  unit: 'pcs',
  classification: [],
  products: [],
  visibility: 'Private',
  incomplete: true,
})

export const editorStateFromQuery = (data: OrganizationAssemblyQueryData): EditorAssemblyState => ({
  id: data.id,
  name: data.name,
  description: data.description ?? '',
  comment: data.comment ?? '',
  quantity: data.quantity,
  unit: toLcaxUnit(data.unit) === 'unknown' ? data.unit.toLowerCase() : toLcaxUnit(data.unit),
  classification: mapClassification(data.classification),
  visibility: data.visibility,
  incomplete: data.incomplete,
  products: data.products.map((product) => ({
    key: product.id,
    id: product.id,
    name: product.name,
    description: product.description ?? '',
    quantity: product.quantity,
    unit: toLcaxUnit(product.unit) === 'unknown' ? product.unit : toLcaxUnit(product.unit),
    referenceServiceLife: product.referenceServiceLife,
    classification: mapClassification(product.classification),
    impactData: product.impactData.map((item) => ({
      id: item.id,
      version: item.version,
      epd: mapEpd(item.epd),
    })),
  })),
})

export const applyFirstEpdDefaults = (product: EditorProduct, epd: EditorEpd): EditorProduct => {
  if (product.impactData.length > 0) return product
  return {
    ...product,
    name: product.name.trim() ? product.name : epd.name,
    unit: product.unit.trim()
      ? product.unit
      : toLcaxUnit(epd.declaredUnit) === 'unknown'
        ? product.unit
        : toLcaxUnit(epd.declaredUnit),
    referenceServiceLife: product.referenceServiceLife ?? epd.referenceServiceLife,
  }
}

const snapshot = (state: EditorAssemblyState) =>
  JSON.stringify({
    name: state.name,
    description: state.description,
    comment: state.comment,
    quantity: state.quantity,
    unit: state.unit,
    classification: state.classification,
    products: state.products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      quantity: product.quantity,
      unit: product.unit,
      referenceServiceLife: product.referenceServiceLife,
      classification: product.classification,
      impactData: product.impactData.map((item) => ({
        id: item.id,
        version: item.version,
        epdId: item.epd?.id ?? null,
      })),
    })),
  })

export const isEditorDirty = (current: EditorAssemblyState, baseline: EditorAssemblyState): boolean =>
  snapshot(current) !== snapshot(baseline)
