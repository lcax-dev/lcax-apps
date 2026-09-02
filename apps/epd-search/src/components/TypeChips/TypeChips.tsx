import { Chip, Group, Text } from '@mantine/core'
import { LCAxKindParam } from '@/lib/searchParams.ts'

interface TypeChipsProps {
  value: LCAxKindParam[]
  onChange: (value: LCAxKindParam[]) => void
}

const isLCAxKind = (value: string): value is LCAxKindParam => value === 'EPD' || value === 'ASSEMBLY'

export const TypeChips = ({ value, onChange }: TypeChipsProps) => {
  return (
    <div>
      <Text size='sm' fw={500} mb='xs' id='type-chips-label'>
        Type
      </Text>
      <Chip.Group multiple value={value} onChange={(next) => onChange(next.filter(isLCAxKind))}>
        <Group gap='xs' role='group' aria-labelledby='type-chips-label'>
          <Chip value='EPD'>EPD</Chip>
          <Chip value='ASSEMBLY'>Assembly</Chip>
        </Group>
      </Chip.Group>
    </div>
  )
}
