import { ActionIcon, Center, Group, Menu, Text, Title, useMatches } from '@mantine/core'
import { BarChart } from '@mantine/charts'
import { Project } from 'lcax'
import { IconChevronDown } from '@tabler/icons-react'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { resultsByComponents } from '@/lib'

interface ImpactByComponentChartProps {
  project: Project
}

export const ImpactByComponentChart = ({ project }: ImpactByComponentChartProps) => {
  // @ts-expect-error classificationSystems will be in lcax v3.0
  const [classificationSystem, setClassificationSystem] = useState(project.classificationSystems[0])
  const projectColor = useMemo(() => project.metaData?.color || 'yellow', [project])
  const data = useMemo(() => project.results?.gwp? resultsByComponents({ project, classificationSystem }) : null, [project, classificationSystem])

  const series = useMemo(
    () =>
      Object.keys(data || {})
        .filter((key) => key !== 'classificationSystem')
        .map((key, index) => ({
          name: key,
          color: `${projectColor}.${index % 10}`,
        })),
    [data, projectColor],
  )
  const height = useMatches({ base: '40vh', xl: '20vh' })

  return (
    <>
      <Group justify="space-between" align="flex-end">
        <Title order={2} mt="xl" pt="xl">
          Impacts by Building Component
        </Title>
        {!data ? null :
          <ClassificationDropdown
            classificationSystem={classificationSystem}
            setClassificationSystem={setClassificationSystem}
            // @ts-expect-error classificationSystems will be in lcax v3.0
            classificationSystems={project.classificationSystems}
          />}
      </Group>
      {!data ? <Center h={height}><Text>No Impact Results Found</Text></Center> :
        <BarChart
          h={height}
          data={[data]}
          dataKey="classificationSystem"
          series={series}
          orientation="vertical"
          tickLine="none"
          gridAxis="none"
          type="stacked"
          barChartProps={{ barGap: 20, stackOffset: 'sign' }}
          withXAxis={true}
          withYAxis={false}
          valueFormatter={(value) => value.toFixed(2)}
          withBarValueLabel
          valueLabelProps={{ position: 'inside', fill: 'black' }}
          withLegend
          legendProps={{ verticalAlign: 'bottom', align: 'right' }}
          xAxisLabel="Impact (kg CO₂-eq/m²·year)"
        />}
    </>
  )
}

interface ClassificationDropdownProps {
  classificationSystem: string
  classificationSystems: string[]
  setClassificationSystem: Dispatch<SetStateAction<string>>
}

const ClassificationDropdown = (props: ClassificationDropdownProps) => {
  const { classificationSystem, classificationSystems, setClassificationSystem } = props

  return (
    <Group justify="flex-end">
      <Text>{classificationSystem}</Text>
      <Menu radius={0}>
        <Menu.Target>
          <ActionIcon variant="transparent" color="black">
            <IconChevronDown />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          {classificationSystems.map((system) => (
            <Menu.Item key={system} onClick={() => setClassificationSystem(system)}>
              {system}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </Group>
  )
}
