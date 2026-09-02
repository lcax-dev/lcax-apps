import { Select, Stack, TextInput, Title } from '@mantine/core'
import { TypeChips } from '../TypeChips'
import { LCAxKindParam } from '@/lib/searchParams.ts'
import { CountryEnum, StandardEnum, SubTypeEnum, UnitEnum } from '@/queries/generated/graphql.ts'

interface FilterSidebarProps {
  name: string
  kinds: LCAxKindParam[]
  unit: string
  location: string
  subtype: string
  standard: string
  type: string
  classification: string
  publishedDate: string
  validUntil: string
  onNameChange: (value: string) => void
  onKindsChange: (value: LCAxKindParam[]) => void
  onUnitChange: (value: string | null) => void
  onLocationChange: (value: string | null) => void
  onSubtypeChange: (value: string | null) => void
  onStandardChange: (value: string | null) => void
  onTypeChange: (value: string) => void
  onClassificationChange: (value: string) => void
  onPublishedDateChange: (value: string) => void
  onValidUntilChange: (value: string) => void
}

export const FilterSidebar = ({
  name,
  kinds,
  unit,
  location,
  subtype,
  standard,
  type,
  classification,
  publishedDate,
  validUntil,
  onNameChange,
  onKindsChange,
  onUnitChange,
  onLocationChange,
  onSubtypeChange,
  onStandardChange,
  onTypeChange,
  onClassificationChange,
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
      <TypeChips value={kinds} onChange={onKindsChange} />
      <TextInput
        label='Name'
        placeholder='Filter by name...'
        value={name}
        onChange={(event) => onNameChange(event.currentTarget.value)}
      />
      <TextInput
        label='Classification'
        placeholder='Filter assemblies by classification...'
        value={classification}
        onChange={(event) => onClassificationChange(event.currentTarget.value)}
      />
      <Select
        label='Unit'
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
