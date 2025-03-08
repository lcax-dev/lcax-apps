import { useProjects } from '@/contexts'
import { Group, Paper, Text } from '@mantine/core'
import { IconPointFilled } from '@tabler/icons-react'
import { BreakdownOptions, TooltipPayload } from './types'

interface ChartTooltipProps {
  payload: TooltipPayload[] | undefined
  breakdown: BreakdownOptions
}

export const CompareSectionTooltip = ({ payload, breakdown }: ChartTooltipProps) => {
  const { projects } = useProjects()
  if (!payload) return null

  const projectName = projects.find((project) => project.id === payload?.[0]?.payload?.id)?.name || 'N/A'
  return (
    <Paper px='md' py='sm' withBorder shadow='md' radius='md'>
      <Text fw={500} mb={5}>
        {breakdown === 'Total' ? 'Total Impact' : projectName} (kg CO₂-eq/m²·year)
      </Text>
      {payload
        .sort((prev, next) => (prev.name > next.name ? 1 : prev.name > next.name ? -1 : 0))
        .map((item) => (
          <Group>
            <IconPointFilled color={item.color} />
            <Text key={item.name} fz='sm'>
              {breakdown === 'Total' ? item.name : item.name.split('_')[1]}: {item.value.toFixed(2)}
            </Text>
          </Group>
        ))}
    </Paper>
  )
}
