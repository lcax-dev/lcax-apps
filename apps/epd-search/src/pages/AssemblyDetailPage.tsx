import { Link, useLocation, useParams } from 'react-router'
import { Anchor, Badge, Button, Card, Center, Container, Group, Loader, Stack, Table, Text, Title } from '@mantine/core'
import { resultsBackTo } from '@/lib/resultsBackTo'
import { useGetAssemblyQuery } from '@/queries/assemblies'
import { toAssemblyProductRows } from './toAssemblyProductRows'

const IMPACTS = [
  { name: 'Global Warming Potential (GWP)', key: 'gwp', unit: 'kg CO2e' },
  { name: 'Ozone Depletion Potential (ODP)', key: 'odp', unit: 'kg CFC11e' },
  { name: 'Acidification Potential (AP)', key: 'ap', unit: 'mol H+e' },
  { name: 'Eutrophication Potential (EP)', key: 'ep', unit: 'kg Pe' },
  { name: 'Photochemical Ozone Creation Potential (POCP)', key: 'pocp', unit: 'kg NMVOCe' },
  { name: 'Abiotic Depletion Potential for non-fossil resources (ADPE)', key: 'adpe', unit: 'kg Sbe' },
  { name: 'Abiotic Depletion Potential for fossil resources (ADPF)', key: 'adpf', unit: 'MJ' },
] as const

type FromResultsState = {
  fromResults?: string
}

const formatQuantity = (value: number | null): string => {
  if (value == null) return 'N/A'
  return Number.isInteger(value) ? String(value) : value.toString()
}

export const AssemblyDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const backTo = resultsBackTo((location.state as FromResultsState | null)?.fromResults)

  const { data, loading, error } = useGetAssemblyQuery({
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

  if (error || !data?.assemblies?.[0]) {
    return (
      <Container size='md' py={100}>
        <Stack align='center'>
          <Title order={2}>Assembly Not Found</Title>
          <Text c='dimmed'>The Assembly you are looking for does not exist or an error occurred.</Text>
          <Button component={Link} to={backTo}>
            Back to Search
          </Button>
        </Stack>
      </Container>
    )
  }

  const assembly = data.assemblies[0]
  const productRows = toAssemblyProductRows(assembly.products)
  const classifications = (assembly.classification ?? []).filter((entry) => entry?.name)
  const results = assembly.results as Record<string, { a1a3?: number | null } | null> | null

  const copyAssemblyId = async () => {
    await navigator.clipboard.writeText(assembly.id)
  }

  return (
    <Container size='lg' py={50}>
      <Stack gap='xl'>
        <Group justify='space-between' align='flex-start'>
          <Stack gap='xs'>
            <Button variant='subtle' component={Link} to={backTo} size='xs' p={0}>
              ← Back to results
            </Button>
            <Title order={1}>{assembly.name}</Title>
            <Group gap='xs'>
              <Badge color='indigo' variant='light'>
                Assembly
              </Badge>
              <Badge variant='outline' color='gray'>
                {formatQuantity(assembly.quantity)} {assembly.unit}
              </Badge>
              {classifications.map((entry) => (
                <Badge key={`${entry?.system ?? ''}-${entry?.code ?? entry?.name}`} variant='outline' color='gray'>
                  {entry?.name}
                </Badge>
              ))}
            </Group>
          </Stack>
          <Button onClick={copyAssemblyId} variant='outline'>
            Copy ID
          </Button>
        </Group>

        {assembly.description ? <Text>{assembly.description}</Text> : null}

        <Card withBorder padding='lg' radius='md'>
          <Title order={3} mb='md'>
            Composition
          </Title>
          {productRows.length > 0 ? (
            <Table verticalSpacing='sm' horizontalSpacing='md' highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Product</Table.Th>
                  <Table.Th>Quantity</Table.Th>
                  <Table.Th>Unit</Table.Th>
                  <Table.Th>Impact EPD</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {productRows.map((product) => (
                  <Table.Tr key={product.key}>
                    <Table.Td>{product.name}</Table.Td>
                    <Table.Td>{formatQuantity(product.quantity)}</Table.Td>
                    <Table.Td>{product.unit || 'N/A'}</Table.Td>
                    <Table.Td>
                      {product.impactEpds.length > 0 ? (
                        <Stack gap={4}>
                          {product.impactEpds.map((epd) => (
                            <Anchor key={epd.id} component={Link} to={epd.href} size='sm'>
                              {epd.name}
                            </Anchor>
                          ))}
                        </Stack>
                      ) : (
                        <Text c='dimmed' size='sm'>
                          —
                        </Text>
                      )}
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          ) : (
            <Text c='dimmed'>No products in this assembly.</Text>
          )}
        </Card>

        <Card withBorder padding='lg' radius='md'>
          <Title order={3} mb='md'>
            Results (A1-A3)
          </Title>
          {results ? (
            <Table verticalSpacing='sm' horizontalSpacing='md' highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Impact Category</Table.Th>
                  <Table.Th>Unit</Table.Th>
                  <Table.Th ta='right'>Value (A1-A3)</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {IMPACTS.map((impact) => {
                  const value = results[impact.key]?.a1a3
                  return (
                    <Table.Tr key={impact.key}>
                      <Table.Td>{impact.name}</Table.Td>
                      <Table.Td>{impact.unit}</Table.Td>
                      <Table.Td ta='right' fw={500}>
                        {value != null ? value.toExponential(4) : 'N/A'}
                      </Table.Td>
                    </Table.Tr>
                  )
                })}
              </Table.Tbody>
            </Table>
          ) : (
            <Text c='dimmed'>No result data available.</Text>
          )}
        </Card>
      </Stack>
    </Container>
  )
}
