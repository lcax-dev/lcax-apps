import { ActionIcon, Container, FileInput, Stack, Title, UnstyledButton, useMatches, Text } from '@mantine/core'
import { IconArrowUp } from '@tabler/icons-react'
import { useState } from 'react'
import { useProjects } from '@/contexts'
import { convertFiles } from '@/lib'
// @ts-expect-error modules declaration doesn't work
import image1 from '@/assets/apartments-brandon-griggs-unsplash.jpg?base64'
// @ts-expect-error modules declaration doesn't work
import image2 from '@/assets/office-martin-katler-unsplash.jpg?base64'
// @ts-expect-error modules declaration doesn't work
import image3 from '@/assets/single-jamie-whiffen-unsplash.jpg?base64'

export const UploadSection = () => {
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string[]>([])
  const [converting, setConverting] = useState(false)
  const { projects, setProjects } = useProjects()

  const handleFileConversion = async () => {
    setConverting(true)
    if (!files.length) {
      setConverting(false)
      return
    }

    const { projects: newProjects, errors } = await convertFiles(files)
    if (errors.length) {
      setError(errors)
      setConverting(false)
      return
    }
    const colors = ['yellow', 'grey', 'indigo']
    const images = [image1, image2, image3]
    const allProjects = [
      ...projects,
      ...newProjects.map((project, index) => ({
        ...project,
        metaData: {
          image: `data:image/jpeg;base64,${images[(projects.length + index) % 3]}`,
          ...(project.metaData || {}),
          color: colors[(projects.length + index) % 3],
        },
      })),
    ]
    if (allProjects.length > 3) {
      allProjects.shift()
    }
    setProjects(allProjects)

    setFiles([])
    setTimeout(() => {
      setConverting(false)
      document.getElementById(`project${allProjects.length - 1}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }, 100)
  }

  const handleFileUpload = (files: File[]) => {
    setError([])
    const _files = []
    for (const file of files) {
      if (file.type !== 'application/json') {
        setError((prev) => [...prev, `${file.name}: Only JSON files are allowed`])
      } else {
        _files.push(file)
      }
    }
    setFiles(_files)
  }

  return (
    <Container size={useMatches({ base: 'md', xl: 'xxl' })} h='100vh'>
      <Stack justify='center' align='center' h='100%'>
        <Title>Upload</Title>
        <FileInput
          w='100%'
          rightSection={
            <ActionIcon
              variant='filled'
              radius='xl'
              size={useMatches({ base: 'md', md: 'xl' })}
              color='gray.4'
              disabled={converting}
              loading={converting}
              onClick={() => handleFileConversion()}
            >
              <IconArrowUp color={'black'} />
            </ActionIcon>
          }
          mt='md'
          multiple
          value={files}
          disabled={useMatches({ base: true, sm: false })}
          error={error.join(', ')}
          onChange={handleFileUpload}
          placeholder='Upload a LCA file'
          size={useMatches({ base: 'md', md: 'xl' })}
        />
        {error.length ? <ErrorMessage /> : null}
        <UnstyledButton
          onClick={() => document.getElementById(`faq`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        >
          What files can I upload?
        </UnstyledButton>
      </Stack>
    </Container>
  )
}

const ErrorMessage = () => (
  <Stack justify='center' align='center' gap={0}>
    <Text c='red' size='sm'>
      Do you experience problems uploading your project? Go to the{' '}
      <UnstyledButton
        onClick={() => document.getElementById(`faq`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        style={{ textDecoration: 'underline' }}
      >
        FAQ section
      </UnstyledButton>{' '}
      below and follow the guides.
    </Text>
    <Text c='red' size='sm'>
      Do you still experience problems, then send us an email on lcax@kongsgaard.eu, where you explain the problem and
      attach the problematic project files.
    </Text>
  </Stack>
)
