import { MantineProvider } from '@mantine/core'
import { AppRouter } from '../AppRouter'
import { theme } from '../Theme'
import { resolver } from '@lcax/ui'
import { BrowserRouter } from 'react-router'
import '@mantine/core/styles.css'
import '@mantine/charts/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/dropzone/styles.css'

export const App = () => {
  return (
    <MantineProvider theme={theme} cssVariablesResolver={resolver}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </MantineProvider>
  )
}
