import { Divider, SimpleGrid, Stack, Title, UnstyledButton } from '@mantine/core'
import { Link } from 'react-router'
import { Epd } from '@/queries/generated/graphql.ts'
import { InfoBlock } from '../InfoBlock'

interface EPDCardProps {
  epd: Epd
}

export const EPDCard = ({ epd }: EPDCardProps) => {
  const meta = (epd.metaData as Record<string, any>) || {}
  const manufacturer = meta.manufacturer || 'Unknown'
  const dataQuality = meta.data_quality || 'Unknown'

  return (
    <UnstyledButton component={Link} to={`/epds/${epd.id}`} style={{ display: 'block', width: '100%' }}>
      <Stack gap='md' py='md'>
        <Title order={3} c='black'>
          {epd.name}
        </Title>
        <Divider />
        <SimpleGrid cols={{ base: 2, sm: 3 }} spacing='md'>
          <InfoBlock title='Manufacturer' info={manufacturer} />
          <InfoBlock title='Subtype' info={epd.subtype} />
          <InfoBlock title='Location' info={epd.location} />
          <InfoBlock title='Declared Unit' info={epd.declaredUnit} />
          <InfoBlock title='Quality' info={dataQuality} />
        </SimpleGrid>
      </Stack>
    </UnstyledButton>
  )
}
