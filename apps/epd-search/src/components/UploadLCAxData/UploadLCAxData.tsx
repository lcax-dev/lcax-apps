import {
  ActionIcon,
  Button,
  Group,
  List,
  Loader,
  Paper,
  rem,
  Stack,
  Text,
  ThemeIcon,
  SegmentedControl,
} from '@mantine/core'
import { Dropzone, FileWithPath } from '@mantine/dropzone'
import { IconCheck, IconFileCode, IconUpload, IconX } from '@tabler/icons-react'
import { useState } from 'react'
import { useAddLCAxDataMutation } from '@/queries'
import { notifications } from '@mantine/notifications'
import { authClient } from '@/lib'

export const UploadLCAxData = () => {
  const [files, setFiles] = useState<FileWithPath[]>([])
  const [parsing, setParsing] = useState(false)
  const [visibility, setVisibility] = useState<string>('Public')
  const { data: activeMember } = authClient.organization.useActiveMember()
  const [addLCAxData, { loading }] = useAddLCAxDataMutation()

  const handleDrop = (acceptedFiles: FileWithPath[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles])
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const uploadLCAxData = async (values: any) => {
    try {
      await addLCAxData({
        variables: {
          values,
          organizationId: activeMember?.organizationId,
          visibility,
        },
      })
      notifications.show({
        title: 'Success',
        message: `${values.length} item(s) uploaded successfully`,
        color: 'green',
      })
    } catch (error) {
      console.error('Upload failed:', error)
      notifications.show({
        title: 'Upload Failed',
        message: error instanceof Error ? error.message : 'An unknown error occurred during upload',
        color: 'red',
      })
    }
  }

  const handleUpload = async () => {
    setParsing(true)
    try {
      const lcaxData = await Promise.all(
        files.map(async (file) => {
          const text = await file.text()
          return JSON.parse(text)
        }),
      )
      await uploadLCAxData(lcaxData)
      setFiles([])
    } catch (error) {
      console.error('Failed to parse JSON files:', error)
      notifications.show({
        title: 'Parsing Failed',
        message: error instanceof Error ? error.message : 'Failed to parse JSON files.',
        color: 'red',
      })
    } finally {
      setParsing(false)
    }
  }

  return (
    <Stack>
      <Dropzone
        onDrop={(files) => handleDrop(files)}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={5 * 1024 ** 2}
        accept={['application/json']}
        loading={loading || parsing}
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
            <Group justify='space-between' align='center'>
              <Text fw={500}>Selected Files ({files.length})</Text>
              <Group gap='xs'>
                <Text size='xs' c='dimmed'>
                  Visibility:
                </Text>
                <SegmentedControl
                  value={visibility}
                  onChange={setVisibility}
                  data={[
                    { label: 'Public', value: 'Public' },
                    { label: 'Private', value: 'Private' },
                  ]}
                  size='xs'
                />
              </Group>
            </Group>
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
            <Button onClick={handleUpload} loading={loading || parsing} leftSection={parsing && <Loader size='xs' />}>
              Upload Files
            </Button>
          </Stack>
        </Paper>
      )}
    </Stack>
  )
}
