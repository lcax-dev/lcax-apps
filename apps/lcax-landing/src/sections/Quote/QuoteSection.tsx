import { Section } from '@components'
import { Container, Image, SimpleGrid, Stack, Title } from '@mantine/core'
import quoteImage from '../../assets/DSC_7941.jpg'

export const QuoteSection = () => {
  return (
    <Section bg={'grey.0'}>
      <Container h='100%' fluid px={0}>
        <SimpleGrid cols={2}>
          <Image src={quoteImage} radius={0} w='auto' h={'100vh'} />
          <Stack justify={'center'} px='lg'>
            <Title>
              "We're creating this because too many LCA tools can't work together. It's also harder to check if
              calculations meet project requirements.
            </Title>
            <Title>An open format will make teamwork and quality assurance simpler and more reliable."</Title>
          </Stack>
        </SimpleGrid>
      </Container>
    </Section>
  )
}
