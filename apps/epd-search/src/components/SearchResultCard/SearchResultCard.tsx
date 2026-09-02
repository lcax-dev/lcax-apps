import { Badge, Card, Group, Stack, Text, Title, UnstyledButton } from '@mantine/core'
import { Link, useLocation } from 'react-router'
import { SearchResultCardModel } from './toSearchResultCard'

interface SearchResultCardProps {
  result: SearchResultCardModel
}

export const SearchResultCard = ({ result }: SearchResultCardProps) => {
  const location = useLocation()
  return (
    <UnstyledButton
      component={Link}
      to={result.href}
      state={{ fromResults: `${location.pathname}${location.search}` }}
      style={{ display: 'block' }}
    >
      <Card shadow='sm' padding='lg' radius='md' withBorder>
        <Stack gap='xs'>
          <Group justify='space-between' align='flex-start'>
            <Title order={4} size='lg' style={{ flex: 1 }}>
              {result.name}
            </Title>
            <Badge variant='light' color={result.kind === 'Assembly' ? 'indigo' : 'yellow'}>
              {result.kind}
            </Badge>
          </Group>

          {result.kind === 'EPD' && (
            <Text size='sm' c='dimmed'>
              Manufacturer: <strong>{result.manufacturer}</strong>
            </Text>
          )}

          <Group gap='sm'>
            {result.unit && (
              <Badge variant='outline' color='gray'>
                {result.unit}
              </Badge>
            )}
            {result.kind === 'EPD' && result.subtype && (
              <Badge variant='light' color='blue'>
                {result.subtype}
              </Badge>
            )}
            {result.kind === 'EPD' && result.location && (
              <Badge variant='outline' color='gray'>
                {result.location}
              </Badge>
            )}
            {result.kind === 'Assembly' && result.classification && (
              <Badge variant='outline' color='gray'>
                {result.classification}
              </Badge>
            )}
          </Group>
        </Stack>
      </Card>
    </UnstyledButton>
  )
}
