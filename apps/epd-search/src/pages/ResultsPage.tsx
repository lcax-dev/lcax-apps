import { Center, Container, Grid, Loader, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { FilterSidebar, SearchResultCard, toSearchResultCard } from '@/components'
import { LCAxKindParam, parseKinds, parseUnit, setKindsParam, setUnitParam } from '@/lib/searchParams.ts'
import { buildSearchVariables } from '@/lib/searchVariables.ts'
import { useSearchQuery } from '@/queries/search.ts'

const kindLabel = (kind: LCAxKindParam) => (kind === 'ASSEMBLY' ? 'Assembly' : 'EPD')

export const ResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const kinds = parseKinds(searchParams)
  const unit = parseUnit(searchParams)
  const location = searchParams.get('location') || ''
  const subtype = searchParams.get('subtype') || ''
  const standard = searchParams.get('standard') || ''
  const type = searchParams.get('type') || ''
  const classification = searchParams.get('classification') || ''
  const publishedDate = searchParams.get('publishedDate') || ''
  const validUntil = searchParams.get('validUntil') || ''

  const [searchInput, setSearchInput] = useState(query)
  const [debouncedQuery] = useDebouncedValue(searchInput, 500)
  const [typeInput, setTypeInput] = useState(type)
  const [debouncedType] = useDebouncedValue(typeInput, 500)
  const [classificationInput, setClassificationInput] = useState(classification)
  const [debouncedClassification] = useDebouncedValue(classificationInput, 500)

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

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (debouncedClassification) {
      params.set('classification', debouncedClassification)
    } else {
      params.delete('classification')
    }
    setSearchParams(params)
  }, [debouncedClassification])

  const { data, loading, error } = useSearchQuery({
    variables: buildSearchVariables(searchParams),
  })

  const results = data?.search.map(toSearchResultCard).filter((result) => result !== null) ?? []

  const handleNameChange = (name: string) => {
    setSearchInput(name)
  }

  const handleKindsChange = (next: LCAxKindParam[]) => {
    const params = new URLSearchParams(searchParams)
    setKindsParam(params, next)
    setSearchParams(params)
  }

  const handleUnitChange = (nextUnit: string | null) => {
    const params = new URLSearchParams(searchParams)
    setUnitParam(params, nextUnit)
    setSearchParams(params)
  }

  const handleLocationChange = (nextLocation: string | null) => {
    const params = new URLSearchParams(searchParams)
    if (nextLocation) {
      params.set('location', nextLocation)
    } else {
      params.delete('location')
    }
    setSearchParams(params)
  }

  const handleSubtypeChange = (nextSubtype: string | null) => {
    const params = new URLSearchParams(searchParams)
    if (nextSubtype) {
      params.set('subtype', nextSubtype)
    } else {
      params.delete('subtype')
    }
    setSearchParams(params)
  }

  const handleStandardChange = (nextStandard: string | null) => {
    const params = new URLSearchParams(searchParams)
    if (nextStandard) {
      params.set('standard', nextStandard)
    } else {
      params.delete('standard')
    }
    setSearchParams(params)
  }

  const handleTypeChange = (nextType: string) => {
    setTypeInput(nextType)
  }

  const handleClassificationChange = (nextClassification: string) => {
    setClassificationInput(nextClassification)
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

  const hasFilters =
    query ||
    kinds.length > 0 ||
    unit ||
    location ||
    subtype ||
    standard ||
    type ||
    classification ||
    publishedDate ||
    validUntil

  return (
    <Container size='lg' py={50}>
      <Grid gap='xl'>
        <Grid.Col span={{ base: 12, md: 3 }}>
          <FilterSidebar
            name={searchInput}
            kinds={kinds}
            unit={unit}
            location={location}
            subtype={subtype}
            standard={standard}
            type={typeInput}
            classification={classificationInput}
            publishedDate={publishedDate}
            validUntil={validUntil}
            onNameChange={handleNameChange}
            onKindsChange={handleKindsChange}
            onUnitChange={handleUnitChange}
            onLocationChange={handleLocationChange}
            onSubtypeChange={handleSubtypeChange}
            onStandardChange={handleStandardChange}
            onTypeChange={handleTypeChange}
            onClassificationChange={handleClassificationChange}
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
                  {kinds.length > 0 && (
                    <Grid.Col span='auto'>
                      <Text size='sm'>
                        Type: <strong>{kinds.map(kindLabel).join(', ')}</strong>
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
                        EPD type: <strong>{type}</strong>
                      </Text>
                    </Grid.Col>
                  )}
                  {classification && (
                    <Grid.Col span='auto'>
                      <Text size='sm'>
                        Classification: <strong>{classification}</strong>
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
                An error occurred while searching: {error.message}
              </Text>
            )}

            {data?.search && (
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing='md'>
                {results.map((result) => (
                  <SearchResultCard key={`${result.kind}-${result.id}`} result={result} />
                ))}
              </SimpleGrid>
            )}

            {data?.search && results.length === 0 && !loading && (
              <Text ta='center' py='xl' c='dimmed'>
                No LCAx Data found matching your search.
              </Text>
            )}
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  )
}
