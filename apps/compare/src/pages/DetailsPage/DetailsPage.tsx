import { ProjectImage, ProjectImpacts, ProjectInformation } from '@/components'
import { Container } from '@mantine/core'
import { useParams } from 'react-router'
import { useProjects } from '@/contexts'
import { useMemo } from 'react'
import { ErrorBoundary } from '@lcax/ui'

export const DetailsPage = () => {
  const { projectId } = useParams()
  const { projects } = useProjects()

  const project = useMemo(
    () => (projectId ? projects.find((p) => p.id.startsWith(projectId)) : undefined),
    [projectId, projects],
  )
  return (
    <Container fluid bg={'grey.0'} p={0} pb='xl'>
      <ErrorBoundary>
        <ProjectImage project={project} />
      </ErrorBoundary>
      <ErrorBoundary>
        <ProjectInformation project={project} />
      </ErrorBoundary>
      <ErrorBoundary>
        <ProjectImpacts project={project} />
      </ErrorBoundary>
    </Container>
  )
}
