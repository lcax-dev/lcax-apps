import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '@/components'
import '@mantine/core/styles.css'
import '@mantine/charts/styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
