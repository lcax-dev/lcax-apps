import { ActionIcon, Container, Group, Menu, Stack, Text, Title, useMatches } from '@mantine/core'
import { useProjects } from '@/contexts'
import { BarChart } from '@mantine/charts'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { resultsByComponents, resultsByLifeCycle, sumResultsProject } from '@/lib'
import { IconChevronDown } from '@tabler/icons-react'
import { CompareSectionTooltip } from './CompareSectionTooltip'
import { breakdownOptions, BreakdownOptions, TooltipPayload } from './types'

export const CompareSection = () => {
  const [breakdown, setBreakdown] = useState<BreakdownOptions>('Total')
  const containerSize = useMatches({ md: 'md', xl: 'xl' })
  const { projects } = useProjects()

  const resultData = useMemo(() => {
    if (breakdown === 'Total') {
      const data = projects
        .map((project) => ({ [project.name]: sumResultsProject(project) }))
        .reduce((acc, curr) => {
          return { ...acc, ...curr }
        }, {})
      return [data]
    } else if (breakdown === 'Building Components') {
      return projects.map((project) => {
        return {
          id: project.id,
          ...Object.entries(resultsByComponents({ project, classificationSystem: 'LCAByg' }))
            .filter(([key]) => key !== 'classificationSystem')
            .toSorted((prev, next) => (prev[0] > next[0] ? -1 : 1))
            .map(([key, value]) => ({ [`${project.id}_${key}`]: value }))
            .reduce((acc, next) => ({ ...acc, ...next }), {}),
        }
      })
    } else if (breakdown === 'Life Cycle') {
      return projects.map((project) => {
        return {
          id: project.id,
          ...Object.entries(resultsByLifeCycle({ project }))
            .filter(([key]) => key !== 'impact')
            .toSorted((prev, next) => (prev[0] > next[0] ? -1 : 1))
            .map(([key, value]) => ({ [`${project.id}_${key}`]: value }))
            .reduce((acc, next) => ({ ...acc, ...next }), {}),
        }
      })
    }
  }, [projects, breakdown])

  const series = useMemo(() => {
    if (breakdown === 'Total') {
      return projects.map((project) => ({
        name: project.name,
        color: `${project.metaData.color}.${project.metaData.color === 'yellow' ? 4 : 9}`,
      }))
    } else if (breakdown === 'Life Cycle' || breakdown === 'Building Components') {
      return resultData
        ?.map((_data) =>
          Object.keys(_data)
            .filter((key) => key !== 'id')
            .map((key, index) => {
              const project = projects.find((project) => project.id === _data.id)!
              return {
                name: key,
                color: `${project.metaData.color}.${index % 10}`,
                stackId: project.id,
              }
            }),
        )
        .reduce((acc, next) => [...acc, ...next], [])
    }
  }, [breakdown, projects, resultData])

  if (projects.length < 2 || !resultData || !series) {
    return null
  }

  return (
    <Container h='100vh' size={containerSize}>
      <Group justify='space-between'>
        <Title>Project Comparison</Title>
        <BreakdownDropdown breakdown={breakdown} setBreakdown={setBreakdown} />
      </Group>
      <Stack justify='center' align='center' h='100%' px='xl'>
        <BarChart
          h={'50vh'}
          data={resultData}
          dataKey={'name'}
          series={series}
          type={breakdown === 'Total' ? undefined : 'stacked'}
          barChartProps={{ barGap: 20, stackOffset: 'sign' }}
          withLegend={breakdown === 'Total'}
          valueFormatter={(value) => value.toFixed(2)}
          legendProps={{ verticalAlign: 'bottom' }}
          yAxisLabel='Impact (kg CO₂-eq/m²·year)'
          tooltipProps={{
            content: ({ payload }) => (
              <CompareSectionTooltip payload={payload as TooltipPayload[]} breakdown={breakdown} />
            ),
          }}
        />
      </Stack>
    </Container>
  )
}

interface BreakdownDropdownProps {
  breakdown: BreakdownOptions
  setBreakdown: Dispatch<SetStateAction<BreakdownOptions>>
}

const BreakdownDropdown = (props: BreakdownDropdownProps) => {
  const { breakdown, setBreakdown } = props

  return (
    <Group justify='flex-end'>
      <Text>Breakdown: {breakdown}</Text>
      <Menu radius={0}>
        <Menu.Target>
          <ActionIcon variant='transparent' color='black'>
            <IconChevronDown />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          {breakdownOptions.map((_breakdown) => (
            <Menu.Item key={_breakdown} onClick={() => setBreakdown(_breakdown)}>
              {_breakdown}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </Group>
  )
}
