import { Section } from '@components'
import { Container, Divider, Stack, Text, Title } from '@mantine/core'

export const DeveloperSection = () => {
  return (
    <Section bg={'grey.0'}>
      <Container h='100%'>
        <Divider variant={'dotted'} pt={'xl'} size={'lg'} />
        <Stack h='100%' justify={'center'}>
          <Title order={3}>A word from the developer:</Title>
          <Title>
            "Without an open data format, teams struggle to collaborate unless everyone uses the same software."
          </Title>
          <Text ta='right' size='sm'>
            Christian Kongsgaard, co-founder and software developer
          </Text>
        </Stack>
      </Container>
    </Section>
  )
}
