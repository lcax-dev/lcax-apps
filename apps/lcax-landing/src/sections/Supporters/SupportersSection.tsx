import { Section } from '@components'
import { Container, Stack, Title } from '@mantine/core'

export const SupportersSection = () => {
  return (
    <Section bg={'grey.0'}>
      <Container h={'100%'}>
        <Stack justify={'center'} h={'100%'}>
          <Title>Who is using LCAx?</Title>
        </Stack>
      </Container>
    </Section>
  )
}
