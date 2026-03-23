import { MantineProvider } from '@mantine/core'
import { theme, AppRouter } from '@/components'
import { resolver, GraphQLProvider } from '@lcax/ui'
import { BrowserRouter } from 'react-router'
import '@mantine/core/styles.css'
import '@mantine/charts/styles.css'

export const App = () => {
  return (
    <MantineProvider theme={theme} cssVariablesResolver={resolver}>
      <GraphQLProvider url={import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </GraphQLProvider>
    </MantineProvider>
  )
}
