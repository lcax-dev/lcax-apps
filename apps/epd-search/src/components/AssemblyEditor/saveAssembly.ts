import { parseSaveConfirmError, type ForcePublishEpd } from './saveErrors'
import { toSaveOrganizationAssemblyInput, type SaveOptions, type SaveOrganizationAssemblyInput } from './toSaveInput'
import type { EditorAssemblyState, OrganizationAssemblyQueryData } from './types'

export type SaveAttemptResult =
  | { status: 'saved'; assembly: OrganizationAssemblyQueryData }
  | { status: 'confirm-force-publish'; epds: ForcePublishEpd[] }
  | { status: 'confirm-privatize' }
  | { status: 'error'; error: unknown }

export const runSave = async (
  save: (input: SaveOrganizationAssemblyInput) => Promise<OrganizationAssemblyQueryData>,
  state: EditorAssemblyState,
  options: SaveOptions,
): Promise<SaveAttemptResult> => {
  try {
    const assembly = await save(toSaveOrganizationAssemblyInput(state, options))
    return { status: 'saved', assembly }
  } catch (error) {
    const confirm = parseSaveConfirmError(error)
    if (confirm?.code === 'CONFIRM_FORCE_PUBLISH') {
      return { status: 'confirm-force-publish', epds: confirm.epds }
    }
    if (confirm?.code === 'CONFIRM_PRIVATIZE') {
      return { status: 'confirm-privatize' }
    }
    return { status: 'error', error }
  }
}
