import { Group, Paper, Stack, Text, Title, SegmentedControl, Skeleton, Alert } from '@mantine/core'
import { BarChart } from '@mantine/charts'
import { useMemo, useState } from 'react'
import { useGetEpdStatisticsQuery } from '@/queries'
import { IconAlertCircle } from '@tabler/icons-react'

export const EPDStatisticsCard = () => {
  const [interval, setInterval] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly')

  const { data, loading, error } = useGetEpdStatisticsQuery()

  const aggregatedData = useMemo(() => {
    if (!data?.epdStatistics?.uploads) return []

    const stats: Record<string, number> = {}

    data.epdStatistics.uploads.forEach((item: any) => {
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

      stats[key] = (stats[key] || 0) + item.count
    })

    return Object.entries(stats)
      .map(([date, count]) => ({ date, count }))
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
            Overview of EPDs in the database
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

      <Group grow mb='xl'>
        <Paper withBorder p='md' radius='md'>
          <Text size='xs' c='dimmed' fw={700} tt='uppercase'>
            Total EPDs
          </Text>
          {loading ? (
            <Skeleton height={30} mt={5} width='40%' />
          ) : (
            <Text fw={700} size='xl'>
              {data?.epdStatistics?.totalCount || 0}
            </Text>
          )}
        </Paper>
      </Group>

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
          series={[{ name: 'count', color: 'blue.6', label: 'Uploads' }]}
          tickLine='y'
        />
      )}
    </Paper>
  )
}
