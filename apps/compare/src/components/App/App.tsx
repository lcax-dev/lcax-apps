import { MantineProvider } from '@mantine/core'
import { theme, AppRouter } from '@/components'
import { ProjectProvider } from '@/contexts'
import { BrowserRouter } from 'react-router'

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
