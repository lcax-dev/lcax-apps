import {
  ActionIcon,
  Button,
  Container,
  Divider,
  FileInput,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { useMatches } from '@lcax/ui'
import { IconArrowRight, IconArrowUp, IconLoader2 } from '@tabler/icons-react'
import sbstLogo from '@/assets/sbst-logo.png'
import realDaniaLogo from '@/assets/realdania-logo.svg'
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
        <GetStartedButton />
      </Stack>
    </Container>
  )
}

interface SectionProps {
  children: ReactNode
}

const Section = ({ children }: SectionProps) => (
  <Container h={{ base: '100vh', md: '50vh', xxl: '30vh' }} pb='xl' fluid p={0} mih={400}>
    <Container h='100%' size={useMatches({ md: 'md', xl: 'xl', xxl: 'xxl' })}>
      <Divider my='xl' />
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
        <div>
          <Text mt='md'>Step 1</Text>
          <Title order={2}>Upload</Title>
        </div>
        <Title order={3} w={{ base: '100%', xl: '75%' }}>
          Start by uploading up to 3 LCAbyg or Realtime LCA projects
        </Title>
      </Left>
      <Right>
        <FileInput
          w={'50%'}
          rightSection={
            <ActionIcon variant='filled' radius='xl' size={useMatches({ base: 'md', xl: 'xl' })} color='yellow.4'>
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
        <div>
          <Text mt='md'>Step 2</Text>
          <Title order={2}>Convert</Title>
        </div>
        <Title order={3} w={{ base: '100%', xl: '75%' }}>
          When you upload the files are converted into LCAx's file format.
        </Title>
      </Left>
      <Right>
        <FileInput
          w={'50%'}
          rightSection={
            <ActionIcon variant='filled' radius='xl' size={useMatches({ base: 'md', xl: 'xl' })} color='yellow.4'>
              <IconLoader2 color='black' />
            </ActionIcon>
          }
          placeholder='lca.file'
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
        <div>
          <Text mt='md'>Step 3</Text>
          <Title order={2}>Compare</Title>
        </div>
        <Title order={3} w={{ base: '100%', xl: '75%' }}>
          Compare the environmental impact of your projects.
        </Title>
      </Left>
      <Right>
        <BarChart
          h={300}
          data={[{ name: 'GWP', 'Project 1': 10.8, 'Project 2': 9.2, 'Project 3': 6.8 }]}
          dataKey='name'
          series={[
            { name: 'Project 1', color: 'yellow.4' },
            { name: 'Project 2', color: 'black' },
            { name: 'Project 3', color: 'indigo.9' },
          ]}
          barChartProps={{ barGap: 20, margin: { left: 30, right: 20 } }}
          withLegend
          valueFormatter={(value) => value.toFixed(2)}
          legendProps={{ verticalAlign: 'bottom' }}
          yAxisLabel='Impact (kg CO₂-eq/m²·year)'
          withXAxis={false}
          withTooltip={false}
        />
      </Right>
    </Section>
  )
}

const AnalyseSection = () => {
  const data = {
    impact: 'GWP',
    D: -1.5625586564072549,
    C4: 0.5562141931120812,
    C3: 1.301161247212097,
    B6: 3.1552307359999987,
    B4: 0.9866065004626995,
    A1A3: 6.694144863128481,
  }

  return (
    <Section>
      <Left>
        <div>
          <Text mt='md'>Step 4</Text>
          <Title order={2}>Analyse</Title>
        </div>
        <Title order={3} w={{ base: '100%', xl: '75%' }}>
          Click on each project to see detailed data.
        </Title>
      </Left>
      <Right>
        <BarChart
          h={300}
          data={[data]}
          dataKey='impact'
          series={[
            { name: 'D', color: 'yellow.5' },
            { name: 'A1A3', color: 'yellow.0' },
            { name: 'B4', color: 'yellow.1' },
            { name: 'B6', color: 'yellow.2' },
            { name: 'C3', color: 'yellow.3' },
            { name: 'C4', color: 'yellow.4' },
          ]}
          orientation='vertical'
          tickLine='none'
          gridAxis='none'
          type='stacked'
          barChartProps={{ barGap: 20, stackOffset: 'sign', margin: { left: 20, right: 20 } }}
          withXAxis={true}
          xAxisProps={{ domain: ['dataMin', 'dataMax'] }}
          withYAxis={false}
          unit='kg CO₂-eq/m²·year'
          valueFormatter={(value) => value.toFixed(2)}
          withBarValueLabel
          valueLabelProps={{ position: 'inside', fill: 'black' }}
          withLegend
          legendProps={{ verticalAlign: 'bottom', height: 75 }}
          xAxisLabel='Impact (kg CO₂-eq/m²·year)'
          withTooltip={false}
        />
      </Right>
    </Section>
  )
}

const GetStartedSection = () => {
  return (
    <Container h={{ base: '100vh', md: '50vh', xl: '30vh' }} my='xl' fluid p={0}>
      <Container h='100%' size={useMatches({ md: 'md', xl: 'xl', xxl: 'xxl' })}>
        <Divider my='xl' />
        <Stack align='center' h='100%' justify='center'>
          <Title order={2}>Get Started Now!</Title>
          <GetStartedButton />
        </Stack>
      </Container>
    </Container>
  )
}

const SponsorSection = () => {
  return (
    <Stack justify='center' align='center' h={'50vh'}>
      <Title order={3}>Supported by</Title>
      <Group gap='xl' mt='xl'>
        <Link to='https://www.sbst.dk/'>
          <Image src={sbstLogo} h={useMatches({ base: 60, md: 100, xl: 150 })} w='auto' fit='contain' />
        </Link>
        <Link to='https://www.realdania.org/'>
          <Image src={realDaniaLogo} h={useMatches({ base: 60, md: 100, xl: 150 })} w='auto' fit='contain' />
        </Link>
      </Group>
    </Stack>
  )
}

const GetStartedButton = () => (
  <Button
    c='black'
    component={Link}
    to='/projects'
    w={'fit-content'}
    size='xl'
    rightSection={<IconArrowRight />}
    my='xl'
  >
    Get started
  </Button>
)
