import { Stack } from '@mantine/core'
import { useProjects } from '@/contexts'
import { BarChart } from '@mantine/charts'
import { useMemo } from 'react'

export const CompareSection = () => {
  const { projects } = useProjects()
  //const stages = ['a1a3', 'c3', 'c4', 'd']

  const resultData = useMemo(() => {
    return projects
      .map((project) => ({ [project.id]: project.results?.gwp?.a1a3 }))
      .reduce((acc, curr) => {
        return { ...acc, ...curr }
      }, {})
  }, [projects])
  const colors = useMemo(() => ['yellow.4', 'black', 'white'], [])
  const series = useMemo(
    () =>
      projects.map((project, index) => ({
        name: project.id,
        color: colors[index],
      })),
    [colors, projects],
  )
  if (projects.length < 2) {
    return null
  }
  return (
    <Stack bg={'gray.2'} justify='center' align='center' h='100vh'>
      <BarChart
        h={300}
        data={[resultData]}
        dataKey='month'
        series={series}
        tickLine='none'
        gridAxis='none'
        barChartProps={{ barGap: 20 }}
        withXAxis={false}
        withYAxis={false}
        withTooltip={false}
      />
    </Stack>
  )
}
