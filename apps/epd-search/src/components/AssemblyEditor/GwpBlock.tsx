import { Divider, Group, Stack, Text, Title } from '@mantine/core'
import { formatGwpLabel } from './formatGwpLabel'

type GwpBlockProps = {
  label: string
  value: number | null
}

export const GwpBlock = ({ label, value }: GwpBlockProps) => {
  const display = formatGwpLabel(value)
  return (
    <Stack gap='xs'>
      <Text>{label}</Text>
      <Divider />
      <Group align='end'>
        <Title order={3}>{display}</Title>
        {display !== '—' ? <Text>kg CO2e</Text> : null}
      </Group>
    </Stack>
  )
}
