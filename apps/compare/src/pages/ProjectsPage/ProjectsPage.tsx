import { Container } from '@mantine/core'
import { CompareSection, ProjectSection, UploadSection, FAQSection } from '@/components'
import { useProjects } from '@/contexts'
import { ErrorBoundary } from '@lcax/ui'

export const ProjectsPage = () => {
  const { projects } = useProjects()

  return (
    <Container fluid bg={'gray.0'} p={0}>
      <ErrorBoundary>
        <UploadSection />
      </ErrorBoundary>
      {projects.map((project, index) => (
        <ErrorBoundary key={index}>
          <ProjectSection project={project} index={index} />
        </ErrorBoundary>
      ))}
      <ErrorBoundary>
        <CompareSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <FAQSection />
      </ErrorBoundary>
    </Container>
  )
}
