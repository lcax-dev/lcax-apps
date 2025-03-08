import { Section } from '@components'
import { Container, Divider, Stack, Text, Title } from '@mantine/core'

export const MembershipSection = () => {
  return (
    <Section bg='black'>
      <Container h='100%' p={0}>
        <Stack h={'100%'} justify={'center'}>
          <Divider variant={'dotted'} size='lg' pb='xl' color={'white'} />
          <Stack pt={'xl'} mt={'xl'}>
            <Title order={3} c='white'>
              Looking for a portfolio overview of all your LCA projects?
            </Title>
            <Title order={1} c='white' mt='xl'>
              Search, validate and compare projects, components and EPDs in our database.
            </Title>
            <Text c='white' w={'50%'}>
              Paid membership of LCAx gives the possibility to store projects from multiple LCA software.
            </Text>
          </Stack>
        </Stack>
      </Container>
    </Section>
  )
}
