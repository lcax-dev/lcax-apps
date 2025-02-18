import { MantineProvider } from '@mantine/core'
import { theme, AppRouter } from '@/components'
import { ProjectProvider } from '@/contexts'
import { BrowserRouter } from 'react-router'
import '@mantine/core/styles.css'
import '@mantine/charts/styles.css'

export const App = () => {
  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <ProjectProvider>
          <AppRouter />
        </ProjectProvider>
      </BrowserRouter>
    </MantineProvider>
  )
}
