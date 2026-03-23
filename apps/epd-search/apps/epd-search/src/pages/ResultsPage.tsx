import { Container, Title, Stack, Text, List, Loader, Center } from '@mantine/core'
import { useSearchParams } from 'react-router'
import { useSearchEpdsQuery } from '@/queries/generated'

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
        <Text color='dimmed'>
          Showing results for: <strong>{query}</strong>
        </Text>

        {loading && (
          <Center py='xl'>
            <Loader size='xl' />
          </Center>
        )}

        {error && (
          <Text color='red' ta='center' py='xl'>
            An error occurred while fetching EPDs: {error.message}
          </Text>
        )}

        {data?.epds && (
          <List spacing='md' size='sm' center>
            {data.epds.map((epd) => (
              <List.Item key={epd.id}>
                <Text fw={500}>{epd.name}</Text>
                <Text size='xs' color='dimmed'>
                  {epd.subtype} • {epd.location} • {epd.declaredUnit}
                </Text>
              </List.Item>
            ))}
          </List>
        )}

        {data?.epds && data.epds.length === 0 && !loading && (
          <Text ta='center' py='xl' color='dimmed'>
            No EPDs found matching your search.
          </Text>
        )}
      </Stack>
    </Container>
  )
}
