import { Route, Routes } from 'react-router'
import { AcceptInvitationPage, LoginPage, OrganizationPage, OrganizationsPage, ProfilePage } from '@/pages'
import { AdminLayout, AuthenticatedLayout, NotFoundPage } from '@lcax/ui'

export const AppRouter = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/organizations' element={<OrganizationsPage />} />
      <Route path='/accept-invitation/:token' element={<AcceptInvitationPage />} />
      <Route path='*' element={<NotFoundPage />} />
      <Route element={<AuthenticatedLayout />}>
        <Route path='/organizations/:organizationId' element={<OrganizationPage />} />
      </Route>
      <Route element={<AdminLayout />}>
        <Route path='/organizations/:organizationId' element={<OrganizationPage />} />
      </Route>
    </Routes>
  )
}
