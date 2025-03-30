import { Accordion, AspectRatio, Button, Container, Divider, Stack, Text, Title, useMatches } from '@mantine/core'
import { IconArrowDown, IconInfoCircle } from '@tabler/icons-react'
import lcabygExportVideo from '@/assets/lcabyg-export.webm'
import lcabygUploadVideo from '@/assets/lcabyg-upload.webm'
import realtimelcaExportVideo from '@/assets/realtimelca-export.webm'
import ReactPlayer from 'react-player'

const faqs = [
  {
    value: 'What files can I upload?',
    description:
      'LCAx Compare works for files exported from LCAbyg and Real-Time LCA. The LCAbyg files should be in .json and Real-Time LCA in .xlsx. Currently only LCAbyg files from LCAbyg 5.4.0.5 is supported.',
    video: lcabygUploadVideo,
  },
  {
    value: 'How do I export LCAbyg files?',
    description:
      'Follow the instructions in the video to export a JSON project file and a JSON results from LCAbyg. ' +
      'It is important that the results file is called the same as the project file, but ends with "_results". ' +
      'Otherwise we will not be able to match the two files together.',
    video: lcabygExportVideo,
  },
  {
    value: 'My LCAbyg project does not include any results!',
    description:
      'LCAbyg exports project information and result information in two separate JSON files. ' +
      'It is important that select and upload both the project and results file at the same time. ' +
      'Otherwise we will not be able to match the two files together. ' +
      'See the "How do I export LCAbyg files?" question for more information on exporting LCAbyg files.',
  },
  {
    value: 'How do I export a Real-Time LCA file?',
    description: 'Follow the instructions in the video to export a .xlsx file from Real-Time LCA.',
    video: realtimelcaExportVideo,
  },
  {
    value: 'Is my data sent somewhere?',
    description:
      'Even though you are in the browser, we never send your projects anywhere. ' +
      'All conversion and data processing are done YOUR browser and not on a server. In that way we can make sure that your data stays on your computer.',
  },
  {
    value: 'What is LCAx?',
    description:
      'LCAx is an open, machine and human-readable data format for exchanging LCA projects including their results, assemblies and impact data.' +
      'Besides the data format, LCAx also includes functionality for converting and validating LCA projects. You can read more about LCAx at: https://lcax.org',
  },
  {
    value: 'Who is behind this website?',
    description:
      'LCAx and LCAx Compare are developed by Christian Kongsgaard. ' +
      'The development have been supported by Social- og Boligstyrelsen in 2025.',
  },
  {
    value: 'My project(s) disappeared, what happened?',
    description:
      "As part of our data policy, then we don't store your project data, just as we don't send it anywhere." +
      "That means that if you refresh your browser or send the link to someone else, there won't be any projects.",
  },
  {
    value: "I can't upload projects on mobile",
    description:
      'To keep charts and graphs readable we have decided not to enable upload of projects on a small screen. ' +
      'Instead open the webpage on a device with a larger screen and you will be able to upload projects.',
  },
  {
    value: 'I would like to delete a project',
    description:
      'If you want to delete all your projects, then you can simply refresh the page.' +
      'If you have already uploaded 3 projects and upload one more, then the first project will disappear.',
  },
  {
    value: 'Do you have some example files I can upload?',
    description:
      "If you don't have any projects at hand, but still want to try out the tool, then you can download a zip with the link below." +
      "The zip file contains three LCAbyg projects, that you can upload. The files originates from SBST's case library.",
    link: { name: 'Download ZIP', url: '/projects.zip' },
  },
]

export const FAQSection = () => {
  const containerSize = useMatches({ md: 'md', xl: 'xl', xxl: 'xxl' })

  return (
    <Container mih='100vh' size={containerSize}>
      <Stack h='100%' justify='center' mt='xl'>
        <Title id='faq'>Frequently Asked Questions</Title>
        <Divider mt='sm' mb='xl' />
        <Accordion multiple>
          {faqs.map((faq) => (
            <FAQPanel {...faq} key={faq.value} />
          ))}
        </Accordion>
      </Stack>
    </Container>
  )
}

interface FAQPanelProps {
  value: string
  description: string
  video?: string
  link?: { name: string; url: string }
}

const FAQPanel = ({ value, description, video, link }: FAQPanelProps) => (
  <Accordion.Item key={value} value={value}>
    <Accordion.Control icon={<IconInfoCircle />}>{value}</Accordion.Control>
    <Accordion.Panel>
      <Text>{description}</Text>
      {video ? (
        <>
          <Title order={3} mt='xl'>
            Video
          </Title>
          <Divider />
          <AspectRatio ratio={16 / 10} w={'100%'} my='lg'>
            <ReactPlayer url={video} controls={true} width='100%' height='100%' />
          </AspectRatio>
        </>
      ) : null}
      {link ? (
        <Button
          c='black'
          component={'a'}
          href={link.url}
          download
          w={'fit-content'}
          size='md'
          rightSection={<IconArrowDown />}
          my='lg'
        >
          {link.name}
        </Button>
      ) : null}
    </Accordion.Panel>
  </Accordion.Item>
)
