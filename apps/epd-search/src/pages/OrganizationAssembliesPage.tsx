import {
  Button,
  Container,
  Divider,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
  UnstyledButton,
  useMatches,
} from '@mantine/core'
import { Link } from 'react-router'
import { IconArrowRight } from '@tabler/icons-react'
import { ErrorMessage, Loading } from '@lcax/ui'
import { useOrganizationAssembliesQuery } from '@/queries/organizationAssemblies'
import { organizationAssemblyGwpLabel, organizationAssemblyStatusLabel } from './organizationAssemblyList'

export const OrganizationAssembliesPage = () => {
  const containerSize = useMatches({ base: 'md', xl: 'xl', xxl: 'xxl' })
  const { data, loading, error, refetch } = useOrganizationAssembliesQuery()
  const assemblies = data?.organizationAssemblies ?? []

  return (
    <Container fluid bg='grey.0' p={0} pb='xl'>
      <Container size={containerSize} py='xl' mx={{ base: 'md', md: 'auto' }}>
        <Stack gap='xl'>
          <Group justify='space-between' align='flex-end' gap='md'>
            <div>
              <Text>Organization</Text>
              <Title>Assemblies</Title>
            </div>
            <Button component={Link} to='/assemblies/new' c='black' w='fit-content' rightSection={<IconArrowRight />}>
              Create
            </Button>
          </Group>

          <Text w={{ base: '100%', xl: '66%' }}>List, open, and manage assemblies owned by your organization.</Text>

          <Divider />

          {loading ? (
            <div aria-busy='true' aria-label='Loading assemblies'>
              <Loading />
            </div>
          ) : error ? (
            <Stack gap='md' role='alert'>
              <ErrorMessage error={error} />
              <Button variant='subtle' w='fit-content' onClick={() => refetch()}>
                Try again
              </Button>
            </Stack>
          ) : assemblies.length === 0 ? (
            <Stack gap='md' py='md' role='status'>
              <Text>No assemblies yet.</Text>
              <Text c='dimmed'>Create an assembly to start composing products and EPDs.</Text>
              <Button component={Link} to='/assemblies/new' c='black' w='fit-content' rightSection={<IconArrowRight />}>
                Create
              </Button>
            </Stack>
          ) : (
            <Stack gap={0}>
              <SimpleGrid cols={{ base: 2, sm: 4 }} py='sm' visibleFrom='sm'>
                <Text size='sm'>Name</Text>
                <Text size='sm'>Status</Text>
                <Text size='sm'>Products</Text>
                <Text size='sm'>GWP</Text>
              </SimpleGrid>
              <Divider visibleFrom='sm' />
              {assemblies.map((assembly) => (
                <UnstyledButton
                  key={assembly.id}
                  component={Link}
                  to={`/assemblies/${assembly.id}/edit`}
                  w='100%'
                  aria-label={`${assembly.name}, ${organizationAssemblyStatusLabel(assembly)}`}
                >
                  <SimpleGrid cols={{ base: 1, sm: 4 }} py='md' spacing='sm'>
                    <Title order={3}>{assembly.name}</Title>
                    <Text>
                      <Text span size='sm' hiddenFrom='sm' mr='sm'>
                        Status
                      </Text>
                      {organizationAssemblyStatusLabel(assembly)}
                    </Text>
                    <Text>
                      <Text span size='sm' hiddenFrom='sm' mr='sm'>
                        Products
                      </Text>
                      {assembly.productCount}
                    </Text>
                    <Text>
                      <Text span size='sm' hiddenFrom='sm' mr='sm'>
                        GWP
                      </Text>
                      {organizationAssemblyGwpLabel(assembly)}
                    </Text>
                  </SimpleGrid>
                  <Divider />
                </UnstyledButton>
              ))}
            </Stack>
          )}
        </Stack>
      </Container>
    </Container>
  )
}
