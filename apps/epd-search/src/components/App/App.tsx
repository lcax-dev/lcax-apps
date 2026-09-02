import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { theme } from '../Theme'
import { AppRouter } from '../AppRouter'
import { resolver, GraphQLProvider, DevUI } from '@lcax/ui'
import { createBrowserRouter, RouterProvider } from 'react-router'
import '@mantine/core/styles.css'
import '@mantine/charts/styles.css'
import '@mantine/notifications/styles.css'

const router = createBrowserRouter([
  {
    path: '*',
    element: (
      <>
        <AppRouter />
        {import.meta.env.VITE_DEV ? <DevUI /> : null}
      </>
    ),
  },
])

export const App = () => {
  return (
    <MantineProvider theme={theme} cssVariablesResolver={resolver}>
      <Notifications />
      <GraphQLProvider url={import.meta.env.VITE_BACKEND_URL}>
        <RouterProvider router={router} />
      </GraphQLProvider>
    </MantineProvider>
  )
}
