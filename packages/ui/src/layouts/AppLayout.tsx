import { AppShell, Button, Group, rem } from '@mantine/core'
import { Link, Outlet } from 'react-router'
import { useHeadroom } from '@mantine/hooks'
import { ErrorBoundary, RolePermitter, useMatches, Logo } from '../components'
import { authClient } from '../lib'

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
                <Button component={Link} to='/assemblies' variant='subtle'>
                  Assemblies
                </Button>
                <RolePermitter requiredRole='admin'>
                  <Button component={Link} to='/statistics' variant='subtle'>
                    Statistics
                  </Button>
                </RolePermitter>
                <RolePermitter requiredRole='admin'>
                  <Button component={Link} to='/organizations' variant='subtle'>
                    Organizations
                  </Button>
                </RolePermitter>
                <Button component={Link} to='/profile' variant='subtle'>
                  Profile
                </Button>
                <Button variant='subtle' onClick={handleSignOut}>
                  Sign out
                </Button>
              </>
            ) : (
              <Button variant='subtle' to={'/login'} component={Link}>
                Sign in
              </Button>
            )}
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main pt={headerHeight}>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </AppShell.Main>
    </AppShell>
  )
}
