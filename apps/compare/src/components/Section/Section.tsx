import { ReactNode } from 'react'
import { Container } from '@mantine/core'

interface SectionProps {
  children: ReactNode
  bg?: string
}
export const Section = (props: SectionProps) => {
  const { children, bg } = props

  return (
    <Container bg={bg} h={'100vh'} fluid p={0}>
      {children}
    </Container>
  )
}
