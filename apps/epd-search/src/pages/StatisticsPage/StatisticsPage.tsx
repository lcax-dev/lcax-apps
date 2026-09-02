import { Container, Divider, Stack, useMatches } from '@mantine/core'
import { LCAxStatisticsCard, UploadLCAxData } from '@/components'
import { ErrorBoundary } from '@lcax/ui'

export const StatisticsPage = () => {
  const containerSize = useMatches({ md: 'md', xl: 'xl', xxl: 'xxl' })

  return (
    <Container fluid bg='grey.0' p={0} pb='xl'>
      <Container size={containerSize} py='xl'>
        <Stack gap='xl'>
          <ErrorBoundary>
            <LCAxStatisticsCard />
          </ErrorBoundary>

          <Divider my='xl' />

          <ErrorBoundary>
            <UploadLCAxData />
          </ErrorBoundary>
        </Stack>
      </Container>
    </Container>
  )
}
