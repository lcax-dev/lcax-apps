import { useEffect, useState } from 'react'
import { authClient } from '@/lib/auth-client'
import {
  Affix,
  Badge,
  Box,
  Button,
  Collapse,
  Group,
  Menu,
  Paper,
  Stack,
  Text,
  UnstyledButton,
  rem,
} from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'

export const DevUI = () => {
  const { data: session } = authClient.useSession()
  const [users, setUsers] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [session])

  const fetchUsers = async () => {
    const { data } = await authClient.admin.listUsers({
      query: { limit: 100 },
    })
    if (data?.users) {
      setUsers(data.users)
    }
  }

  const handleImpersonate = async (userId: string) => {
    await authClient.admin.impersonateUser({ userId })
    window.location.reload()
  }

  return (
    <Affix position={{ bottom: 16, right: 16 }} zIndex={50}>
      <Paper
        shadow='lg'
        radius='lg'
        withBorder
        style={{
          minWidth: 240,
          overflow: 'hidden',
          backgroundColor: 'black',
          borderColor: 'var(--mantine-color-dark-6)',
          color: 'white',
        }}
      >
        <UnstyledButton
          onClick={() => setIsOpen((o) => !o)}
          p='sm'
          w='100%'
          style={{
            backgroundColor: 'black',
          }}
          className='hover:bg-gray-900'
        >
          <Group justify='space-between'>
            <Text size='sm' fw='bold' tt='uppercase'>
              Devui
            </Text>
            <IconChevronDown
              size={16}
              style={{
                transition: 'transform 200ms ease',
                transform: isOpen ? 'rotate(180deg)' : 'none',
              }}
            />
          </Group>
        </UnstyledButton>

        <Collapse expanded={isOpen}>
          <Stack
            p='md'
            gap='md'
            style={{ borderTop: `1px solid var(--mantine-color-dark-6)`, backgroundColor: '#0a0a0a' }}
          >
            <Box>
              <Text size={'xs'} fw='bold' tt='uppercase' c='dimmed' mb={8}>
                Current user
              </Text>
              {session?.user ? (
                <Group gap='xs'>
                  <Text size='sm' fw={600}>
                    {session.user.name}
                  </Text>
                  <Badge color='green' variant='light' tt='capitalize' size='sm'>
                    {session.user.role || 'user'}
                  </Badge>
                </Group>
              ) : (
                <Stack gap='xs'>
                  <Text size='sm' c='dimmed' fs='italic'>
                    No active session
                  </Text>
                </Stack>
              )}
            </Box>

            {session?.user && session.user.role === 'admin' && (
              <Box>
                <Menu position='bottom-end' width={208} shadow='md'>
                  <Menu.Target>
                    <Button
                      variant='default'
                      fullWidth
                      justify='space-between'
                      rightSection={<IconChevronDown size={16} style={{ opacity: 0.5 }} />}
                      styles={{
                        root: {
                          backgroundColor: '#1a1a1a',
                          color: 'white',
                          borderColor: 'var(--mantine-color-dark-6)',
                          height: rem(36),
                        },
                        label: { fontSize: 'var(--mantine-font-size-sm)', fontWeight: 400 },
                      }}
                    >
                      Switch user
                    </Button>
                  </Menu.Target>
                  <Menu.Dropdown style={{ backgroundColor: '#0a0a0a', borderColor: 'var(--mantine-color-dark-6)' }}>
                    {users
                      .filter((u) => u.id !== session.user.id)
                      .map((user) => (
                        <Menu.Item
                          key={user.id}
                          onClick={() => handleImpersonate(user.id)}
                          p='xs'
                          style={{ color: 'white' }}
                          className='hover:bg-gray-900'
                        >
                          <Stack gap={2}>
                            <Text size='sm' fw={500}>
                              {user.name}
                            </Text>
                            <Text size='sm' c='dimmed'>
                              {user.email}
                            </Text>
                          </Stack>
                        </Menu.Item>
                      ))}
                    {users.filter((u) => u.id !== session.user.id).length === 0 && (
                      <Text size='xs' c='dimmed' fs='italic' p='xs'>
                        No other users found
                      </Text>
                    )}
                  </Menu.Dropdown>
                </Menu>
              </Box>
            )}
          </Stack>
        </Collapse>
      </Paper>
    </Affix>
  )
}
