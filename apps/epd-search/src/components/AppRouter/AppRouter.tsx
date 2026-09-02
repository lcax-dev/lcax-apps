import { Route, Routes } from 'react-router'
import {
  AssemblyDetailPage,
  EPDDetailPage,
  OrganizationAssembliesPage,
  OrganizationAssemblyEditorPage,
  ResultsPage,
  SearchPage,
  StatisticsPage,
} from '@/pages'
import { Loading, NotFoundPage, AppLayout, AdminLayout, AuthenticatedLayout } from '@lcax/ui'
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
        <Route path='/assemblies/:id' element={<AssemblyDetailPage />} />
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
        <Route
          path='/accept-invitation/:token'
          element={
            <Suspense fallback={<Loading />}>
              <UserManagementApp />
            </Suspense>
          }
        />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
      <Route element={<AuthenticatedLayout />}>
        <Route path='/assemblies' element={<OrganizationAssembliesPage />} />
        <Route path='/assemblies/new' element={<OrganizationAssemblyEditorPage />} />
        <Route path='/assemblies/:id/edit' element={<OrganizationAssemblyEditorPage />} />
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
