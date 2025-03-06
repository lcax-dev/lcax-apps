import apartmentImage from '@/assets/apartments-brandon-griggs-unsplash.jpg'
import { ActionIcon, Container, Group, Image, Overlay, rem, Stack, Title, useMatches } from '@mantine/core'
import { IconArrowBack, IconArrowNarrowLeft, IconFileCode2, IconPhotoUp, IconPrinter } from '@tabler/icons-react'
import { Project } from 'lcax'
import { Link } from 'react-router'
import { ChangeEvent } from 'react'
import { toBase64 } from '@/lib'
import { useProjects } from '@/contexts'

interface ProjectImageProps {
  project: Project | undefined
}

export const ProjectImage = ({ project }: ProjectImageProps) => {
  const { setProjects } = useProjects()
  const titleSize = useMatches({ md: rem(46), xl: rem(64) })

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = await toBase64(event.target.files[0])
      if (!project) return
      else if (!project.metaData) {
        project.metaData = { image: file }
      } else {
        project.metaData.image = file
      }
      setProjects((prev) => prev.map((_project) => (_project.id === project.id ? _project : project)))
    }
  }

  const handleFileClick = () => {
    const fileInput = document.getElementById('fileInput')
    if (fileInput) {
      fileInput.click()
    }
  }

  const handlePrintClick = () => {
    window.print()
  }

  return (
    <Container pos='relative' fluid p={0} h='100vh'>
      <Image src={project?.metaData?.image} fallbackSrc={apartmentImage} h='100vh' w='100%' fit='cover' />
      <Overlay backgroundOpacity={0} blur={project ? 0 : 15}>
        {project ? (
          <Stack justify='space-between' h='100%'>
            <Group justify='space-between' p='md'>
              <ActionIcon
                variant='transparent'
                color='white'
                autoContrast={true}
                size='xl'
                radius={0}
                component={Link}
                to={'/projects'}
              >
                <IconArrowNarrowLeft size={64} />
              </ActionIcon>
              <Group>
                <ActionIcon
                  variant='transparent'
                  color='white'
                  autoContrast={true}
                  size='xl'
                  radius={0}
                  onClick={handlePrintClick}
                >
                  <IconPrinter size={64} />
                </ActionIcon>
                <ActionIcon
                  variant='transparent'
                  color='white'
                  autoContrast={true}
                  size='xl'
                  radius={0}
                  component={Link}
                  to={`/projects/${project.id.slice(0, 8)}/view`}
                >
                  <IconFileCode2 size={64} />
                </ActionIcon>
              </Group>
            </Group>
            <Group justify='space-between' p='md'>
              <Title c='white' size={titleSize}>
                {project?.name}
              </Title>
              <input type='file' name='' id='fileInput' style={{ display: 'none' }} onChange={handleFileChange} />
              <ActionIcon
                variant='transparent'
                color='white'
                autoContrast={true}
                size='xl'
                radius={0}
                onClick={handleFileClick}
              >
                <IconPhotoUp size={64} />
              </ActionIcon>
            </Group>
          </Stack>
        ) : (
          <Stack justify='center' align='center' h='100%'>
            <Title c='white'>No Project Found</Title>
            <ActionIcon variant='transparent' color='white' component={Link} to={'/projects'}>
              <IconArrowBack />
            </ActionIcon>
          </Stack>
        )}
      </Overlay>
    </Container>
  )
}
