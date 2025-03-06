import { Project } from 'lcax'
import { Container, Divider, rem, Title, useMatches } from '@mantine/core'
import { ImpactByComponentChart, ImpactByLifeCycleChart } from '@/components/ImpactCharts'
import { ErrorBoundary } from '@lcax/ui'

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
      <ErrorBoundary>
        <ImpactByComponentChart project={project} />
      </ErrorBoundary>
      <ErrorBoundary>
        <ImpactByLifeCycleChart project={project} />
      </ErrorBoundary>
    </Container>
  )
}
