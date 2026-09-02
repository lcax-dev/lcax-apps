import {
  ActionIcon,
  Button,
  Divider,
  FileInput,
  Group,
  List,
  Menu,
  Stack,
  Text,
  Title,
  useMatches,
} from '@mantine/core'
import { IconArrowUp, IconChevronDown, IconX } from '@tabler/icons-react'
import { useState } from 'react'
import { useAddLCAxDataMutation } from '../../queries'
import { authClient } from '../../lib'

export const UploadLCAxData = () => {
  const [files, setFiles] = useState<File[]>([])
  const [parsing, setParsing] = useState(false)
  const [visibility, setVisibility] = useState<string>('Public')
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const { data: activeMember } = authClient.organization.useActiveMember()
  const [addLCAxData, { loading }] = useAddLCAxDataMutation()

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
      setMessage({
        type: 'success',
        text: `${values.length} item(s) uploaded successfully.`,
      })
    } catch (error) {
      console.error('Upload failed:', error)
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'An unknown error occurred during upload',
      })
    }
  }

  const handleUpload = async () => {
    if (!files.length) return
    setParsing(true)
    setMessage(null)
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
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to parse JSON files.',
      })
    } finally {
      setParsing(false)
    }
  }

  const inputSize = useMatches({ base: 'md', md: 'xl' })

  return (
    <Stack gap='xl'>
      <Group justify='space-between' align='flex-end'>
        <Stack gap='xs'>
          <Text>Upload</Text>
          <Title order={2}>Upload LCAx Data</Title>
        </Stack>
        <Menu radius={0}>
          <Menu.Target>
            <Button variant='default' radius='xl' rightSection={<IconChevronDown size={16} />}>
              Visibility: {visibility}
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => setVisibility('Public')}>Public</Menu.Item>
            <Menu.Item onClick={() => setVisibility('Private')}>Private</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>

      <Divider />

      <FileInput
        w='100%'
        accept='application/json'
        multiple
        value={files}
        onChange={(payload) => {
          setMessage(null)
          setFiles(payload || [])
        }}
        placeholder='Select LCAx JSON file(s)'
        size={inputSize}
        radius='xl'
        rightSection={
          <ActionIcon
            variant='filled'
            radius='xl'
            size={inputSize}
            color='yellow.4'
            disabled={files.length === 0 || loading || parsing}
            loading={loading || parsing}
            onClick={handleUpload}
          >
            <IconArrowUp color='black' />
          </ActionIcon>
        }
      />

      {files.length > 0 && (
        <Stack gap='md'>
          <Text fw={500}>Selected Files ({files.length})</Text>
          <List spacing='xs' size='sm'>
            {files.map((file, index) => (
              <List.Item
                key={`${file.name}-${index}`}
                suffix={
                  <ActionIcon variant='subtle' color='red' onClick={() => removeFile(index)} size='sm'>
                    <IconX size={14} />
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
          <Group justify='flex-end'>
            <Button
              variant='filled'
              color='yellow.4'
              c='black'
              size='xl'
              radius='xl'
              rightSection={<IconArrowUp color='black' />}
              onClick={handleUpload}
              loading={loading || parsing}
              disabled={files.length === 0}
            >
              Upload Files
            </Button>
          </Group>
        </Stack>
      )}

      {message && (
        <Text c={message.type === 'error' ? 'red' : 'black'} size='sm'>
          {message.text}
        </Text>
      )}
    </Stack>
  )
}
