import { Routes, Route } from 'react-router'
import { AppLayout } from '@/components'
import { NotFoundPage, SearchPage, ResultsPage } from '@/pages'

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<SearchPage />} />
        <Route path='results' element={<ResultsPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
