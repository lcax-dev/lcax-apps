import { Divider, Group, Stack, Text, Title } from '@mantine/core'

interface InfoBlockProps {
  title: string
  info?: number | string | null
  unit?: string
}

export const InfoBlock = ({ title, info, unit }: InfoBlockProps) => (
  <Stack gap='xs'>
    <Text>{title}</Text>
    <Divider />
    <Group align='end'>
      <Title order={3}>{info || `No ${title} Given`}</Title>
      <Text>{info && unit ? unit : ''}</Text>
    </Group>
  </Stack>
)
