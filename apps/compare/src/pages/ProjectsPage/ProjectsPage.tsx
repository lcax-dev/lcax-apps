import { Container } from '@mantine/core'
import { CompareSection, FAQSection, ProjectSection, UploadSection } from '@/components'
import { useProjects } from '@/contexts'
import { ErrorBoundary } from '@lcax/ui'

export const ProjectsPage = () => {
  const { projects } = useProjects()

  return (
    <Container fluid bg={'grey.0'} p={0}>
      <ErrorBoundary>
        <UploadSection />
      </ErrorBoundary>
      <Container fluid bg={'grey.1'} p={0} mt='xl'>
        {projects.map((project, index) => (
          <ErrorBoundary key={index}>
            <ProjectSection project={project} index={index} />
          </ErrorBoundary>
        ))}
      </Container>
      <ErrorBoundary>
        <Container fluid bg={'grey.1'} p={0}>
          <CompareSection />
        </Container>
      </ErrorBoundary>
      <ErrorBoundary>
        <FAQSection />
      </ErrorBoundary>
    </Container>
  )
}
