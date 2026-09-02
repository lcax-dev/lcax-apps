import { ActionIcon, Button, Container, Group, Stack, Text, TextInput, Title, useMatches } from '@mantine/core'
import { useSearchParams, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { IconSearch, IconWindow, IconGizmo, IconWall } from '@tabler/icons-react'

const SUGGESTIONS = [
  { term: 'Wood alu window', label: 'Wood alu window', icon: IconWindow },
  { term: 'Steel beam', label: 'Steel beam', icon: IconGizmo },
  { term: 'Concrete', label: 'Concrete', icon: IconWall },
]

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const query = searchParams.get('q') || ''
  const [value, setValue] = useState(query)

  useEffect(() => {
    setValue(query)
  }, [query])

  const handleSearch = (val: string) => {
    setValue(val)
    if (val) {
      setSearchParams({ q: val }, { replace: true })
    } else {
      setSearchParams({}, { replace: true })
    }
  }

  const handleNavigate = (val?: string) => {
    const term = val || value
    if (term) {
      navigate(`/results?q=${encodeURIComponent(term)}`)
    }
  }

  const containerSize = useMatches({ base: 'md', xl: 'xl', xxl: 'xxl' })

  return (
    <Container fluid bg='grey.0' p={0}>
      <Container h='100vh' size={containerSize} mx={{ base: 'md', md: 'auto' }}>
        <Stack h='100%' justify='center' gap='xl'>
          <div>
            <Text>EPD Search</Text>
            <Title>LCAx Search</Title>
          </div>
          <Text w={{ base: '100%', xl: '66%' }}>Search for LCAx Data (EPDs and Assemblies) in seconds.</Text>

          <TextInput
            placeholder='Search LCAx Data by name...'
            aria-label='Search LCAx Data'
            size='xl'
            radius='xl'
            w={{ base: '100%', xl: '66%' }}
            leftSection={<IconSearch size={24} />}
            rightSection={
              <ActionIcon
                size={32}
                radius='xl'
                variant='filled'
                color='yellow.4'
                onClick={() => handleNavigate()}
                disabled={!value}
              >
                <IconSearch size={18} stroke={1.5} color='black' />
              </ActionIcon>
            }
            value={value}
            onChange={(event) => handleSearch(event.currentTarget.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleNavigate()
              }
            }}
          />

          <Stack gap='xs' w={{ base: '100%', xl: '66%' }}>
            <Text size='sm'>Try searching for:</Text>
            <Group gap='sm'>
              {SUGGESTIONS.map((suggestion) => (
                <Button
                  key={suggestion.term}
                  variant='default'
                  radius='xl'
                  size='sm'
                  leftSection={<suggestion.icon size={16} stroke={1.5} />}
                  onClick={() => handleNavigate(suggestion.term)}
                >
                  {suggestion.label}
                </Button>
              ))}
            </Group>
          </Stack>

          {query && <Text size='sm'>Last search: {query}</Text>}
        </Stack>
      </Container>
    </Container>
  )
}
