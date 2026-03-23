import { MantineProvider } from '@mantine/core'
import { theme, AppRouter } from '@/components'
import { resolver } from '@lcax/ui'
import { BrowserRouter } from 'react-router'
import '@mantine/core/styles.css'
import '@mantine/charts/styles.css'

export const App = () => {
  return (
    <MantineProvider theme={theme} cssVariablesResolver={resolver}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </MantineProvider>
  )
}
