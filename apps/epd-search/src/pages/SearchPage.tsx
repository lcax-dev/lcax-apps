import { Container, TextInput, Title, Stack, Text, ActionIcon, Group, Card, UnstyledButton } from '@mantine/core'
import { useSearchParams, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { IconSearch } from '@tabler/icons-react'

const SUGGESTIONS = [
  { term: 'Wood alu window', label: '🪟 Wood alu window' },
  { term: 'Steel beam', label: '🏗️ Steel beam' },
  { term: 'Concrete', label: '🧱 Concrete' },
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

  return (
    <Container size='sm' py={100}>
      <Stack gap='xl' align='center'>
        <Title order={1} size='h1' ta='center'>
          LCAx Search
        </Title>
        <Text size='lg' ta='center' color='dimmed'>
          Search for Environmental Product Declarations (EPDs) in seconds.
        </Text>
        <TextInput
          placeholder='Search EPDs by name...'
          size='xl'
          radius='xl'
          w='100%'
          leftSection={<IconSearch size={24} />}
          rightSection={
            <ActionIcon size={32} radius='xl' variant='filled' onClick={() => handleNavigate()} disabled={!value}>
              <IconSearch size={18} stroke={1.5} />
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

        <Stack gap='md' align='center' w='100%'>
          <Text size='sm' c='dimmed' fw={500}>
            Try searching for:
          </Text>
          <Group justify='center' gap='md' w='100%'>
            {SUGGESTIONS.map((suggestion) => (
              <UnstyledButton
                key={suggestion.term}
                onClick={() => handleNavigate(suggestion.term)}
                style={{ flex: 1, minWidth: '150px', maxWidth: '200px' }}
              >
                <Card shadow='sm' padding='md' radius='md' withBorder h='100%'>
                  <Text ta='center' fw={500} size='sm'>
                    {suggestion.label}
                  </Text>
                </Card>
              </UnstyledButton>
            ))}
          </Group>
        </Stack>

        {query && (
          <Text size='sm' color='dimmed'>
            Last search: <strong>{query}</strong>
          </Text>
        )}
      </Stack>
    </Container>
  )
}
