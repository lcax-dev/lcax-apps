import { ActionIcon, Container, FileInput, Stack, Title, UnstyledButton, Text, Tooltip } from '@mantine/core'
import { useMatches } from '@lcax/ui'
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
      if (
        !['application/json', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(file.type)
      ) {
        setError((prev) => [...prev, `${file.name}: Only JSON and XLSX files are allowed`])
      } else {
        _files.push(file)
      }
    }
    setFiles(_files)
  }

  return (
    <Container size={useMatches({ base: 'md', xl: 'xl', xxl: 'xxl' })} h='100vh'>
      <Stack justify='center' align='center' h='100%'>
        <Title>Upload</Title>
        <Tooltip label='Select and upload either a .xlsx export from Real-Time LCA or the project and result .json files from a LCAbyg project.'>
          <FileInput
            w='100%'
            rightSection={
              <ActionIcon
                variant='filled'
                radius='xl'
                size={useMatches({ base: 'md', md: 'xl' })}
                color='grey.3'
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
            placeholder='Upload LCA file(s)'
            size={useMatches({ base: 'md', md: 'xl' })}
          />
        </Tooltip>
        {error.length ? <ErrorMessage /> : null}
        <UnstyledButton
          onClick={() => document.getElementById(`faq`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          style={{ textDecoration: 'underline' }}
        >
          {useMatches({ base: 'I can\'t upload projects on mobile', sm: 'What files can I upload?' })}
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
