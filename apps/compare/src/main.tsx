import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Helmet } from 'react-helmet'
import { App } from '@/components'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Helmet>
      <meta name="description" content="LCAx Compare lets you compare and analyze multiple LCA projects." />
      {import.meta.env.VITE_UMAMI_ID ? <script defer src="https://umami.kongsgaard.eu/script.js"
                                               data-website-id={import.meta.env.VITE_UMAMI_ID}></script> : undefined}
    </Helmet>
    <App />
  </StrictMode>,
)
