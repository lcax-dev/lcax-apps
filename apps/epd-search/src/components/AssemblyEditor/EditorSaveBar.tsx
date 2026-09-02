import { Button, Divider, Group, Stack, Text, UnstyledButton } from '@mantine/core'

type EditorSaveBarProps = {
  canDraft: boolean
  canComplete: boolean
  canDelete: boolean
  busy: boolean
  onSaveDraft: () => void
  onSavePrivate: () => void
  onSavePublic: () => void
  onDelete: () => void
}

export const EditorSaveBar = ({
  canDraft,
  canComplete,
  canDelete,
  busy,
  onSaveDraft,
  onSavePrivate,
  onSavePublic,
  onDelete,
}: EditorSaveBarProps) => (
  <Stack gap='md'>
    <Divider />
    {!canDraft ? (
      <Text c='dimmed' size='sm'>
        Name the assembly to save a draft.
      </Text>
    ) : !canComplete ? (
      <Text c='dimmed' size='sm'>
        Complete save needs at least one product, each with a visible EPD.
      </Text>
    ) : null}
    {busy ? (
      <Text role='status' aria-live='polite'>
        Saving…
      </Text>
    ) : null}
    <Group gap='md' wrap='wrap'>
      <Button variant='subtle' w='fit-content' disabled={!canDraft || busy} onClick={onSaveDraft}>
        Save draft
      </Button>
      <Button c='black' w='fit-content' disabled={!canComplete || busy} onClick={onSavePrivate}>
        Save as Private
      </Button>
      <Button c='black' w='fit-content' disabled={!canComplete || busy} onClick={onSavePublic}>
        Save as Public
      </Button>
      {canDelete ? (
        <UnstyledButton w='fit-content' disabled={busy} style={{ textDecoration: 'underline' }} onClick={onDelete}>
          Delete
        </UnstyledButton>
      ) : null}
    </Group>
  </Stack>
)
