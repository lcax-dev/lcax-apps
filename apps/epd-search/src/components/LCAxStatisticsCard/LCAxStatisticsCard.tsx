import { Group, Paper, Stack, Text, Title, SegmentedControl, Skeleton, Alert, SimpleGrid } from '@mantine/core'
import { BarChart } from '@mantine/charts'
import { useMemo, useState } from 'react'
import { useGetLcaxStatisticsQuery } from '@/queries'
import { IconAlertCircle } from '@tabler/icons-react'

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
      <Alert variant='light' color='red' title='Error loading statistics' icon={<IconAlertCircle size={16} />}>
        {error.message}
      </Alert>
    )
  }

  return (
    <Paper withBorder p='xl' radius='md'>
      <Group justify='space-between' mb='lg'>
        <Stack gap={0}>
          <Title order={3}>Database Statistics</Title>
          <Text size='sm' c='dimmed'>
            Overview of items in the database
          </Text>
        </Stack>
        <SegmentedControl
          value={interval}
          onChange={(value) => setInterval(value as any)}
          data={[
            { label: 'Monthly', value: 'monthly' },
            { label: 'Quarterly', value: 'quarterly' },
            { label: 'Yearly', value: 'yearly' },
          ]}
        />
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} mb='xl'>
        <Paper withBorder p='md' radius='md'>
          <Text size='xs' c='dimmed' fw={700} tt='uppercase'>
            Total Items
          </Text>
          {loading ? (
            <Skeleton height={30} mt={5} width='40%' />
          ) : (
            <Text fw={700} size='xl'>
              {data?.lcaxStatistics?.totalCount || 0}
            </Text>
          )}
        </Paper>
        <Paper withBorder p='md' radius='md'>
          <Text size='xs' c='dimmed' fw={700} tt='uppercase'>
            EPDs
          </Text>
          {loading ? (
            <Skeleton height={30} mt={5} width='40%' />
          ) : (
            <Text fw={700} size='xl' c='blue.6'>
              {data?.lcaxStatistics?.epdsCount || 0}
            </Text>
          )}
        </Paper>
        <Paper withBorder p='md' radius='md'>
          <Text size='xs' c='dimmed' fw={700} tt='uppercase'>
            Assemblies
          </Text>
          {loading ? (
            <Skeleton height={30} mt={5} width='40%' />
          ) : (
            <Text fw={700} size='xl' c='green.6'>
              {data?.lcaxStatistics?.assembliesCount || 0}
            </Text>
          )}
        </Paper>
        <Paper withBorder p='md' radius='md'>
          <Text size='xs' c='dimmed' fw={700} tt='uppercase'>
            Products
          </Text>
          {loading ? (
            <Skeleton height={30} mt={5} width='40%' />
          ) : (
            <Text fw={700} size='xl' c='orange.6'>
              {data?.lcaxStatistics?.productsCount || 0}
            </Text>
          )}
        </Paper>
      </SimpleGrid>

      <Text fw={500} mb='md'>
        Uploads over time
      </Text>
      {loading ? (
        <Skeleton height={300} radius='md' />
      ) : (
        <BarChart
          h={300}
          data={aggregatedData}
          dataKey='date'
          type='stacked'
          series={[
            { name: 'epds', color: 'blue.6', label: 'EPDs' },
            { name: 'assemblies', color: 'green.6', label: 'Assemblies' },
            { name: 'products', color: 'orange.6', label: 'Products' },
          ]}
          tickLine='y'
        />
      )}
    </Paper>
  )
}
