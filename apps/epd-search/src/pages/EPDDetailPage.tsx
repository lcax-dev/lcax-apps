import { useParams, Link } from 'react-router'
import {
  Container,
  Title,
  Text,
  Stack,
  Group,
  Badge,
  Card,
  SimpleGrid,
  Table,
  Loader,
  Center,
  Button,
} from '@mantine/core'
import { useGetEpdQuery } from '@/queries/generated'

export const EPDDetailPage = () => {
  const { id } = useParams<{ id: string }>()

  const { data, loading, error } = useGetEpdQuery({
    variables: { id: id || '' },
    skip: !id,
  })

  if (loading) {
    return (
      <Center py={100}>
        <Loader size='xl' />
      </Center>
    )
  }

  if (error || !data?.epds?.[0]) {
    return (
      <Container size='md' py={100}>
        <Stack align='center'>
          <Title order={2}>EPD Not Found</Title>
          <Text c='dimmed'>The EPD you are looking for does not exist or an error occurred.</Text>
          <Button component={Link} to='/results'>
            Back to Search
          </Button>
        </Stack>
      </Container>
    )
  }

  const epd = data.epds[0]
  const meta = (epd.metaData as Record<string, any>) || {}

  const impacts = [
    { name: 'Global Warming Potential (GWP)', key: 'gwp', unit: 'kg CO2e' },
    { name: 'Ozone Depletion Potential (ODP)', key: 'odp', unit: 'kg CFC11e' },
    { name: 'Acidification Potential (AP)', key: 'ap', unit: 'mol H+e' },
    { name: 'Eutrophication Potential (EP)', key: 'ep', unit: 'kg Pe' },
    { name: 'Photochemical Ozone Creation Potential (POCP)', key: 'pocp', unit: 'kg NMVOCe' },
    { name: 'Abiotic Depletion Potential for non-fossil resources (ADPE)', key: 'adpe', unit: 'kg Sbe' },
    { name: 'Abiotic Depletion Potential for fossil resources (ADPF)', key: 'adpf', unit: 'MJ' },
  ]

  return (
    <Container size='lg' py={50}>
      <Stack gap='xl'>
        <Group justify='space-between' align='flex-start'>
          <Stack gap='xs'>
            <Button variant='subtle' component={Link} to='/results' size='xs' p={0}>
              ← Back to results
            </Button>
            <Title order={1}>{epd.name}</Title>
            <Group gap='xs'>
              <Badge color='blue' variant='light'>
                {epd.subtype}
              </Badge>
              <Badge variant='outline' color='gray'>
                {epd.location}
              </Badge>
              <Badge variant='outline' color='gray'>
                {epd.declaredUnit}
              </Badge>
            </Group>
          </Stack>
          {epd.source?.url && (
            <Button component='a' href={epd.source.url} target='_blank' variant='outline'>
              View Source EPD
            </Button>
          )}
        </Group>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing='xl'>
          <Card withBorder padding='lg' radius='md'>
            <Title order={3} mb='md'>
              General Information
            </Title>
            <Table verticalSpacing='sm'>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td fw={500}>Manufacturer</Table.Td>
                  <Table.Td>{meta.manufacturer || 'Unknown'}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td fw={500}>EPD ID</Table.Td>
                  <Table.Td>{epd.epdId || 'N/A'}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td fw={500}>Published Date</Table.Td>
                  <Table.Td>{epd.publishedDate || 'N/A'}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td fw={500}>Valid Until</Table.Td>
                  <Table.Td>{epd.validUntil || 'N/A'}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td fw={500}>Standard</Table.Td>
                  <Table.Td>{epd.standard || 'Unknown'}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td fw={500}>Data Quality</Table.Td>
                  <Table.Td>{meta.data_quality || 'Unknown'}</Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </Card>

          <Card withBorder padding='lg' radius='md'>
            <Title order={3} mb='md'>
              Conversions
            </Title>
            {epd.conversions && epd.conversions.length > 0 ? (
              <Table verticalSpacing='sm'>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>To Unit</Table.Th>
                    <Table.Th>Factor</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {epd.conversions.map((conv, index) => (
                    <Table.Tr key={index}>
                      <Table.Td>{conv?.to}</Table.Td>
                      <Table.Td>{conv?.value}</Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            ) : (
              <Text c='dimmed'>No conversion data available.</Text>
            )}
          </Card>
        </SimpleGrid>

        <Card withBorder padding='lg' radius='md'>
          <Title order={3} mb='md'>
            Environmental Impacts (A1-A3)
          </Title>
          <Table verticalSpacing='sm' horizontalSpacing='md' highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Impact Category</Table.Th>
                <Table.Th>Unit</Table.Th>
                <Table.Th ta='right'>Value (A1-A3)</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {impacts.map((impact) => {
                const value = (epd.impacts as any)?.[impact.key]?.a1a3
                return (
                  <Table.Tr key={impact.key}>
                    <Table.Td>{impact.name}</Table.Td>
                    <Table.Td>{impact.unit}</Table.Td>
                    <Table.Td ta='right' fw={500}>
                      {value !== undefined ? value.toExponential(4) : 'N/A'}
                    </Table.Td>
                  </Table.Tr>
                )
              })}
            </Table.Tbody>
          </Table>
        </Card>
      </Stack>
    </Container>
  )
}
