import { Button, Group, SimpleGrid, Stack, Text, TextInput, UnstyledButton } from '@mantine/core'
import { createEmptyClassification } from './editorState'
import type { EditorClassification } from './types'

type ClassificationRowsProps = {
  idPrefix: string
  rows: EditorClassification[]
  onChange: (rows: EditorClassification[]) => void
}

export const ClassificationRows = ({ idPrefix, rows, onChange }: ClassificationRowsProps) => {
  const updateRow = (index: number, patch: Partial<EditorClassification>) => {
    onChange(rows.map((row, rowIndex) => (rowIndex === index ? { ...row, ...patch } : row)))
  }

  return (
    <Stack gap='sm'>
      <Group justify='space-between' align='center'>
        <Text>Classification</Text>
        <Button
          variant='subtle'
          size='compact-md'
          w='fit-content'
          onClick={() => onChange([...rows, createEmptyClassification()])}
        >
          Add classification
        </Button>
      </Group>
      {rows.length === 0 ? (
        <Text c='dimmed' size='sm'>
          No classification rows.
        </Text>
      ) : (
        rows.map((row, index) => (
          <Stack key={`${idPrefix}-classification-${index}`} gap='xs'>
            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing='sm'>
              <TextInput
                label='Name'
                radius='xl'
                value={row.name}
                onChange={(event) => updateRow(index, { name: event.currentTarget.value })}
              />
              <TextInput
                label='System'
                radius='xl'
                value={row.system}
                onChange={(event) => updateRow(index, { system: event.currentTarget.value })}
              />
              <TextInput
                label='Code'
                radius='xl'
                value={row.code}
                onChange={(event) => updateRow(index, { code: event.currentTarget.value })}
              />
            </SimpleGrid>
            <UnstyledButton
              w='fit-content'
              style={{ textDecoration: 'underline' }}
              onClick={() => onChange(rows.filter((_, rowIndex) => rowIndex !== index))}
            >
              Remove classification
            </UnstyledButton>
          </Stack>
        ))
      )}
    </Stack>
  )
}
