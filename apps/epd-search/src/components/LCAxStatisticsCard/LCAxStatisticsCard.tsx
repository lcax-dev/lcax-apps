import { Button, Divider, Group, Menu, SimpleGrid, Skeleton, Stack, Text, Title } from '@mantine/core'
import { BarChart } from '@mantine/charts'
import { useMemo, useState } from 'react'
import { useGetLcaxStatisticsQuery } from '../../queries'
import { IconChevronDown } from '@tabler/icons-react'
import { InfoBlock } from '../InfoBlock'

export const LCAxStatisticsCard = () => {
  const [interval, setInterval] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly')

  const { data, loading, error } = useGetLcaxStatisticsQuery()

  const aggregatedData = useMemo(() => {
    if (!data?.lcaxStatistics?.uploads) return []

    const stats: Record<string, { epds: number; assemblies: number; products: number }> = {}

    data.lcaxStatistics.uploads.forEach((item: any) => {
      const date = new Date(item.date)
      let key = ''

      if (interval === 'monthly') {
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      } else if (interval === 'quarterly') {
        const quarter = Math.floor(date.getMonth() / 3) + 1
        key = `${date.getFullYear()}-Q${quarter}`
      } else if (interval === 'yearly') {
        key = `${date.getFullYear()}`
      }

      if (!stats[key]) {
        stats[key] = { epds: 0, assemblies: 0, products: 0 }
      }
      stats[key].epds += item.epds
      stats[key].assemblies += item.assemblies
      stats[key].products += item.products
    })

    return Object.entries(stats)
      .map(([date, counts]) => ({ date, ...counts }))
      .sort((a, b) => a.date.localeCompare(b.date))
  }, [data, interval])

  if (error) {
    return (
      <Text c='red' py='xl'>
        Error loading statistics: {error.message}
      </Text>
    )
  }

  return (
    <Stack gap='xl'>
      <Group justify='space-between' align='flex-end'>
        <Stack gap='xs'>
          <Text>Overview</Text>
          <Title order={2}>Database Statistics</Title>
        </Stack>
        <Menu radius={0}>
          <Menu.Target>
            <Button variant='default' radius='xl' rightSection={<IconChevronDown size={16} />}>
              {interval.charAt(0).toUpperCase() + interval.slice(1)}
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => setInterval('monthly')}>Monthly</Menu.Item>
            <Menu.Item onClick={() => setInterval('quarterly')}>Quarterly</Menu.Item>
            <Menu.Item onClick={() => setInterval('yearly')}>Yearly</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>

      <Divider />

      <SimpleGrid cols={{ base: 2, sm: 4 }} spacing='xl'>
        {loading ? (
          <>
            <Skeleton height={60} />
            <Skeleton height={60} />
            <Skeleton height={60} />
            <Skeleton height={60} />
          </>
        ) : (
          <>
            <InfoBlock title='Total Items' info={data?.lcaxStatistics?.totalCount || 0} />
            <InfoBlock title='EPDs' info={data?.lcaxStatistics?.epdsCount || 0} />
            <InfoBlock title='Assemblies' info={data?.lcaxStatistics?.assembliesCount || 0} />
            <InfoBlock title='Products' info={data?.lcaxStatistics?.productsCount || 0} />
          </>
        )}
      </SimpleGrid>

      <Stack gap='md' mt='lg'>
        <Title order={3}>Uploads over time</Title>
        <Divider />
        {loading ? (
          <Skeleton height={300} />
        ) : (
          <BarChart
            h={300}
            data={aggregatedData}
            dataKey='date'
            type='stacked'
            series={[
              { name: 'epds', color: 'yellow.4', label: 'EPDs' },
              { name: 'assemblies', color: 'grey.4', label: 'Assemblies' },
              { name: 'products', color: 'indigo.5', label: 'Products' },
            ]}
            tickLine='none'
            gridAxis='none'
          />
        )}
      </Stack>
    </Stack>
  )
}
