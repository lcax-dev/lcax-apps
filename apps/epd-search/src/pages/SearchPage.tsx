import { Container, TextInput, Title, Stack, Text, ActionIcon } from '@mantine/core'
import { useSearchParams, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { IconSearch } from '@tabler/icons-react'

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

  const handleNavigate = () => {
    if (value) {
      navigate(`/results?q=${encodeURIComponent(value)}`)
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
            <ActionIcon size={32} radius='xl' variant='filled' onClick={handleNavigate} disabled={!value}>
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
        {query && (
          <Text size='sm' color='dimmed'>
            Last search: <strong>{query}</strong>
          </Text>
        )}
      </Stack>
    </Container>
  )
}
