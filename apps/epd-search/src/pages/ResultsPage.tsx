import {
  ActionIcon,
  Center,
  Container,
  Divider,
  Grid,
  Loader,
  SimpleGrid,
  Stack,
  Text,
  Title,
  useMatches,
} from '@mantine/core'
import { Link, useSearchParams } from 'react-router'
import { useDebouncedValue } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { useSearchEpdsQuery, CountryEnum, StandardEnum, SubTypeEnum, UnitEnum } from '../queries'
import { EPDCard, FilterSidebar } from '../components'
import { IconArrowBack } from '@tabler/icons-react'

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

  const handleUnitChange = (unitVal: string | null) => {
    const params = new URLSearchParams(searchParams)
    if (unitVal) {
      params.set('unit', unitVal)
    } else {
      params.delete('unit')
    }
    setSearchParams(params)
  }

  const handleLocationChange = (locationVal: string | null) => {
    const params = new URLSearchParams(searchParams)
    if (locationVal) {
      params.set('location', locationVal)
    } else {
      params.delete('location')
    }
    setSearchParams(params)
  }

  const handleSubtypeChange = (subtypeVal: string | null) => {
    const params = new URLSearchParams(searchParams)
    if (subtypeVal) {
      params.set('subtype', subtypeVal)
    } else {
      params.delete('subtype')
    }
    setSearchParams(params)
  }

  const handleStandardChange = (standardVal: string | null) => {
    const params = new URLSearchParams(searchParams)
    if (standardVal) {
      params.set('standard', standardVal)
    } else {
      params.delete('standard')
    }
    setSearchParams(params)
  }

  const handleTypeChange = (typeVal: string) => {
    setTypeInput(typeVal)
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
  const hasFilters = Boolean(query || unit || location || subtype || standard || type || publishedDate || validUntil)

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
                {hasFilters && (
                  <Stack gap='xs'>
                    <Text size='sm'>
                      Active filters:{' '}
                      {[
                        query && `Name: "${query}"`,
                        unit && `Unit: ${unit}`,
                        location && `Location: ${location}`,
                        subtype && `Subtype: ${subtype}`,
                        standard && `Standard: ${standard}`,
                        type && `Type: ${type}`,
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

                {data?.epds && data.epds.length > 0 && (
                  <SimpleGrid cols={{ base: 1, md: 2 }} spacing='xl'>
                    {data.epds.map((epd) => (
                      <EPDCard key={epd.id} epd={epd} />
                    ))}
                  </SimpleGrid>
                )}

                {data?.epds && data.epds.length === 0 && !loading && (
                  <Stack justify='center' align='center' py={80} gap='lg'>
                    <Title order={2}>No EPDs found matching your search.</Title>
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
