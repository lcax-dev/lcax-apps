import { Routes, Route } from 'react-router'
import { AppLayout } from '@/components'
import { NotFoundPage, SearchPage } from '@/pages'

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<SearchPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
