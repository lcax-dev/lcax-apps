import { Container, Title, Stack, Text, Loader, Center, SimpleGrid, Grid } from '@mantine/core'
import { useSearchParams } from 'react-router'
import { useDebouncedValue } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { useSearchEpdsQuery } from '@/queries'
import { EPDCard, FilterSidebar } from '@/components'
import { CountryEnum, StandardEnum, SubTypeEnum, UnitEnum } from '@/queries/generated/graphql.ts'

export const ResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const unit = searchParams.get('unit') || ''
  const location = searchParams.get('location') || ''
  const subtype = searchParams.get('subtype') || ''
  const standard = searchParams.get('standard') || ''
  const type = searchParams.get('type') || ''
  const publishedDate = searchParams.get('publishedDate') || ''
  const validUntil = searchParams.get('validUntil') || ''

  const [searchInput, setSearchInput] = useState(query)
  const [debouncedQuery] = useDebouncedValue(searchInput, 500)
  const [typeInput, setTypeInput] = useState(type)
  const [debouncedType] = useDebouncedValue(typeInput, 500)

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (debouncedQuery) {
      params.set('q', debouncedQuery)
    } else {
      params.delete('q')
    }
    setSearchParams(params)
  }, [debouncedQuery])

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (debouncedType) {
      params.set('type', debouncedType)
    } else {
      params.delete('type')
    }
    setSearchParams(params)
  }, [debouncedType])

  const { data, loading, error } = useSearchEpdsQuery({
    variables: {
      where: {
        name: query ? { contains: query } : undefined,
        declaredUnit: unit ? { eq: unit as UnitEnum } : undefined,
        location: location ? { eq: location as CountryEnum } : undefined,
        subtype: subtype ? { eq: subtype as SubTypeEnum } : undefined,
        standard: standard ? { eq: standard as StandardEnum } : undefined,
        type: type ? { contains: type } : undefined,
        publishedDate: publishedDate ? { gte: publishedDate } : undefined,
        validUntil: validUntil ? { lte: validUntil } : undefined,
      },
      limit: 50,
    },
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

  const handleLocationChange = (location: string | null) => {
    const params = new URLSearchParams(searchParams)
    if (location) {
      params.set('location', location)
    } else {
      params.delete('location')
    }
    setSearchParams(params)
  }

  const handleSubtypeChange = (subtype: string | null) => {
    const params = new URLSearchParams(searchParams)
    if (subtype) {
      params.set('subtype', subtype)
    } else {
      params.delete('subtype')
    }
    setSearchParams(params)
  }

  const handleStandardChange = (standard: string | null) => {
    const params = new URLSearchParams(searchParams)
    if (standard) {
      params.set('standard', standard)
    } else {
      params.delete('standard')
    }
    setSearchParams(params)
  }

  const handleTypeChange = (type: string) => {
    setTypeInput(type)
  }

  const handlePublishedDateChange = (date: string) => {
    const params = new URLSearchParams(searchParams)
    if (date) {
      params.set('publishedDate', date)
    } else {
      params.delete('publishedDate')
    }
    setSearchParams(params)
  }

  const handleValidUntilChange = (date: string) => {
    const params = new URLSearchParams(searchParams)
    if (date) {
      params.set('validUntil', date)
    } else {
      params.delete('validUntil')
    }
    setSearchParams(params)
  }

  const hasFilters = query || unit || location || subtype || standard || type || publishedDate || validUntil

  return (
    <Container size='lg' py={50}>
      <Grid gap='xl'>
        <Grid.Col span={{ base: 12, md: 3 }}>
          <FilterSidebar
            name={searchInput}
            unit={unit}
            location={location}
            subtype={subtype}
            standard={standard}
            type={typeInput}
            publishedDate={publishedDate}
            validUntil={validUntil}
            onNameChange={handleNameChange}
            onUnitChange={handleUnitChange}
            onLocationChange={handleLocationChange}
            onSubtypeChange={handleSubtypeChange}
            onStandardChange={handleStandardChange}
            onTypeChange={handleTypeChange}
            onPublishedDateChange={handlePublishedDateChange}
            onValidUntilChange={handleValidUntilChange}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 9 }}>
          <Stack gap='xl'>
            <Title order={1}>Search Results</Title>
            {hasFilters && (
              <Stack gap='xs'>
                <Text c='dimmed'>Showing results for:</Text>
                <Grid>
                  {query && (
                    <Grid.Col span='auto'>
                      <Text size='sm'>
                        Name: <strong>{query}</strong>
                      </Text>
                    </Grid.Col>
                  )}
                  {unit && (
                    <Grid.Col span='auto'>
                      <Text size='sm'>
                        Unit: <strong>{unit}</strong>
                      </Text>
                    </Grid.Col>
                  )}
                  {location && (
                    <Grid.Col span='auto'>
                      <Text size='sm'>
                        Location: <strong>{location}</strong>
                      </Text>
                    </Grid.Col>
                  )}
                  {subtype && (
                    <Grid.Col span='auto'>
                      <Text size='sm'>
                        Subtype: <strong>{subtype}</strong>
                      </Text>
                    </Grid.Col>
                  )}
                  {standard && (
                    <Grid.Col span='auto'>
                      <Text size='sm'>
                        Standard: <strong>{standard}</strong>
                      </Text>
                    </Grid.Col>
                  )}
                  {type && (
                    <Grid.Col span='auto'>
                      <Text size='sm'>
                        Type: <strong>{type}</strong>
                      </Text>
                    </Grid.Col>
                  )}
                  {publishedDate && (
                    <Grid.Col span='auto'>
                      <Text size='sm'>
                        Published After: <strong>{publishedDate}</strong>
                      </Text>
                    </Grid.Col>
                  )}
                  {validUntil && (
                    <Grid.Col span='auto'>
                      <Text size='sm'>
                        Valid Until: <strong>{validUntil}</strong>
                      </Text>
                    </Grid.Col>
                  )}
                </Grid>
              </Stack>
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
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  )
}
