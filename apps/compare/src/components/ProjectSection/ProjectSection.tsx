import {
  ActionIcon,
  Button,
  Container,
  Divider,
  Flex,
  Image,
  Menu,
  SimpleGrid,
  Stack,
  Text,
  Title,
  UnstyledButton,
  useMatches,
} from '@mantine/core'
import { Project } from 'lcax'
import apartmentImage from '@/assets/apartments-brandon-griggs-unsplash.jpg'
import { Link } from 'react-router'
import { useState } from 'react'
import { IconChevronDown } from '@tabler/icons-react'
import { InfoBlock } from '@/components'
import { snakeCaseToHumanCase } from '@/lib'

interface ProjectSectionProps {
  project: Project
  index: number
}

export const ProjectSection = ({ project, index }: ProjectSectionProps) => {
  const containerSize = useMatches({ md: 'md', xl: 'xl' })

  return (
    <Container h={{ base: '100vh', md: '50vh' }} size={containerSize}>
      <Stack h='100%' justify='center'>
        <Divider />
        <SimpleGrid cols={{ base: 1, md: 2 }}>
          <ImageSection project={project} index={index} />
          <Stack w='100%' justify='space-between'>
            <SimpleGrid cols={2} mt='xl'>
              <InfoBlock
                title='Building Typology'
                info={project.projectInfo?.buildingTypology
                  // @ts-expect-error buildingTypology is a string[]
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
  const imageSize = useMatches({ md: 250, xl: 500 })

  return (
    <Stack justify='center'>
      <Link to={`/projects/${project.id.slice(0, 8)}/details`}>
        <Image src={project.metaData?.image} fallbackSrc={apartmentImage} h={imageSize} w={imageSize} fit='cover' />
      </Link>
      <Text id={`project${index}`}>Project 0{index + 1}</Text>
      {/* @ts-expect-error does not know Link props */}
      <Title component={Link} to={`/projects/${project.id.slice(0, 8)}/details`} c={'black'}>
        {project.name}
      </Title>
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
    element.setAttribute('href', 'data:text/plain;charset=utf-8, ' + encodeURIComponent(JSON.stringify(project)))
    element.setAttribute('download', `${project.id.slice(0, 8)}.lcax.json`)
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
            <Menu.Item onClick={() => setFileType('LCAbyg')}>LCAbyg</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Button.Group>
    </Flex>
  )
}
