import { AppShell, rem, Group, Button } from '@mantine/core'
import { Outlet, Link } from 'react-router'
import { Logo } from '@/components'
import { useHeadroom } from '@mantine/hooks'
import { useMatches } from '@lcax/ui'
import { useSession, authClient } from '@/lib/auth'

export const AppLayout = () => {
  const pinned = useHeadroom({ fixedAt: 120 })
  const headerHeight = useMatches({ base: rem(50), lg: rem(65), xxl: rem(100) })
  const { data: session } = useSession()

  return (
    <AppShell header={{ height: headerHeight, collapsed: !pinned, offset: false }}>
      <AppShell.Header withBorder={false} px='lg' bg='grey.0'>
        <Group justify='space-between' h='100%'>
          <Logo height={headerHeight} />
          <Group>
            {session ? (
              <>
                <Button component={Link} to='/profile' variant='subtle'>
                  Profile
                </Button>
                <Button
                  variant='subtle'
                  onClick={async () => {
                    await authClient.signOut()
                  }}
                >
                  Sign out
                </Button>
              </>
            ) : (
              <Button component={Link} to='/login' variant='subtle'>
                Sign in
              </Button>
            )}
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main pt={headerHeight}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
