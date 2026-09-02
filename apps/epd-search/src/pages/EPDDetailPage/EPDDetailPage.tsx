import { useParams, Link, useLocation } from 'react-router'
import {
  ActionIcon,
  Button,
  Center,
  Container,
  Divider,
  Group,
  Loader,
  SimpleGrid,
  Stack,
  Text,
  Title,
  useMatches,
} from '@mantine/core'
import { resultsBackTo } from '@/lib/resultsBackTo'
import { useGetEpdQuery } from '@/queries'
import { InfoBlock } from '@/components'
import { IconArrowBack, IconArrowLeft, IconArrowUpRight, IconCopy } from '@tabler/icons-react'

type FromResultsState = {
  fromResults?: string
}

export const EPDDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const backTo = resultsBackTo((location.state as FromResultsState | null)?.fromResults)

  const { data, loading, error } = useGetEpdQuery({
    variables: { id: id || '' },
    skip: !id,
  })

  const containerSize = useMatches({ md: 'md', xl: 'xl', xxl: 'xxl' })

  if (loading) {
    return (
      <Container fluid bg='grey.0' p={0}>
        <Center py={100}>
          <Loader size='xl' color='yellow.4' />
        </Center>
      </Container>
    )
  }

  if (error || !data?.epds?.[0]) {
    return (
      <Container fluid bg='grey.0' p={0}>
        <Container size={containerSize} h='100vh'>
          <Stack justify='center' align='center' h='100%' gap='lg'>
            <Title>We can't find the EPD you are looking for!</Title>
            <ActionIcon variant='transparent' component={Link} to={backTo} size='xl'>
              <IconArrowBack size={64} color='black' />
            </ActionIcon>
          </Stack>
        </Container>
      </Container>
    )
  }

  const epd = data.epds[0]
  const meta = (epd.metaData as Record<string, any>) || {}

  const copyEpdUrl = async () => {
    const epdUrl = `${import.meta.env.VITE_BACKEND_URL}/epds/${epd.id}`
    await navigator.clipboard.writeText(epdUrl)
  }

  const impacts = [
    { name: 'Global Warming Potential (GWP)', key: 'gwp', unit: 'kg CO₂-eq' },
    { name: 'Ozone Depletion Potential (ODP)', key: 'odp', unit: 'kg CFC-11-eq' },
    { name: 'Acidification Potential (AP)', key: 'ap', unit: 'mol H⁺-eq' },
    { name: 'Eutrophication Potential (EP)', key: 'ep', unit: 'kg P-eq' },
    { name: 'Photochemical Ozone Creation Potential (POCP)', key: 'pocp', unit: 'kg NMVOC-eq' },
    { name: 'Abiotic Depletion Potential for non-fossil resources (ADPE)', key: 'adpe', unit: 'kg Sb-eq' },
    { name: 'Abiotic Depletion Potential for fossil resources (ADPF)', key: 'adpf', unit: 'MJ' },
  ]

  return (
    <Container fluid bg='grey.0' p={0} pb='xl'>
      <Container size={containerSize} py='xl'>
        <Stack gap='xl'>
          <Group justify='space-between' align='flex-end'>
            <Stack gap='xs'>
              <Group gap='xs'>
                <ActionIcon variant='transparent' component={Link} to={backTo} size='sm'>
                  <IconArrowLeft color='black' size={18} />
                </ActionIcon>
                <Text size='sm'>Back to results</Text>
              </Group>
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
            <Group gap='md'>
              {epd.source?.url && (
                <Button
                  component='a'
                  href={epd.source.url}
                  target='_blank'
                  variant='filled'
                  color='yellow.4'
                  c='black'
                  size='xl'
                  radius='xl'
                  rightSection={<IconArrowUpRight color='black' />}
                >
                  View Source EPD
                </Button>
              )}
              <Button
                onClick={copyEpdUrl}
                variant='filled'
                color='yellow.4'
                c='black'
                size='xl'
                radius='xl'
                rightSection={<IconCopy color='black' />}
              >
                Copy EPD URL
              </Button>
            </Group>
          </Group>

          <Divider />

          <Stack gap='md'>
            <Title order={2}>General Information</Title>
            <Divider />
            <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing='xl'>
              <InfoBlock title='Manufacturer' info={meta.manufacturer || 'Unknown'} />
              <InfoBlock title='EPD ID' info={epd.id || 'N/A'} />
              <InfoBlock title='Published Date' info={epd.publishedDate || 'N/A'} />
              <InfoBlock title='Valid Until' info={epd.validUntil || 'N/A'} />
              <InfoBlock title='Standard' info={epd.standard || 'Unknown'} />
              <InfoBlock title='Subtype' info={epd.subtype} />
              <InfoBlock title='Location' info={epd.location} />
              <InfoBlock title='Declared Unit' info={epd.declaredUnit} />
            </SimpleGrid>
          </Stack>

          {epd.conversions && epd.conversions.length > 0 && (
            <Stack gap='md'>
              <Title order={2}>Conversions</Title>
              <Divider />
              <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing='xl'>
                <InfoBlock title='Declared Unit' info={epd.declaredUnit} />
                {epd.conversions.map((conv, index) => (
                  <InfoBlock
                    key={index}
                    title={`To ${conv?.to || 'Unit'}`}
                    info={typeof conv?.value === 'number' ? conv.value.toFixed(2) : conv?.value}
                  />
                ))}
              </SimpleGrid>
            </Stack>
          )}

          <Stack gap='md'>
            <Title order={2}>Environmental Impacts (A1-A3)</Title>
            <Divider />
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing='xl'>
              {impacts.map((impact) => {
                const value = (epd.impacts as any)?.[impact.key]?.a1a3
                const formattedValue =
                  typeof value === 'number' ? value.toFixed(2) : value != null ? String(value) : null

                return <InfoBlock key={impact.key} title={impact.name} info={formattedValue} unit={impact.unit} />
              })}
            </SimpleGrid>
          </Stack>
        </Stack>
      </Container>
    </Container>
  )
}
