import { ActionIcon, Container, Divider, Group, rem, Stack, Text, Title, Tree, TreeNodeData } from '@mantine/core'
import { Project } from 'lcax'
import { Link } from 'react-router'
import { IconArrowBack, IconChevronDown } from '@tabler/icons-react'
import { useMemo } from 'react'
import { camelCaseToHumanCase } from '@/lib'
import { ErrorBoundary, useMatches } from '@lcax/ui'

interface DataViewerProps {
  project: Project | undefined
}

export const DataViewer = ({ project }: DataViewerProps) => {
  const treeData: TreeNodeData[] = useMemo(() => {
    if (!project) return []
    return [
      {
        label: 'Project',
        value: project.id,
        children: Object.entries(project).map(([key, value]) => parseTreeData([key, value])),
      },
    ]
  }, [project])

  const containerSize = useMatches({ md: 'md', xl: 'xl' })
  const titleSize = useMatches({ md: rem(46), xl: rem(64) })

  if (!project) {
    return (
      <Stack justify='center' align='center' h='100vh'>
        <Title>No Project Found</Title>
        <ActionIcon variant='transparent' color='black' component={Link} to={'/projects'}>
          <IconArrowBack />
        </ActionIcon>
      </Stack>
    )
  }

  return (
    <Container pt='xl' size={containerSize}>
      <Group justify='space-between'>
        <Title size={titleSize}>{project.name}</Title>{' '}
        <ActionIcon variant='transparent' color='black' component={Link} to={`/projects/${project.id}/details`}>
          <IconArrowBack />
        </ActionIcon>
      </Group>
      <Divider />
      <Tree
        mt='xl'
        data={treeData}
        levelOffset={23}
        renderNode={({ node, expanded, hasChildren, elementProps }) => (
          <Group gap={5} {...elementProps}>
            {hasChildren && (
              <IconChevronDown size={18} style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            )}
            <Group>
              {isNaN(node.label) ? (
                <>
                  <Title order={3}>{camelCaseToHumanCase(node.label as string)}:</Title>
                  <ErrorBoundary>
                    <Text>{node.value}</Text>
                  </ErrorBoundary>
                </>
              ) : (
                <ErrorBoundary>
                  <Text>{node.label === node.value ? '' : node.value}</Text>
                </ErrorBoundary>
              )}
            </Group>
          </Group>
        )}
      />
    </Container>
  )
}

const parseTreeData = ([key, value]: [string, object]): TreeNodeData => {
  if (!value) {
    return { label: key, value }
  } else if (typeof value === 'object') {
    return {
      label: key,
      value: value?.id || key,
      children: Object.entries(value).map(([key, value]) => parseTreeData([key, value])),
    }
  }
  return { label: key, value }
}
