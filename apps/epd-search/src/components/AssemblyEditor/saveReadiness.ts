import type { EditorAssemblyState } from './types'

export const isAssemblyNamed = (state: EditorAssemblyState): boolean => state.name.trim().length > 0

export const hasEmptyProducts = (state: EditorAssemblyState): boolean =>
  state.products.length === 0 || state.products.some((product) => product.impactData.length === 0)

export const hasBrokenEpdRefs = (state: EditorAssemblyState): boolean =>
  state.products.some((product) => product.impactData.some((item) => item.epd == null))

export const canSaveDraft = (state: EditorAssemblyState): boolean => isAssemblyNamed(state)

export const canCompleteSave = (state: EditorAssemblyState): boolean =>
  isAssemblyNamed(state) && !hasEmptyProducts(state) && !hasBrokenEpdRefs(state)
