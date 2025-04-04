import { Group, Paper, Text } from '@mantine/core'
import { IconPointFilled } from '@tabler/icons-react'
import { BreakdownOptions, TooltipPayload } from './types'

interface ChartTooltipProps {
  payload: TooltipPayload[] | undefined
  breakdown: BreakdownOptions
}

export const ImpactTooltip = ({ payload, breakdown }: ChartTooltipProps) => {
  if (!payload) return null

  return (
    <Paper px='md' py='sm' withBorder shadow='md' radius='md'>
      <Text fw={500} mb={5}>
        {breakdown} (kg CO₂-eq/m²·year)
      </Text>
      {payload
        .sort((prev, next) => (prev.name > next.name ? 1 : prev.name > next.name ? -1 : 0))
        .map((item, index) => (
          <Group key={index}>
            <IconPointFilled color={item.color} />
            <Text key={item.name} fz='sm'>
              {item.name}: {item.value.toFixed(2)}
            </Text>
          </Group>
        ))}
    </Paper>
  )
}
