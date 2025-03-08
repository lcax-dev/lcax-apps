import { Section } from '@components'
import { Container, Divider, Image, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import computerImage from '../../assets/computer.png'
import lockImage from '../../assets/lock.png'

export const HowDoesItWorkSection = () => {
  return (
    <Section bg={'grey.0'}>
      <Container h='100%'>
        <Stack h='100%' justify={'center'}>
          <Divider variant={'dotted'} size='lg' py='xl' />
          <Stack w={'75%'}>
            <Text>How does it work?</Text>
            <Title order={3}>
              We propose a simple four level data format with information on project, assembly and EPD level, written in
              an open data format and paired with a validator for a more robust and standardized format. We intend to
              create connections to existing tools and API’s.
            </Title>
          </Stack>
          <SimpleGrid cols={3} spacing='md' mt='xl'>
            <div>
              <Image src={computerImage} radius={0} w='auto' h={250} />
              <Title order={2}>Search</Title>
            </div>
            <div>
              <Image src={lockImage} radius={0} w='auto' h={250} />
              <Title order={2}>Validate</Title>
            </div>
            <div>
              <Image src={computerImage} radius={0} w='auto' h={250} />
              <Title order={2}>Compare</Title>
            </div>
          </SimpleGrid>
        </Stack>
      </Container>
    </Section>
  )
}
