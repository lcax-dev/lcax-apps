import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { theme, AppRouter } from '@/components'
import { resolver, GraphQLProvider } from '@lcax/ui'
import { BrowserRouter } from 'react-router'
import '@mantine/core/styles.css'
import '@mantine/charts/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/dropzone/styles.css'

export const App = () => {
  return (
    <MantineProvider theme={theme} cssVariablesResolver={resolver}>
      <Notifications />
      <GraphQLProvider url={import.meta.env.VITE_BACKEND_URL}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </GraphQLProvider>
    </MantineProvider>
  )
}
