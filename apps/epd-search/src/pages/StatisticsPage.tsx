import { Container, Paper, Stack, Text, Title } from '@mantine/core'
import { LCAxStatisticsCard, UploadLCAxData } from '@/components'
import { ErrorBoundary } from '@lcax/ui'

export const StatisticsPage = () => {
  return (
    <Container size='md' py='xl'>
      <Stack gap='xl'>
        <ErrorBoundary>
          <LCAxStatisticsCard />
        </ErrorBoundary>

        <Paper withBorder p='xl' radius='md'>
          <Title order={3} mb='lg'>
            Upload LCAx Data
          </Title>
          <Text size='sm' mb='xl'>
            Upload your EPDs, Assemblies, or Products in LCAx JSON format.
          </Text>
          <ErrorBoundary>
            <UploadLCAxData />
          </ErrorBoundary>
        </Paper>
      </Stack>
    </Container>
  )
}
