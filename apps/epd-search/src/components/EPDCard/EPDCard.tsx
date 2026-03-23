import { Card, Text, Group, Badge, Stack, UnstyledButton, Title } from '@mantine/core'
import { SearchEpdsQuery } from '@/queries/generated'
import { Link } from 'react-router'

interface EPDCardProps {
  epd: NonNullable<SearchEpdsQuery['epds']>[number]
}

export const EPDCard = ({ epd }: EPDCardProps) => {
  const meta = (epd.metaData as Record<string, any>) || {}
  const manufacturer = meta.manufacturer || 'Unknown'
  const dataQuality = meta.data_quality || 'Unknown'

  return (
    <UnstyledButton component={Link} to={`/epd/${epd.id}`} style={{ display: 'block' }}>
      <Card shadow='sm' padding='lg' radius='md' withBorder>
        <Stack gap='xs'>
          <Group justify='space-between'>
            <Title order={4} size='lg' style={{ flex: 1 }}>
              {epd.name}
            </Title>
            <Badge color='blue' variant='light'>
              {epd.subtype}
            </Badge>
          </Group>

          <Text size='sm' c='dimmed'>
            Manufacturer: <strong>{manufacturer}</strong>
          </Text>

          <Group gap='sm'>
            <Badge variant='outline' color='gray'>
              {epd.location}
            </Badge>
            <Badge variant='outline' color='gray'>
              {epd.declaredUnit}
            </Badge>
            <Badge variant='outline' color='orange'>
              Quality: {dataQuality}
            </Badge>
          </Group>
        </Stack>
      </Card>
    </UnstyledButton>
  )
}
