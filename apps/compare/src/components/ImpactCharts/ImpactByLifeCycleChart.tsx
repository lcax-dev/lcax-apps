import { Title, useMatches } from '@mantine/core'
import { BarChart } from '@mantine/charts'
import { useMemo } from 'react'
import { Project } from 'lcax'
import { resultsByLifeCycle } from '@/lib'

interface ImpactByLifeCycleChartProps {
  project: Project
}

export const ImpactByLifeCycleChart = ({ project }: ImpactByLifeCycleChartProps) => {
  const data = useMemo(() => resultsByLifeCycle({ project }), [project])
  const projectColor = useMemo(() => project.metaData?.color || 'green', [project])
  const series = useMemo(
    () =>
      Object.keys(project?.results.gwp).map((key, index) => ({
        name: key.toUpperCase(),
        color: `${projectColor}.${index % 10}`,
      })),
    [project, projectColor],
  )

  return (
    <>
      <Title order={2} mt='xl' pt='xl'>
        Impacts by Life Cycle Stage
      </Title>
      <BarChart
        h={useMatches({ base: '40vh', xl: '20vh' })}
        data={[data]}
        dataKey='impact'
        series={series}
        orientation='vertical'
        tickLine='none'
        gridAxis='none'
        type='stacked'
        barChartProps={{ barGap: 20, stackOffset: 'sign' }}
        withXAxis={true}
        withYAxis={false}
        unit='kg CO₂-eq/m²·year'
        valueFormatter={(value) => value.toFixed(2)}
        withBarValueLabel
        valueLabelProps={{ position: 'inside', fill: 'black' }}
        withLegend
        legendProps={{ verticalAlign: 'bottom' }}
        xAxisLabel='Impact (kg CO₂-eq/m²·year)'
      />
    </>
  )
}
