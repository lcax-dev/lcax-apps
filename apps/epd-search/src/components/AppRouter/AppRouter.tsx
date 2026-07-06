import { Route, Routes } from 'react-router'
import { EPDDetailPage, ResultsPage, SearchPage, StatisticsPage } from '@/pages'
import { Loading, NotFoundPage, AppLayout, AdminLayout } from '@lcax/ui'
import { lazy, Suspense } from 'react'
const UserManagementApp = lazy(async () => {
  // @ts-expect-error import of remote app
  const module = await import('user-management/app')
  return { default: module.App }
})

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<SearchPage />} />
        <Route path='/results' element={<ResultsPage />} />
        <Route path='/epds/:id' element={<EPDDetailPage />} />
        <Route
          path='/login'
          element={
            <Suspense fallback={<Loading />}>
              <UserManagementApp />
            </Suspense>
          }
        />
        <Route
          path='/profile'
          element={
            <Suspense fallback={<Loading />}>
              <UserManagementApp />
            </Suspense>
          }
        />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
      <Route element={<AdminLayout />}>
        <Route path='/statistics' element={<StatisticsPage />} />
        <Route
          path='/organizations'
          element={
            <Suspense fallback={<Loading />}>
              <UserManagementApp />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}
