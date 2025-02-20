import { MantineProvider } from '@mantine/core'
import { theme, AppRouter, ScrollToTop } from '@/components'
import { ProjectProvider } from '@/contexts'
import { BrowserRouter } from 'react-router'
import '@mantine/core/styles.css'
import '@mantine/charts/styles.css'

export const App = () => {
  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <ScrollToTop />
        <ProjectProvider>
          <AppRouter />
        </ProjectProvider>
      </BrowserRouter>
    </MantineProvider>
  )
}
