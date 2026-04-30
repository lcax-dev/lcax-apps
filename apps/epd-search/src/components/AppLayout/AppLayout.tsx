import { AppShell, Button, Group, rem } from '@mantine/core'
import { Link, Outlet } from 'react-router'
import { Logo } from '@/components'
import { useHeadroom } from '@mantine/hooks'
import { useMatches } from '@lcax/ui'
import { authClient } from '@/lib'

export const AppLayout = () => {
  const pinned = useHeadroom({ fixedAt: 120 })
  const headerHeight = useMatches({ base: rem(50), lg: rem(65), xxl: rem(100) })
  const { data: sessionData } = authClient.useSession()

  const handleSignOut = async () => {
    await authClient.signOut()
    window.location.href = '/'
  }

  return (
    <AppShell header={{ height: headerHeight, collapsed: !pinned, offset: false }}>
      <AppShell.Header withBorder={false} px='lg' bg='grey.0'>
        <Group justify='space-between' h='100%'>
          <Logo height={headerHeight} />
          <Group>
            {sessionData ? (
              <>
                <Button component={Link} to='/profile' variant='subtle'>
                  Profile
                </Button>
                <Button variant='subtle' onClick={handleSignOut}>
                  Sign out
                </Button>
              </>
            ) : null}
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main pt={headerHeight}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
