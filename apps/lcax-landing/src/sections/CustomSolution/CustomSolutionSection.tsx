import { Section } from '@components'
import { Button, Container, Divider, Group, Stack, Text, TextInput, Title } from '@mantine/core'

export const CustomSolutionSection = () => {
  return (
    <Section bg={'black'}>
      <Container h={'100%'} p={0}>
        <Stack h={'100%'} justify={'center'}>
          <Divider variant={'dotted'} size='lg' pb='xl' color={'white'} />
          <Stack pt={'xl'} mt={'xl'}>
            <Text c={'white'}>Custom Solution Request</Text>
            <Title c={'white'} w={'75%'}>
              Are you an ambitious project leader and prefer a custom solution for your organisation?
            </Title>
          </Stack>
          <Stack w={'50%'} justify={'space-between'} mt={'xl'}>
            <TextInput c={'white'} placeholder='Enter your name' />
            <TextInput c={'white'} placeholder='Enter your email' />
            <Group align={'flex-end'}>
              <Button c={'white'} color={'gray.9'}>
                Send
              </Button>
            </Group>
          </Stack>
        </Stack>
      </Container>
    </Section>
  )
}
