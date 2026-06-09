import { Button, Container, Group, Modal, Paper, Stack, Table, Title, Text, Loader, Center } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { authClient } from '@/lib'
import { OrganizationCreate } from '@/components'
import { RolePermitter } from '@lcax/ui'

export const OrganizationsPage = () => {
  const { data: sessionData } = authClient.useSession()
  const { data: organizations, isPending, refetch } = authClient.useListOrganizations()
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <Container size='lg' py='xl'>
      <RolePermitter sessionData={sessionData} requiredRole='admin'>
        <Stack gap='xl'>
          <Group justify='space-between'>
            <Title order={2}>Organizations</Title>
            <Button onClick={open}>Create Organization</Button>
          </Group>

          <Paper withBorder p='md' radius='md'>
            {isPending ? (
              <Center py='xl'>
                <Loader />
              </Center>
            ) : (
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Slug</Table.Th>
                    <Table.Th>Created At</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {organizations?.map((org) => (
                    <Table.Tr key={org.id}>
                      <Table.Td>{org.name}</Table.Td>
                      <Table.Td>{org.slug}</Table.Td>
                      <Table.Td>{new Date(org.createdAt).toLocaleDateString()}</Table.Td>
                    </Table.Tr>
                  ))}
                  {organizations?.length === 0 && (
                    <Table.Tr>
                      <Table.Td colSpan={3}>
                        <Text ta='center' c='dimmed' py='xl'>
                          No organizations found
                        </Text>
                      </Table.Td>
                    </Table.Tr>
                  )}
                </Table.Tbody>
              </Table>
            )}
          </Paper>
        </Stack>

        <Modal opened={opened} onClose={close} title='Create Organization'>
          <OrganizationCreate
            onSuccess={() => {
              close()
              refetch()
            }}
          />
        </Modal>
      </RolePermitter>
      {!isPending && sessionData?.user.role !== 'admin' && (
        <Paper withBorder p='xl' radius='md' bg='red.0'>
          <Title order={3} c='red'>
            Access Denied
          </Title>
          <Text mt='md'>You do not have permission to view this page.</Text>
        </Paper>
      )}
    </Container>
  )
}
