import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Helmet } from 'react-helmet'
import { App } from '@/components'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Helmet>
      <meta name='description' content='LCAx Search lets you search for EPDs in seconds.' />
    </Helmet>
    <App />
  </StrictMode>,
)
