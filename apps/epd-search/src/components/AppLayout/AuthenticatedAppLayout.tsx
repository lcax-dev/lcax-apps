import { AppLayout } from '@/components'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { authClient } from '@/lib'

export const AuthenticatedAppLayout = () => {
  const { data, isPending } = authClient.useSession()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isPending && !data?.user) {
      navigate('/login')
    }
  })

  return <AppLayout />
}
