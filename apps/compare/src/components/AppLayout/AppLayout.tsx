import { AppShell, rem } from '@mantine/core'
import { Outlet } from 'react-router'
import { Logo } from '@/components'
import { useHeadroom } from '@mantine/hooks'
import { useMatches } from '@lcax/ui'

export const AppLayout = () => {
  const pinned = useHeadroom({ fixedAt: 120 })
  const headerHeight = useMatches({ base: rem(50), lg: rem(65), xxl: rem(100) })

  return (
    <AppShell header={{ height: headerHeight, collapsed: !pinned, offset: false }}>
      <AppShell.Header withBorder={false} pl='lg' bg='grey.0'>
        <Logo height={headerHeight} />
      </AppShell.Header>
      <AppShell.Main pt={`calc(${headerHeight}`}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
