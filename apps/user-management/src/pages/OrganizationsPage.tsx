import { Button, Container, Divider, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { authClient } from '@/lib'
import { InfoBlock, OrganizationCreate } from '@/components'
import { Loading, notifications, RolePermitter, useMatches } from '@lcax/ui'
import { useNavigate } from 'react-router'
import { IconArrowRight } from '@tabler/icons-react'

export const OrganizationsPage = () => {
  const { data: sessionData } = authClient.useSession()
  const { data: organizations, isPending, refetch } = authClient.useListOrganizations()
  const navigate = useNavigate()
  const containerSize = useMatches({ md: 'md', xl: 'xl', xxl: 'xxl' })

  const handleOrgClick = async (orgId: string) => {
    const { error } = await authClient.organization.setActive({
      organizationId: orgId,
    })
    if (error) {
      notifications.error({ message: error.message })
    } else {
      navigate('/profile')
    }
  }

  return (
    <Container fluid bg='grey.0' p={0} pb='xl'>
      <Container size={containerSize} py='xl'>
        <RolePermitter requiredRole='admin'>
          <Stack gap='xl'>
            <Stack gap='lg'>
              <div>
                <Text>Administration</Text>
                <Title order={2}>Organizations</Title>
              </div>
              <Text c='dimmed' w={{ base: '100%', xl: '66%' }}>
                Manage all registered organizations, access work environments, or create new organizations.
              </Text>
              <Divider my='xs' />

              {isPending ? (
                <Loading />
              ) : organizations && organizations.length > 0 ? (
                <Stack gap='md'>
                  {organizations.map((org) => (
                    <Stack gap='sm' key={org.id}>
                      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing='md' align='center'>
                        <InfoBlock title='Organization Name' info={org.name} />
                        <InfoBlock title='Slug' info={org.slug} />
                        <InfoBlock title='Created At' info={new Date(org.createdAt).toLocaleDateString()} />
                      </SimpleGrid>
                      <Group justify='flex-end'>
                        <Button
                          c='black'
                          size='md'
                          rightSection={<IconArrowRight />}
                          onClick={() => handleOrgClick(org.id)}
                          w='fit-content'
                        >
                          Select Organization
                        </Button>
                      </Group>
                      <Divider />
                    </Stack>
                  ))}
                </Stack>
              ) : (
                <Text c='dimmed' py='md'>
                  No organizations found
                </Text>
              )}
            </Stack>

            <Divider my='xl' />
            <OrganizationCreate onSuccess={refetch} />
          </Stack>
        </RolePermitter>

        {!isPending && sessionData?.user?.role !== 'admin' && (
          <Stack gap='md'>
            <div>
              <Text>Access Control</Text>
              <Title order={2} c='red'>
                Access Denied
              </Title>
            </div>
            <Text c='dimmed'>You do not have permission to view this page.</Text>
          </Stack>
        )}
      </Container>
    </Container>
  )
}
