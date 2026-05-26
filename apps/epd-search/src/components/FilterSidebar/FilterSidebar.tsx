import { Select, Stack, TextInput, Title } from '@mantine/core'
import { CountryEnum, StandardEnum, SubTypeEnum, UnitEnum } from '@/queries/generated/graphql.ts'

interface FilterSidebarProps {
  name: string
  unit: string
  location: string
  subtype: string
  standard: string
  type: string
  publishedDate: string
  validUntil: string
  onNameChange: (value: string) => void
  onUnitChange: (value: string | null) => void
  onLocationChange: (value: string | null) => void
  onSubtypeChange: (value: string | null) => void
  onStandardChange: (value: string | null) => void
  onTypeChange: (value: string) => void
  onPublishedDateChange: (value: string) => void
  onValidUntilChange: (value: string) => void
}

export const FilterSidebar = ({
  name,
  unit,
  location,
  subtype,
  standard,
  type,
  publishedDate,
  validUntil,
  onNameChange,
  onUnitChange,
  onLocationChange,
  onSubtypeChange,
  onStandardChange,
  onTypeChange,
  onPublishedDateChange,
  onValidUntilChange,
}: FilterSidebarProps) => {
  const unitOptions = Object.values(UnitEnum).map((u) => ({
    value: u,
    label: u,
  }))

  const locationOptions = Object.values(CountryEnum).map((c) => ({
    value: c,
    label: c,
  }))

  const subtypeOptions = Object.values(SubTypeEnum).map((s) => ({
    value: s,
    label: s,
  }))

  const standardOptions = Object.values(StandardEnum).map((s) => ({
    value: s,
    label: s,
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
      <Select
        label='Location'
        placeholder='Select location'
        data={locationOptions}
        value={location}
        onChange={onLocationChange}
        searchable
        clearable
      />
      <Select
        label='Subtype'
        placeholder='Select subtype'
        data={subtypeOptions}
        value={subtype}
        onChange={onSubtypeChange}
        clearable
      />
      <Select
        label='Standard'
        placeholder='Select standard'
        data={standardOptions}
        value={standard}
        onChange={onStandardChange}
        clearable
      />
      <TextInput
        label='Type'
        placeholder='Filter by type...'
        value={type}
        onChange={(event) => onTypeChange(event.currentTarget.value)}
      />
      <TextInput
        label='Published After'
        type='date'
        value={publishedDate}
        onChange={(event) => onPublishedDateChange(event.currentTarget.value)}
      />
      <TextInput
        label='Valid Until'
        type='date'
        value={validUntil}
        onChange={(event) => onValidUntilChange(event.currentTarget.value)}
      />
    </Stack>
  )
}
