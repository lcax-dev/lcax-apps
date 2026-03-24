import { Group, Text, rem, Stack, Paper, Button, List, ThemeIcon, ActionIcon } from '@mantine/core'
import { Dropzone, FileWithPath, MIME_TYPES } from '@mantine/dropzone'
import { IconUpload, IconX, IconFileCode, IconCheck } from '@tabler/icons-react'
import { useState } from 'react'

export interface UploadEPDProps {
  onUpload?: (files: FileWithPath[]) => void
  loading?: boolean
}

export const UploadEPD = ({ onUpload, loading }: UploadEPDProps) => {
  const [files, setFiles] = useState<FileWithPath[]>([])

  const handleDrop = (acceptedFiles: FileWithPath[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles])
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = () => {
    if (onUpload) {
      onUpload(files)
    }
  }

  return (
    <Stack>
      <Dropzone
        onDrop={handleDrop}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={5 * 1024 ** 2}
        accept={[MIME_TYPES.json]}
        loading={loading}
      >
        <Group justify='center' gap='xl' mih={220} style={{ pointerEvents: 'none' }}>
          <Dropzone.Accept>
            <IconUpload
              style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }} stroke={1.5} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconFileCode
              style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
              stroke={1.5}
            />
          </Dropzone.Idle>

          <div>
            <Text size='xl' inline>
              Drag LCAx JSON files here or click to select files
            </Text>
            <Text size='sm' c='dimmed' inline mt={7}>
              Attach as many files as you like, each file should not exceed 5MB
            </Text>
          </div>
        </Group>
      </Dropzone>

      {files.length > 0 && (
        <Paper withBorder p='md' radius='md'>
          <Stack>
            <Text fw={500}>Selected Files ({files.length})</Text>
            <List
              spacing='xs'
              size='sm'
              center
              icon={
                <ThemeIcon color='teal' size={24} radius='xl'>
                  <IconCheck style={{ width: rem(16), height: rem(16) }} />
                </ThemeIcon>
              }
            >
              {files.map((file, index) => (
                <List.Item
                  key={`${file.name}-${index}`}
                  suffix={
                    <ActionIcon variant='subtle' color='red' onClick={() => removeFile(index)} size='sm'>
                      <IconX style={{ width: rem(14), height: rem(14) }} />
                    </ActionIcon>
                  }
                >
                  <Group justify='space-between' style={{ flex: 1 }}>
                    <Text size='sm'>{file.name}</Text>
                    <Text size='xs' c='dimmed'>
                      {(file.size / 1024).toFixed(1)} KB
                    </Text>
                  </Group>
                </List.Item>
              ))}
            </List>
            <Button onClick={handleUpload} loading={loading}>
              Upload Files
            </Button>
          </Stack>
        </Paper>
      )}
    </Stack>
  )
}
