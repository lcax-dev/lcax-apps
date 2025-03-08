import { Section } from '@components'
import { Button, Container, Stack, Text, Title } from '@mantine/core'

export const LandingSection = () => {
  return (
    <Section bg={'yellow.4'}>
      <Container h='100%'>
        <Stack h='100%' justify={'space-evenly'} align={'flex-start'}>
          <Stack justify={'center'}>
            <Text>What is LCAx?</Text>
            <Title order={1}>
              Transparent, accessible and open <Title c='white'>LCA projects</Title> for the construction industry.
            </Title>
            <Text>
              The goal for LCAx is to make an open, machine and human-readable data format for exchanging LCA results,
              EPDs and construction components.
            </Text>
          </Stack>
          <Button color='black' variant='outline'>
            Become a member
          </Button>
        </Stack>
      </Container>
    </Section>
  )
}
