import { ActionIcon, FileInput, rem, Stack, Title, UnstyledButton, useMatches } from '@mantine/core'
import { IconArrowUp } from '@tabler/icons-react'
import { useState } from 'react'
import { useProjects } from '@/contexts'

export const UploadSection = () => {
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string[]>([])
  const [converting, setConverting] = useState(false)
  const { setProjects } = useProjects()

  const handleFileConversion = async () => {
    setConverting(true)

    const projects = await Promise.all(files.map(async (file) => JSON.parse(await file.text())))
    setProjects((prev) => [...prev, ...projects])

    setFiles([])
    setTimeout(() => {
      setConverting(false)
      document.getElementById(`project${projects.length - 1}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
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
    <Stack bg={'gray.2'} justify='center' align='center' h='100vh'>
      <Title size={useMatches({ md: rem(46), xl: rem(64) })}>Upload</Title>
      <FileInput
        w={useMatches({ base: '75%', md: '50%' })}
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
        error={error.join(', ')}
        onChange={handleFileUpload}
        placeholder='Upload a LCA file'
        size={useMatches({ base: 'md', md: 'xl' })}
      />
      <UnstyledButton
        onClick={() => document.getElementById(`faq`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
      >
        What files can I upload?
      </UnstyledButton>
    </Stack>
  )
}
