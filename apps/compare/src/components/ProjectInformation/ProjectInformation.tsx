import { Container, SimpleGrid, Space, Stack } from '@mantine/core'
import { Project } from 'lcax'
import { useMatches } from '@lcax/ui'
import { getCountryName, snakeCaseToHumanCase, sumResultsProject, transformUnit } from '@/lib'
import { InfoBlock } from '@/components'

interface ProjectInformationProps {
  project: Project | undefined
}

export const ProjectInformation = ({ project }: ProjectInformationProps) => {
  const containerSize = useMatches({ md: 'md', xl: 'xl', xxl: 'xxl' })
  if (!project) return null

  return (
    <Container my='xl' size={containerSize}>
      <SimpleGrid cols={{ base: 1, md: 2 }} pb='xl' spacing='xl'>
        <InfoBlock title='Project Address' info={project.location.address} />
        <SimpleGrid cols={2} verticalSpacing='lg'>
          <InfoBlock title='Country' info={getCountryName(project.location.country)} />
          <InfoBlock title='City' info={project.location.city} />
          <InfoBlock
            title='Building Typology'
            info={project.projectInfo?.buildingTypology
              .map((typology: string) => snakeCaseToHumanCase(typology))
              .join(', ')}
          />
          <InfoBlock title='Building Type' info={snakeCaseToHumanCase(project.projectInfo?.buildingType || '')} />
          <InfoBlock title='Project Phase' info={snakeCaseToHumanCase(project.projectPhase)} />
          <InfoBlock title='LCA Software' info={project.softwareInfo.lcaSoftware} />
        </SimpleGrid>
      </SimpleGrid>
      <Space h='md' />
      <SimpleGrid cols={{ base: 1, md: 2 }} pt='xl' spacing='xl'>
        <Stack gap='xl'>
          <InfoBlock
            title='Total Impact (All)'
            info={project.results?.gwp ? sumResultsProject({ project }).toFixed(2) : null}
            unit={'kg CO₂-eq/m²·year'}
          />
          <InfoBlock
            title='Total Impact (Excluding D)'
            info={
              project.results?.gwp
                ? sumResultsProject({
                    project,
                    excludeModules: ['d'],
                  }).toFixed(2)
                : null
            }
            unit={'kg CO₂-eq/m²·year'}
          />
        </Stack>
        <SimpleGrid cols={2} verticalSpacing='lg'>
          <InfoBlock
            title='Gross Floor Area'
            info={project.projectInfo?.grossFloorArea?.value}
            // @ts-expect-error grossFloorArea has unit
            unit={transformUnit(project.projectInfo?.grossFloorArea?.unit)}
          />
          <InfoBlock title='Floors Above Ground' info={project.projectInfo?.floorsAboveGround} />
          <InfoBlock
            title='Life Cycle Modules'
            info={project.lifeCycleModules
              .toSorted()
              .map((stage) => (stage as unknown as string).toUpperCase())
              .join(', ')}
          />
          <InfoBlock
            title='Impact Categoires'
            info={project.impactCategories
              .toSorted()
              .map((category: string) => category.toUpperCase())
              .join(', ')}
          />
        </SimpleGrid>
      </SimpleGrid>
    </Container>
  )
}
