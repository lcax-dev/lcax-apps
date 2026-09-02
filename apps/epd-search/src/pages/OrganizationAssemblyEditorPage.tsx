import { useEffect, useMemo, useRef, useState } from 'react'
import { Anchor, Button, Container, Divider, Stack, Text, Title, useMatches } from '@mantine/core'
import { Link, useNavigate, useParams } from 'react-router'
import { IconArrowRight } from '@tabler/icons-react'
import { ErrorMessage, Loading } from '@lcax/ui'
import {
  AssemblyEditor,
  EditorConfirmModal,
  EditorSaveBar,
  canCompleteSave,
  canSaveDraft,
  createEmptyEditorState,
  editorStateFromQuery,
  isEditorDirty,
  liveAssemblyResults,
  runSave,
  type EditorAssemblyState,
  type OrganizationAssemblyQueryData,
} from '@/components/AssemblyEditor'
import {
  organizationAssembliesQueryDocument,
  organizationAssemblyQueryDocument,
  useDeleteOrganizationAssemblyMutation,
  useOrganizationAssemblyQuery,
  useSaveOrganizationAssemblyMutation,
} from '@/queries/organizationAssemblies'
import type { ForcePublishEpd } from '@/components/AssemblyEditor/saveErrors'
import type { SaveOptions } from '@/components/AssemblyEditor/toSaveInput'

const messageFromError = (error: unknown): string => {
  if (error instanceof Error && error.message) return error.message
  if (typeof error === 'object' && error && 'message' in error && typeof error.message === 'string') {
    return error.message
  }
  return 'Save failed'
}

export const OrganizationAssemblyEditorPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isNew = !id
  const containerSize = useMatches({ base: 'md', xl: 'xl', xxl: 'xxl' })
  const emptyState = useMemo(() => createEmptyEditorState(), [])
  const [state, setState] = useState<EditorAssemblyState>(emptyState)
  const [baseline, setBaseline] = useState<EditorAssemblyState>(emptyState)
  const [hydratedId, setHydratedId] = useState<string | 'new' | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [forcePublishEpds, setForcePublishEpds] = useState<ForcePublishEpd[] | null>(null)
  const [privatizeOpen, setPrivatizeOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const allowLeaveRef = useRef(false)

  const { data, loading, error, refetch } = useOrganizationAssemblyQuery({
    variables: { id: id ?? '' },
    skip: isNew,
  })
  const [saveAssembly, { loading: saving }] = useSaveOrganizationAssemblyMutation()
  const [deleteAssembly, { loading: deleting }] = useDeleteOrganizationAssemblyMutation()
  const busy = saving || deleting

  useEffect(() => {
    if (isNew) {
      if (hydratedId === 'new') return
      const next = createEmptyEditorState()
      setState(next)
      setBaseline(next)
      setHydratedId('new')
      return
    }
    if (id && hydratedId && hydratedId !== 'new' && hydratedId !== id) {
      setHydratedId(null)
      return
    }
    const assembly = data?.organizationAssembly
    if (!assembly || hydratedId === assembly.id) return
    const next = editorStateFromQuery(assembly)
    setState(next)
    setBaseline(next)
    setHydratedId(assembly.id)
  }, [data?.organizationAssembly, hydratedId, id, isNew])

  const dirty = isEditorDirty(state, baseline)
  const assembly = data?.organizationAssembly
  const showLoading = !isNew && loading && hydratedId !== id
  const showError = !isNew && !!error
  const showMissing = !isNew && !loading && !error && !assembly

  const persist = async (options: SaveOptions) => {
    setSaveError(null)
    const result = await runSave(
      async (input) => {
        const response = await saveAssembly({
          variables: { input },
          refetchQueries: [
            { query: organizationAssembliesQueryDocument },
            ...(state.id ? [{ query: organizationAssemblyQueryDocument, variables: { id: state.id } }] : []),
          ],
          awaitRefetchQueries: true,
        })
        const saved = response.data?.saveOrganizationAssembly
        if (!saved) throw new Error('Save failed')
        return saved
      },
      state,
      {
        ...options,
        results: options.kind === 'COMPLETE' ? liveAssemblyResults(state) : undefined,
      },
    )

    if (result.status === 'confirm-force-publish') {
      setForcePublishEpds(result.epds)
      return
    }
    if (result.status === 'confirm-privatize') {
      setPrivatizeOpen(true)
      return
    }
    if (result.status === 'error') {
      setForcePublishEpds(null)
      setPrivatizeOpen(false)
      setSaveError(messageFromError(result.error))
      return
    }

    const next = editorStateFromQuery(result.assembly as OrganizationAssemblyQueryData)
    allowLeaveRef.current = true
    setState(next)
    setBaseline(next)
    setHydratedId(next.id)
    setForcePublishEpds(null)
    setPrivatizeOpen(false)
    if (!state.id || state.id !== next.id) {
      navigate(`/assemblies/${next.id}/edit`, { replace: true })
      return
    }
    allowLeaveRef.current = false
  }

  const handleDelete = async () => {
    if (!state.id) return
    setSaveError(null)
    try {
      allowLeaveRef.current = true
      await deleteAssembly({
        variables: { id: state.id },
        refetchQueries: [{ query: organizationAssembliesQueryDocument }],
        awaitRefetchQueries: true,
      })
      setDeleteOpen(false)
      navigate('/assemblies')
    } catch (deleteError) {
      allowLeaveRef.current = false
      setSaveError(messageFromError(deleteError))
    }
  }

  return (
    <Container fluid bg='grey.0' p={0} pb='xl'>
      <Container size={containerSize} py='xl' mx={{ base: 'md', md: 'auto' }}>
        <Stack gap='xl'>
          <div>
            <Anchor component={Link} to='/assemblies' underline='always' c='black'>
              Assemblies
            </Anchor>
            <Title>{isNew ? 'New assembly' : (assembly?.name ?? 'Edit assembly')}</Title>
          </div>
          <Text w={{ base: '100%', xl: '66%' }}>Compose products and attach visible EPDs.</Text>
          <Divider />
          {showLoading ? (
            <div aria-busy='true' aria-label='Loading assembly'>
              <Loading />
            </div>
          ) : showError ? (
            <Stack gap='md' role='alert'>
              <ErrorMessage error={error} />
              <Button variant='subtle' w='fit-content' onClick={() => refetch()}>
                Try again
              </Button>
            </Stack>
          ) : showMissing ? (
            <Stack gap='md' role='status'>
              <Text>Assembly not found.</Text>
              <Button component={Link} to='/assemblies' c='black' w='fit-content' rightSection={<IconArrowRight />}>
                Back to assemblies
              </Button>
            </Stack>
          ) : (
            <>
              <AssemblyEditor state={state} dirty={dirty} allowLeaveRef={allowLeaveRef} onChange={setState} />
              {saveError ? (
                <Text role='alert' c='red'>
                  {saveError}
                </Text>
              ) : null}
              <EditorSaveBar
                canDraft={canSaveDraft(state)}
                canComplete={canCompleteSave(state)}
                canDelete={Boolean(state.id)}
                busy={busy}
                onSaveDraft={() => {
                  void persist({ kind: 'DRAFT' })
                }}
                onSavePrivate={() => {
                  void persist({ kind: 'COMPLETE', visibility: 'Private' })
                }}
                onSavePublic={() => {
                  void persist({ kind: 'COMPLETE', visibility: 'Public' })
                }}
                onDelete={() => setDeleteOpen(true)}
              />
            </>
          )}
        </Stack>
      </Container>
      <EditorConfirmModal
        opened={forcePublishEpds !== null}
        title='Make Private EPDs Public?'
        confirmLabel='Publish EPDs'
        busy={busy}
        onCancel={() => setForcePublishEpds(null)}
        onConfirm={() => {
          void persist({ kind: 'COMPLETE', visibility: 'Public', confirmForcePublish: true })
        }}
      >
        <Stack gap='sm'>
          <Text>Publishing this assembly will make these Private EPDs Public:</Text>
          {(forcePublishEpds ?? []).map((epd) => (
            <Text key={`${epd.id}:${epd.name}`}>{epd.name}</Text>
          ))}
        </Stack>
      </EditorConfirmModal>
      <EditorConfirmModal
        opened={privatizeOpen}
        title='Save as draft?'
        confirmLabel='Save draft'
        busy={busy}
        onCancel={() => setPrivatizeOpen(false)}
        onConfirm={() => {
          void persist({ kind: 'DRAFT', confirmPrivatize: true })
        }}
      >
        Saving a draft will make this Public assembly Private. Products and EPDs stay Public.
      </EditorConfirmModal>
      <EditorConfirmModal
        opened={deleteOpen}
        title='Delete assembly?'
        confirmLabel='Delete'
        busy={busy}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={() => {
          void handleDelete()
        }}
      >
        Delete this assembly and its products? Catalog EPDs will remain.
      </EditorConfirmModal>
    </Container>
  )
}
