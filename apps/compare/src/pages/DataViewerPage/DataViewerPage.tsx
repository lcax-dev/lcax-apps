import { Container } from '@mantine/core'
import { useParams } from 'react-router'
import { useProjects } from '@/contexts'
import { useMemo } from 'react'
import { ErrorBoundary } from '@lcax/ui'
import { DataViewer } from '@/components'

export const DataViewerPage = () => {
  const { projectId } = useParams()
  const { projects } = useProjects()

  const project = useMemo(
    () => (projectId ? projects.find((p) => p.id.startsWith(projectId)) : undefined),
    [projectId, projects],
  )

  return (
    <Container fluid bg={'grey.0'} p={0} pb='xl' mih='100vh'>
      <ErrorBoundary>
        <DataViewer project={project} />
      </ErrorBoundary>
    </Container>
  )
}
