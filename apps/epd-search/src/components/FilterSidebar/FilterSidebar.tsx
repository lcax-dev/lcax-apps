import { Select, Stack, TextInput, Title } from '@mantine/core'
import { UnitEnum } from '@/queries/generated/graphql.ts'

interface FilterSidebarProps {
  name: string
  unit: string
  onNameChange: (value: string) => void
  onUnitChange: (value: string | null) => void
}

export const FilterSidebar = ({ name, unit, onNameChange, onUnitChange }: FilterSidebarProps) => {
  const unitOptions = Object.values(UnitEnum).map((u) => ({
    value: u,
    label: u,
  }))

  return (
    <Stack gap='md'>
      <Title order={4}>Filters</Title>
      <TextInput
        label='Name'
        placeholder='Filter by name...'
        value={name}
        onChange={(event) => onNameChange(event.currentTarget.value)}
      />
      <Select
        label='Declared Unit'
        placeholder='Select unit'
        data={unitOptions}
        value={unit}
        onChange={onUnitChange}
        clearable
      />
    </Stack>
  )
}
