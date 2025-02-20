import { Container, Divider, rem, Title, useMatches } from '@mantine/core'

export const FAQSection = () => {
  const containerSize = useMatches({ md: 'md', xl: 'xl' })

  return (
    <Container h='100vh' mt='xl' size={containerSize}>
      <Title size={useMatches({ md: rem(46), xl: rem(64) })} id='faq'>
        Frequently Asked Questions
      </Title>
      <Divider mt='sm' mb='xl' />
      <Title order={2}>What files can I upload?</Title>
      <Title order={2}>How do I export a LCAbyg file?</Title>
      <Title order={2}>How do I export a RealTime LCA file?</Title>
      <Title order={2}>Do you steal my data?</Title>
      <Title order={2}>What is LCAx?</Title>
      <Title order={2}>Who is behind this website?</Title>
      <Title order={2}>My project disappeared what happened?</Title>
    </Container>
  )
}
