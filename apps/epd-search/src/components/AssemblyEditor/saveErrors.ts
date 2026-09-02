export type ForcePublishEpd = {
  id: string
  name: string
}

export type SaveConfirmError =
  | { code: 'CONFIRM_FORCE_PUBLISH'; epds: ForcePublishEpd[] }
  | { code: 'CONFIRM_PRIVATIZE' }

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null

const graphQLErrorsFrom = (error: unknown): Array<Record<string, unknown>> => {
  if (!isRecord(error)) return []
  if (Array.isArray(error.graphQLErrors)) {
    return error.graphQLErrors.filter(isRecord)
  }
  if (Array.isArray(error.errors)) {
    return error.errors.filter(isRecord)
  }
  return []
}

const extensionsFrom = (error: Record<string, unknown>): Record<string, unknown> | null => {
  if (isRecord(error.extensions)) return error.extensions
  return null
}

const epdsFrom = (extensions: Record<string, unknown>): ForcePublishEpd[] => {
  if (!Array.isArray(extensions.epds)) return []
  return extensions.epds.flatMap((item) => {
    if (!isRecord(item) || typeof item.id !== 'string') return []
    return [
      {
        id: item.id,
        name: typeof item.name === 'string' && item.name.trim() ? item.name : item.id,
      },
    ]
  })
}

export const parseSaveConfirmError = (error: unknown): SaveConfirmError | null => {
  for (const graphQLError of graphQLErrorsFrom(error)) {
    const extensions = extensionsFrom(graphQLError)
    const code = extensions?.code
    if (code === 'CONFIRM_FORCE_PUBLISH') {
      return { code, epds: extensions ? epdsFrom(extensions) : [] }
    }
    if (code === 'CONFIRM_PRIVATIZE') {
      return { code }
    }
  }
  return null
}
