import { Routes, Route } from 'react-router'
import { AppLayout, AuthenticatedAppLayout } from '@/components'
import { NotFoundPage, SearchPage, ResultsPage, EPDDetailPage, LoginPage, ProfilePage } from '@/pages'

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<SearchPage />} />
        <Route path='results' element={<ResultsPage />} />
        <Route path='epd/:id' element={<EPDDetailPage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
      <Route element={<AuthenticatedAppLayout />}>
        <Route path='profile' element={<ProfilePage />} />
      </Route>
    </Routes>
  )
}
