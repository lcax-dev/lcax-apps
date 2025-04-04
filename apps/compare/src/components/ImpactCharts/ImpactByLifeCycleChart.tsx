import { Center, Text, Title } from '@mantine/core'
import { BarChart } from '@mantine/charts'
import { useMemo } from 'react'
import { Project } from 'lcax'
import { useMatches } from '@lcax/ui'
import { formatLifeCycleModules, resultsByLifeCycle } from '@/lib'
import { ImpactTooltip } from '@/components/ImpactCharts/ImpactTooltip'
import { TooltipPayload } from '@/components/ImpactCharts/types'

interface ImpactByLifeCycleChartProps {
  project: Project
}

export const ImpactByLifeCycleChart = ({ project }: ImpactByLifeCycleChartProps) => {
  const data = useMemo(() => {
    if (!project.results?.gwp) return null
    return Object.entries(resultsByLifeCycle({ project }))
      .toSorted((prev, next) => (prev[0] > next[0] ? -1 : 1))
      .reduce(
        (acc, next) => ({
          ...acc,
          [formatLifeCycleModules(next[0])]: next[1],
        }),
        {},
      )
  }, [project])
  const projectColor = useMemo(() => project.metaData?.color || 'green', [project])
  const series = useMemo(
    () =>
      Object.keys(project?.results?.gwp || {})
        .toSorted()
        .map((key, index) => ({
          name: formatLifeCycleModules(key),
          color: `${projectColor}.${index % 10}`,
        })),
    [project, projectColor],
  )
  const height = useMatches({ base: '40vh', xxl: '20vh' })

  return (
    <>
      <Title order={2} mt='xl' pt='xl'>
        Impacts by Life Cycle Stage
      </Title>
      {!data ? (
        <Center h={height}>
          <Text>No Impact Results Found</Text>
        </Center>
      ) : (
        <BarChart
          h={height}
          data={[data]}
          dataKey='impact'
          series={series}
          orientation='vertical'
          tickLine='none'
          gridAxis='none'
          type='stacked'
          barChartProps={{ barGap: 20, stackOffset: 'sign' }}
          withXAxis={true}
          xAxisProps={{ domain: ['dataMin', 'dataMax'] }}
          withYAxis={false}
          valueFormatter={(value) => value.toFixed(2)}
          withBarValueLabel
          valueLabelProps={{ position: 'inside', fill: 'black' }}
          withLegend
          legendProps={{ verticalAlign: 'bottom', height: 75 }}
          xAxisLabel='Impact (kg CO₂-eq/m²·year)'
          tooltipProps={{
            content: ({ payload }) => <ImpactTooltip payload={payload as TooltipPayload[]} breakdown={'Life Cycle'} />,
          }}
        />
      )}
    </>
  )
}
