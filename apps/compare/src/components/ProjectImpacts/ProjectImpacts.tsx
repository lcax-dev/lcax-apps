import { Project } from 'lcax'
import { Container, Divider, rem, Title, useMatches } from '@mantine/core'
import { BarChart } from '@mantine/charts'

interface ProjectImpactsProps {
  project: Project | undefined
}

export const ProjectImpacts = ({ project }: ProjectImpactsProps) => {
  const titleSize = useMatches({ md: rem(46), xl: rem(64) })
  const containerSize = useMatches({ md: 'md', xl: 'xl' })

  if (!project) return null

  return (
    <Container size={containerSize}>
      <Title size={titleSize}>Detailed Information</Title>
      <Divider />
      <Title order={2} mt='xl' pt='xl'>
        Impacts by Building Component
      </Title>
      <BarChart
        h={200}
        data={[{ month: 'January', project1: 900, project2: 600, project3: 200, project4: 300 }]}
        dataKey='month'
        series={[
          { name: 'project1', color: 'yellow.4' },
          { name: 'project2', color: 'gray.8' },
          { name: 'project3', color: 'gray.3' },
          { name: 'project4', color: 'white' },
        ]}
        orientation='vertical'
        tickLine='none'
        gridAxis='none'
        type='stacked'
        barChartProps={{ barGap: 20 }}
        withXAxis={false}
        withYAxis={false}
        withTooltip={false}
      />
      <Title order={2} mt='xl' pt='xl'>
        Impacts by Life Cycle Stage
      </Title>
      <BarChart
        h={200}
        data={[{ month: 'January', project1: 900, project2: 600, project3: 200, project4: 300 }]}
        dataKey='month'
        series={[
          { name: 'project1', color: 'yellow.4' },
          { name: 'project2', color: 'gray.8' },
          { name: 'project3', color: 'gray.3' },
          { name: 'project4', color: 'white' },
        ]}
        orientation='vertical'
        tickLine='none'
        gridAxis='none'
        type='stacked'
        barChartProps={{ barGap: 20 }}
        withXAxis={false}
        withYAxis={false}
        withTooltip={false}
      />
    </Container>
  )
}
