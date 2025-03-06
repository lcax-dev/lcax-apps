import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import { AppLayout } from '@/components'
import { Loading } from '@lcax/ui'
import { Container } from '@mantine/core'

const ProjectsPage = lazy(() => import('@/pages/ProjectsPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))
const LandingPage = lazy(() => import('@/pages/LandingPage'))
const DetailsPage = lazy(() => import('@/pages/DetailsPage'))
const DataViewerPage = lazy(() => import('@/pages/DataViewerPage'))

export const AppRouter = () => (
  <Suspense
    fallback={
      <Container h='100vh'>
        <Loading />
      </Container>
    }
  >
    <Routes>
      <Route element={<AppLayout />}>
        <Route path='/' element={<LandingPage />} />
        <Route path='/projects' element={<ProjectsPage />} />
        <Route path='/projects/:projectId/details' element={<DetailsPage />} />
        <Route path='/projects/:projectId/view' element={<DataViewerPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Suspense>
)
