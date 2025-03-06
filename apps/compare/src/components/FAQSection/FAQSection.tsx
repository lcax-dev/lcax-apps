import { Accordion, Container, Divider, rem, Stack, Title, useMatches } from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons-react'

const faqs = [
  {
    value: 'What files can I upload?',
    description:
      'Crisp and refreshing fruit. Apples are known for their versatility and nutritional benefits. They come in a variety of flavors and are great for snacking, baking, or adding to salads.',
  },
  {
    value: 'How do I export a LCAbyg file?',
    description:
      'Naturally sweet and potassium-rich fruit. Bananas are a popular choice for their energy-boosting properties and can be enjoyed as a quick snack, added to smoothies, or used in baking.',
  },
  {
    value: 'How do I export a Real-Time LCA file?',
    description:
      'Nutrient-packed green vegetable. Broccoli is packed with vitamins, minerals, and fiber. It has a distinct flavor and can be enjoyed steamed, roasted, or added to stir-fries.',
  },
  {
    value: 'Do you steal my data?',
    description:
      'Crisp and refreshing fruit. Apples are known for their versatility and nutritional benefits. They come in a variety of flavors and are great for snacking, baking, or adding to salads.',
  },
  {
    value: 'What is LCAx?',
    description:
      'Naturally sweet and potassium-rich fruit. Bananas are a popular choice for their energy-boosting properties and can be enjoyed as a quick snack, added to smoothies, or used in baking.',
  },
  {
    value: 'Who is behind this website?',
    description:
      'Nutrient-packed green vegetable. Broccoli is packed with vitamins, minerals, and fiber. It has a distinct flavor and can be enjoyed steamed, roasted, or added to stir-fries.',
  },
  {
    value: 'My project(s) disappeared what happened?',
    description:
      'Nutrient-packed green vegetable. Broccoli is packed with vitamins, minerals, and fiber. It has a distinct flavor and can be enjoyed steamed, roasted, or added to stir-fries.',
  },
  {
    value: "I can't upload projects on mobile",
    description:
      'Nutrient-packed green vegetable. Broccoli is packed with vitamins, minerals, and fiber. It has a distinct flavor and can be enjoyed steamed, roasted, or added to stir-fries.',
  },
]

export const FAQSection = () => {
  const containerSize = useMatches({ md: 'md', xl: 'xl' })

  const items = faqs.map((faq) => (
    <Accordion.Item key={faq.value} value={faq.value}>
      <Accordion.Control icon={<IconInfoCircle />}>{faq.value}</Accordion.Control>
      <Accordion.Panel>{faq.description}</Accordion.Panel>
    </Accordion.Item>
  ))

  return (
    <Container h='100vh' size={containerSize}>
      <Stack h='100%' justify='center'>
        <Title size={useMatches({ md: rem(46), xl: rem(64) })} id='faq'>
          Frequently Asked Questions
        </Title>
        <Divider mt='sm' mb='xl' />
        <Accordion defaultValue={null}>{items}</Accordion>
      </Stack>
    </Container>
  )
}
