import { Divider, Group, Stack, Text, Title } from '@mantine/core'
import { ReactNode } from 'react'

interface InfoBlockProps {
  title: string
  info?: number | string | ReactNode | null
  unit?: string
}

export const InfoBlock = ({ title, info, unit }: InfoBlockProps) => (
  <Stack gap='xs'>
    <Text>{title}</Text>
    <Divider />
    <Group align='end'>
      {typeof info === 'string' || typeof info === 'number' ? (
        <Title order={3}>{info || `No ${title} Given`}</Title>
      ) : (
        info || <Title order={3}>No {title} Given</Title>
      )}
      {info && unit ? <Text>{unit}</Text> : null}
    </Group>
  </Stack>
)
