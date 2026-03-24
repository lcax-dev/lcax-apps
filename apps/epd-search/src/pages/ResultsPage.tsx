import { Container, Title, Stack, Text, Loader, Center, SimpleGrid, Grid } from '@mantine/core'
import { useSearchParams } from 'react-router'
import { useDebouncedValue } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { useSearchEpdsQuery, UnitEnum } from '@/queries/generated'
import { EPDCard, FilterSidebar } from '@/components'

export const ResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const unit = searchParams.get('unit') || ''

  const [searchInput, setSearchInput] = useState(query)
  const [debouncedQuery] = useDebouncedValue(searchInput, 500)

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (debouncedQuery) {
      params.set('q', debouncedQuery)
    } else {
      params.delete('q')
    }
    setSearchParams(params)
  }, [debouncedQuery])

  const { data, loading, error } = useSearchEpdsQuery({
    variables: {
      where: {
        name: query ? { contains: query } : undefined,
        declaredUnit: unit ? { eq: unit as UnitEnum } : undefined,
      },
      limit: 50,
    },
    skip: !query && !unit,
  })

  const handleNameChange = (name: string) => {
    setSearchInput(name)
  }

  const handleUnitChange = (unit: string | null) => {
    const params = new URLSearchParams(searchParams)
    if (unit) {
      params.set('unit', unit)
    } else {
      params.delete('unit')
    }
    setSearchParams(params)
  }

  return (
    <Container size='lg' py={50}>
      <Grid gutter='xl'>
        <Grid.Col span={{ base: 12, md: 3 }}>
          <FilterSidebar
            name={searchInput}
            unit={unit}
            onNameChange={handleNameChange}
            onUnitChange={handleUnitChange}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 9 }}>
          <Stack gap='xl'>
            <Title order={1}>Search Results</Title>
            {(query || unit) && (
              <Text c='dimmed'>
                Showing results for:{' '}
                {query && (
                  <>
                    Name: <strong>{query}</strong>
                  </>
                )}
                {query && unit && ' and '}
                {unit && (
                  <>
                    Unit: <strong>{unit}</strong>
                  </>
                )}
              </Text>
            )}

            {loading && (
              <Center py='xl'>
                <Loader size='xl' />
              </Center>
            )}

            {error && (
              <Text c='red' ta='center' py='xl'>
                An error occurred while fetching EPDs: {error.message}
              </Text>
            )}

            {data?.epds && (
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing='md'>
                {data.epds.map((epd) => (
                  <EPDCard key={epd.id} epd={epd} />
                ))}
              </SimpleGrid>
            )}

            {data?.epds && data.epds.length === 0 && !loading && (
              <Text ta='center' py='xl' c='dimmed'>
                No EPDs found matching your search.
              </Text>
            )}

            {!query && !unit && !loading && (
              <Text ta='center' py='xl' c='dimmed'>
                Please enter a search term or select a filter.
              </Text>
            )}
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  )
}
