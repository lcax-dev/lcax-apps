import { useMemo, useState } from 'react'
import { Combobox, Loader, TextInput, useCombobox } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { useOrganizationEpdTypeaheadQuery } from '@/queries/organizationAssemblies'
import { groupLatestEpds } from './groupLatestEpds'
import { impactKey, typeaheadEpdToEditorEpd } from './addImpactEpd'
import type { EditorEpd, EditorImpactRef } from './types'

type EpdTypeaheadProps = {
  attached: EditorImpactRef[]
  onSelect: (epd: EditorEpd) => void
}

export const EpdTypeahead = ({ attached, onSelect }: EpdTypeaheadProps) => {
  const combobox = useCombobox()
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebouncedValue(search.trim(), 250)
  const { data, loading } = useOrganizationEpdTypeaheadQuery({
    variables: {
      where: { name: { contains: debouncedSearch } },
      limit: 25,
    },
    skip: debouncedSearch.length < 2,
  })

  const options = useMemo(() => {
    const latest = groupLatestEpds(data?.epds ?? [])
    const attachedKeys = new Set(attached.map((item) => impactKey(item.id, item.version)))
    return latest.filter((epd) => epd.id && epd.version && !attachedKeys.has(impactKey(epd.id, epd.version)))
  }, [attached, data?.epds])

  return (
    <Combobox
      store={combobox}
      radius={0}
      onOptionSubmit={(value) => {
        const selected = options.find((epd) => epd.id && epd.version && impactKey(epd.id, epd.version) === value)
        const editorEpd = selected ? typeaheadEpdToEditorEpd(selected) : null
        if (editorEpd) onSelect(editorEpd)
        setSearch('')
        combobox.closeDropdown()
      }}
    >
      <Combobox.Target>
        <TextInput
          label='Add EPD'
          placeholder='Search visible EPDs by name'
          radius='xl'
          value={search}
          rightSection={loading ? <Loader size='xs' /> : null}
          onChange={(event) => {
            setSearch(event.currentTarget.value)
            combobox.openDropdown()
            combobox.updateSelectedOptionIndex()
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => combobox.closeDropdown()}
        />
      </Combobox.Target>
      <Combobox.Dropdown>
        <Combobox.Options>
          {debouncedSearch.length < 2 ? (
            <Combobox.Empty>Type at least two characters</Combobox.Empty>
          ) : options.length === 0 && !loading ? (
            <Combobox.Empty>No EPDs found</Combobox.Empty>
          ) : (
            options.map((epd) => {
              const value = impactKey(epd.id ?? '', epd.version ?? '')
              return (
                <Combobox.Option value={value} key={value}>
                  {epd.name?.trim() || epd.id} {epd.version ? `(${epd.version})` : ''}
                </Combobox.Option>
              )
            })
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}
