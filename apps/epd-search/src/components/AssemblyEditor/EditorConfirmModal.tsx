import { Button, Group, Modal, Stack, Text } from '@mantine/core'
import type { ReactNode } from 'react'

type EditorConfirmModalProps = {
  opened: boolean
  title: string
  children: ReactNode
  confirmLabel: string
  busy?: boolean
  onCancel: () => void
  onConfirm: () => void
}

export const EditorConfirmModal = ({
  opened,
  title,
  children,
  confirmLabel,
  busy = false,
  onCancel,
  onConfirm,
}: EditorConfirmModalProps) => (
  <Modal opened={opened} onClose={onCancel} title={title} radius={0} centered>
    <Stack gap='md'>
      {typeof children === 'string' ? <Text>{children}</Text> : children}
      <Group justify='flex-end' gap='md'>
        <Button variant='subtle' disabled={busy} onClick={onCancel}>
          Cancel
        </Button>
        <Button c='black' disabled={busy} onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </Group>
    </Stack>
  </Modal>
)
