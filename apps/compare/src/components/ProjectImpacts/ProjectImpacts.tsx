import { Project } from 'lcax'
import { Container, Divider, Title, useMatches } from '@mantine/core'
import { ImpactByComponentChart, ImpactByLifeCycleChart } from '@/components/ImpactCharts'
import { ErrorBoundary } from '@lcax/ui'

interface ProjectImpactsProps {
  project: Project | undefined
}

export const ProjectImpacts = ({ project }: ProjectImpactsProps) => {
  const containerSize = useMatches({ md: 'md', xl: 'xxl' })

  if (!project) return null

  return (
    <Container size={containerSize}>
      <Title>Detailed Information</Title>
      <Divider />
      <ErrorBoundary>
        <ImpactByComponentChart project={project} />
      </ErrorBoundary>
      <ErrorBoundary>
        <ImpactByLifeCycleChart project={project} />
      </ErrorBoundary>
    </Container>
  )
}
