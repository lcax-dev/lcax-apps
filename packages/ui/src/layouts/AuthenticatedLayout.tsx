import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { authClient, AppLayout } from '@lcax/ui'

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
