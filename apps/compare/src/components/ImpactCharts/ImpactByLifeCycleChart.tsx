import { Title, useMatches, Text, Center } from '@mantine/core'
import { BarChart } from '@mantine/charts'
import { useMemo } from 'react'
import { Project } from 'lcax'
import { resultsByLifeCycle } from '@/lib'

interface ImpactByLifeCycleChartProps {
  project: Project
}

export const ImpactByLifeCycleChart = ({ project }: ImpactByLifeCycleChartProps) => {
  const data = useMemo(() => project.results?.gwp ? resultsByLifeCycle({ project }) : null, [project])
  const projectColor = useMemo(() => project.metaData?.color || 'green', [project])
  const series = useMemo(
    () =>
      Object.keys(project?.results?.gwp || {}).map((key, index) => ({
        name: key.toUpperCase(),
        color: `${projectColor}.${index % 10}`,
      })),
    [project, projectColor],
  )
  const height = useMatches({ base: '40vh', xl: '20vh' })

  return (
    <>
      <Title order={2} mt="xl" pt="xl">
        Impacts by Life Cycle Stage
      </Title>
      {!data ? <Center h={height}><Text>No Impact Results Found</Text></Center> :
        <BarChart
          h={height}
          data={[data]}
          dataKey="impact"
          series={series}
          orientation="vertical"
          tickLine="none"
          gridAxis="none"
          type="stacked"
          barChartProps={{ barGap: 20, stackOffset: 'sign' }}
          withXAxis={true}
          withYAxis={false}
          unit="kg CO₂-eq/m²·year"
          valueFormatter={(value) => value.toFixed(2)}
          withBarValueLabel
          valueLabelProps={{ position: 'inside', fill: 'black' }}
          withLegend
          legendProps={{ verticalAlign: 'bottom' }}
          xAxisLabel="Impact (kg CO₂-eq/m²·year)"
        />}
    </>
  )
}
