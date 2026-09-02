import { describe, expect, it, vi } from 'vitest'
import { createEmptyEditorState, createEmptyProduct } from './editorState'
import { runSave } from './saveAssembly'
import { parseSaveConfirmError } from './saveErrors'
import type { OrganizationAssemblyQueryData } from './types'

const namedState = {
  ...createEmptyEditorState(),
  name: 'Wall',
  products: [createEmptyProduct()],
}

describe('parseSaveConfirmError', () => {
  it('reads CONFIRM_FORCE_PUBLISH EPD names from GraphQL extensions', () => {
    const parsed = parseSaveConfirmError({
      graphQLErrors: [
        {
          message: 'Publishing this Assembly will make Private EPDs Public',
          extensions: {
            code: 'CONFIRM_FORCE_PUBLISH',
            epds: [{ id: 'epd-1', name: 'Org private EPD' }],
          },
        },
      ],
    })
    expect(parsed).toEqual({
      code: 'CONFIRM_FORCE_PUBLISH',
      epds: [{ id: 'epd-1', name: 'Org private EPD' }],
    })
  })

  it('reads CONFIRM_PRIVATIZE and ignores unrelated errors', () => {
    expect(
      parseSaveConfirmError({
        graphQLErrors: [{ extensions: { code: 'CONFIRM_PRIVATIZE' } }],
      }),
    ).toEqual({ code: 'CONFIRM_PRIVATIZE' })
    expect(
      parseSaveConfirmError({
        errors: [{ extensions: { code: 'CONFIRM_PRIVATIZE' } }],
      }),
    ).toEqual({ code: 'CONFIRM_PRIVATIZE' })
    expect(parseSaveConfirmError({ graphQLErrors: [{ extensions: { code: 'BAD_USER_INPUT' } }] })).toBeNull()
    expect(parseSaveConfirmError(new Error('network'))).toBeNull()
  })
})

describe('runSave', () => {
  it('returns saved data on success', async () => {
    const assembly = { id: 'asm-1', name: 'Wall' } as OrganizationAssemblyQueryData
    const save = vi.fn().mockResolvedValue(assembly)
    const result = await runSave(save, namedState, { kind: 'DRAFT' })
    expect(result).toEqual({ status: 'saved', assembly })
    expect(save).toHaveBeenCalledOnce()
  })

  it('maps confirm codes instead of treating them as hard errors', async () => {
    const force = await runSave(
      vi.fn().mockRejectedValue({
        graphQLErrors: [
          {
            extensions: {
              code: 'CONFIRM_FORCE_PUBLISH',
              epds: [{ id: 'epd-1', name: 'Private EPD' }],
            },
          },
        ],
      }),
      namedState,
      { kind: 'COMPLETE', visibility: 'Public' },
    )
    expect(force).toEqual({
      status: 'confirm-force-publish',
      epds: [{ id: 'epd-1', name: 'Private EPD' }],
    })

    const privatize = await runSave(
      vi.fn().mockRejectedValue({
        graphQLErrors: [{ extensions: { code: 'CONFIRM_PRIVATIZE' } }],
      }),
      namedState,
      { kind: 'DRAFT' },
    )
    expect(privatize).toEqual({ status: 'confirm-privatize' })
  })

  it('returns other failures as errors without writing a confirm', async () => {
    const error = { graphQLErrors: [{ extensions: { code: 'BAD_USER_INPUT' }, message: 'Assembly name is required' }] }
    const result = await runSave(vi.fn().mockRejectedValue(error), namedState, { kind: 'DRAFT' })
    expect(result).toEqual({ status: 'error', error })
  })
})
