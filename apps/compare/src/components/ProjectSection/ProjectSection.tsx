import {
  ActionIcon,
  Button,
  Container,
  Divider,
  Flex,
  Group,
  Image,
  Menu,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Tooltip,
  UnstyledButton,
} from '@mantine/core'
import { useMatches } from '@lcax/ui'
import { Project } from 'lcax'
import apartmentImage from '@/assets/apartments-brandon-griggs-unsplash.webp'
import { Link } from 'react-router'
import { useState } from 'react'
import { IconAlertCircle, IconChevronDown } from '@tabler/icons-react'
import { InfoBlock } from '@/components'
import { snakeCaseToHumanCase } from '@/lib'

interface ProjectSectionProps {
  project: Project
  index: number
}

export const ProjectSection = ({ project, index }: ProjectSectionProps) => {
  const containerSize = useMatches({ md: 'md', xl: 'xl', xxl: 'xxl' })

  return (
    <Container mih={{ base: '100vh', md: '65vh', xxl: '50vh' }} size={containerSize} py='xl'>
      <Stack h='100%' justify='center'>
        <Divider py='lg' />
        <SimpleGrid cols={{ base: 1, md: 2 }}>
          <ImageSection project={project} index={index} />
          <Stack w='100%' justify='space-between'>
            <SimpleGrid cols={2} mt='xl'>
              <InfoBlock
                title='Building Typology'
                info={project.projectInfo?.buildingTypology
                  .map((typology: string) => snakeCaseToHumanCase(typology))
                  .join(', ')}
              />
              <InfoBlock title='LCA Software' info={project.softwareInfo.lcaSoftware} />
            </SimpleGrid>
            <InfoBlock title={'Description'} info={project.description} />
            <DownloadButton project={project} />
          </Stack>
        </SimpleGrid>
      </Stack>
    </Container>
  )
}

interface ImageSectionProps {
  project: Project
  index: number
}

const ImageSection = ({ project, index }: ImageSectionProps) => {
  const imageSize = useMatches({ md: 250, xl: 350, xxl: 500 })

  return (
    <Stack justify='center'>
      <Link to={`/projects/${project.id.slice(0, 8)}/details`}>
        <Image src={project.metaData?.image} fallbackSrc={apartmentImage} h={imageSize} w={imageSize} fit='cover' />
      </Link>
      <Text id={`project${index}`}>Project 0{index + 1}</Text>

      <Group>
        {/* @ts-expect-error does not know Link props */}
        <Title component={Link} to={`/projects/${project.id.slice(0, 8)}/details`} c={'black'} w='95%'>
          {project.name}
        </Title>
        {!project.results?.gwp ? (
          <Tooltip label='This project does not have any results. See the FAQ for how to upload a project with results.'>
            <IconAlertCircle color='red' />
          </Tooltip>
        ) : null}
      </Group>
    </Stack>
  )
}

interface DownloadButtonProps {
  project: Project
}

const DownloadButton = ({ project }: DownloadButtonProps) => {
  const [fileType, setFileType] = useState<'LCAx' | 'LCAbyg'>('LCAx')

  const handleDownload = () => {
    const element = document.createElement('a')
    if (fileType === 'LCAx') {
      element.setAttribute('href', 'data:text/plain;charset=utf-8, ' + encodeURIComponent(JSON.stringify(project)))
      element.setAttribute('download', `${project.id.slice(0, 8)}.lcax.json`)
    } else if (fileType === 'LCAbyg') {
      console.error('Not supported')
    }

    document.body.appendChild(element)
    element.click()

    document.body.removeChild(element)
  }

  return (
    <Flex justify='flex-end' w='100%'>
      <Button.Group>
        <UnstyledButton onClick={handleDownload}>{`Download ${fileType} File`}</UnstyledButton>
        <Menu radius={0}>
          <Menu.Target>
            <ActionIcon variant='transparent' color='black'>
              <IconChevronDown />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => setFileType('LCAx')}>LCAx</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Button.Group>
    </Flex>
  )
}
