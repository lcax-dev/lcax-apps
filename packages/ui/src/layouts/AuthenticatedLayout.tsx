import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { authClient } from '../lib'
import { AppLayout } from './AppLayout'

export const AuthenticatedLayout = () => {
  const { data, isPending } = authClient.useSession()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isPending && !data?.user) {
      navigate('/login')
    }
  })

  return <AppLayout />
}
