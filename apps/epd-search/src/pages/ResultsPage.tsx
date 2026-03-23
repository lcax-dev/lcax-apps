import { Container, Title, Stack, Text, Loader, Center, SimpleGrid } from '@mantine/core'
import { useSearchParams } from 'react-router'
import { useSearchEpdsQuery } from '@/queries/generated'
import { EPDCard } from '@/components'

export const ResultsPage = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  const { data, loading, error } = useSearchEpdsQuery({
    variables: {
      where: {
        name: { contains: query },
      },
      limit: 50,
    },
    skip: !query,
  })

  return (
    <Container size='md' py={50}>
      <Stack gap='xl'>
        <Title order={1}>Search Results</Title>
        <Text c='dimmed'>
          Showing results for: <strong>{query}</strong>
        </Text>

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
    </Container>
  )
}
