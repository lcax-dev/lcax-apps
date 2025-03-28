import { ActionIcon, Button, Container, FileInput, Image, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { useMatches } from '@lcax/ui'
import { IconArrowUp } from '@tabler/icons-react'
import sbstLogo from '@/assets/sbst-logo.png'
import { Link } from 'react-router'
import { BarChart } from '@mantine/charts'
import { ReactNode } from 'react'

export const LandingPage = () => {
  return (
    <Container fluid bg={'grey.0'} p={0}>
      <TitleSection />
      <UploadSection />
      <ConvertSection />
      <CompareSection />
      <AnalyseSection />
      <GetStartedSection />
      <SponsorSection />
    </Container>
  )
}

const TitleSection = () => {
  return (
    <Container h='100vh' size={useMatches({ base: 'md', xl: 'xl', xxl: 'xxl' })} mx={{ base: 'md', md: 'auto' }}>
      <Stack h='100%' justify='center'>
        <Text>What is LCAx Compare?</Text>
        <Title>
          It should be possible for every user to take advantage of the benefits that the LCAx library provides.
        </Title>
        <Text w={{ base: '100%', xl: '66%' }}>
          This app has been developed to showcase some of LCAx's functionality such as conversion from different formats
          to LCAx and the ability to compare projects.
        </Text>
      </Stack>
    </Container>
  )
}

const SponsorSection = () => {
  return (
    <Stack justify='center' align='center' h={'100vh'}>
      <Title order={3}>Supported by</Title>
      <Link to='https://www.sbst.dk/'>
        <Image src={sbstLogo} h={useMatches({ base: 60, md: 100, xl: 150 })} w='auto' fit='contain' />
      </Link>
    </Stack>
  )
}

const GetStartedButton = () => (
  <Button c='black' component={Link} to='/projects' w={'fit-content'} size='xl'>
    Get started
  </Button>
)

interface SectionProps {
  children: ReactNode
}

const Section = ({ children }: SectionProps) => (
  <Container h={{ base: '100vh', md: '50vh', xxl: '30vh' }} my='xl' fluid p={0}>
    <Container h='100%' size={useMatches({ md: 'md', xl: 'xl', xxl: 'xxl' })}>
      <SimpleGrid cols={useMatches({ base: 1, md: 2 })} h={'100%'}>
        {children}
      </SimpleGrid>
    </Container>
  </Container>
)

const Left = ({ children }: SectionProps) => (
  <Stack mx={{ base: 'md', md: 'xl' }} mih={300}>
    {children}
  </Stack>
)

const Right = ({ children }: SectionProps) => (
  <Stack bg={'grey.2'} justify='center' align='center' h='100%' mih={300}>
    {children}
  </Stack>
)

const UploadSection = () => {
  return (
    <Section>
      <Left>
        <Text mt='md'>Step 1</Text>
        <Title order={2}>Upload</Title>
        <Title order={3} w={{ base: '100%', xl: '75%' }}>
          Start by uploading up to 3 LCAbyg or Realtime LCA projects
        </Title>
      </Left>
      <Right>
        <FileInput
          w={'50%'}
          rightSection={
            <ActionIcon variant='filled' radius='xl' size={useMatches({ base: 'md', xl: 'xl' })} color='grey.3'>
              <IconArrowUp color='black' />
            </ActionIcon>
          }
          placeholder='Upload a LCA file'
          size={useMatches({ base: 'md', xl: 'xl' })}
          onClick={(e) => e.preventDefault()}
        />
      </Right>
    </Section>
  )
}

const ConvertSection = () => {
  return (
    <Section>
      <Left>
        <Text mt='md'>Step 2</Text>
        <Title order={2}>Convert</Title>
        <Title order={3} w={{ base: '100%', xl: '75%' }}>
          When you upload the files are converted into LCAx's file format.
        </Title>
      </Left>
      <Right>
        <FileInput
          w={'50%'}
          rightSection={
            <ActionIcon
              variant='filled'
              radius='xl'
              size={useMatches({ base: 'md', xl: 'xl' })}
              color='grey.3'
              loading={true}
            >
              <IconArrowUp color='black' />
            </ActionIcon>
          }
          placeholder={<Text c='black'>lca.file</Text>}
          size={useMatches({ base: 'md', xl: 'xl' })}
          onClick={(e) => e.preventDefault()}
        />
      </Right>
    </Section>
  )
}

const CompareSection = () => {
  return (
    <Section>
      <Left>
        <Text mt='md'>Step 3</Text>
        <Title order={2}>Compare</Title>
        <Title order={3} w={{ base: '100%', xl: '75%' }}>
          Compare the environmental impact of your projects.
        </Title>
      </Left>
      <Right>
        <BarChart
          h={300}
          data={[{ month: 'January', Smartphones: 1200, Laptops: 900, Tablets: 200 }]}
          dataKey='month'
          series={[
            { name: 'Smartphones', color: 'yellow.4' },
            { name: 'Laptops', color: 'black' },
            { name: 'Tablets', color: 'indigo.9' },
          ]}
          tickLine='none'
          gridAxis='none'
          barChartProps={{ barGap: 20 }}
          withXAxis={false}
          withYAxis={false}
          withTooltip={false}
        />
      </Right>
    </Section>
  )
}

const AnalyseSection = () => {
  return (
    <Section>
      <Left>
        <Text mt='md'>Step 4</Text>
        <Title order={2}>Analyse</Title>
        <Title order={3} w={{ base: '100%', xl: '75%' }}>
          Click on each project to see detailed data.
        </Title>
      </Left>
      <Right>
        <BarChart
          h={200}
          data={[{ month: 'January', project1: 900, project2: 600, project3: 200, project4: 300 }]}
          dataKey='month'
          series={[
            { name: 'project1', color: 'yellow.4' },
            { name: 'project2', color: 'gray.8' },
            { name: 'project3', color: 'gray.1' },
            { name: 'project4', color: 'indigo.9' },
          ]}
          orientation='vertical'
          tickLine='none'
          gridAxis='none'
          type='stacked'
          barChartProps={{ barGap: 20 }}
          withXAxis={false}
          withYAxis={false}
          withTooltip={false}
        />
      </Right>
    </Section>
  )
}

const GetStartedSection = () => {
  return (
    <Container h={{ base: '100vh', md: '50vh', xl: '30vh' }} my='xl' fluid p={0}>
      <Stack align='center' h='100%' justify='center'>
        <Title order={2}>Get Started Now!</Title>
        <GetStartedButton />
      </Stack>
    </Container>
  )
}
