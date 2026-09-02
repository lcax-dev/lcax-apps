import { Center, Container, Grid, Loader, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { FilterSidebar, SearchResultCard, toSearchResultCard, EPDCard } from '@/components'
import { LCAxKindParam, parseKinds, parseUnit, setKindsParam, setUnitParam } from '@/lib/searchParams.ts'
import { buildSearchVariables } from '@/lib/searchVariables.ts'
import { useSearchQuery } from '@/queries/search.ts'
import { IconArrowBack } from '@tabler/icons-react'
import { useSearchEpdsQuery, CountryEnum, StandardEnum, SubTypeEnum, UnitEnum } from '@/queries'
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

  const containerSize = useMatches({ md: 'md', xl: 'xl', xxl: 'xxl' })
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
    <Container fluid bg='grey.0' p={0} pb='xl'>
      <Container size={containerSize} py='xl'>
        <Stack gap='xl'>
          <div>
            <Text>Results</Text>
            <Title order={1}>Search Results</Title>
          </div>
          <Divider />

          <Grid gutter='xl'>
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
                {hasFilters && (
                  <Stack gap='xs'>
                    <Text size='sm'>
                      Active filters:{' '}
                      {[
                        query && `Name: "${query}"`,
                        kinds && `Type: "${kinds.map(kindLabel).join(', ')}"`,
                        unit && `Unit: ${unit}`,
                        location && `Location: ${location}`,
                        subtype && `Subtype: ${subtype}`,
                        standard && `Standard: ${standard}`,
                        type && `EPD Type: ${type}`,
                        classification && `Classification: ${classification}`,
                        publishedDate && `Published after: ${publishedDate}`,
                        validUntil && `Valid until: ${validUntil}`,
                      ]
                        .filter(Boolean)
                        .join(' · ')}
                    </Text>
                    <Divider />
                  </Stack>
                )}

                {loading && (
                  <Center py='xl'>
                    <Loader size='lg' color='yellow.4' />
                  </Center>
                )}

                {error && (
                  <Text c='red' ta='center' py='xl'>
                    An error occurred while fetching EPDs: {error.message}
                  </Text>
                )}

                {data?.search && (
                  <SimpleGrid cols={{ base: 1, md: 2 }} spacing='xl'>
                    {results.map((result) => (
                      <SearchResultCard key={`${result.kind}-${result.id}`} result={result} />
                    ))}
                  </SimpleGrid>
                )}

            {data?.search && results.length === 0 && !loading && (
              <Stack justify='center' align='center' py={80} gap='lg'>
                <Title order={2}>No LCAx Data found matching your search.</Title>
                <ActionIcon variant='transparent' component={Link} to='/' size='xl'>
                  <IconArrowBack size={64} color='black' />
                </ActionIcon>
              </Stack>
            )}
          </Stack>
        </Grid.Col>
      </Grid>
        </Stack>
      </Container>
    </Container>
  )
}
