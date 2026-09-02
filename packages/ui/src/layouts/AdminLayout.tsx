import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { RolePermitter, authClient, AppLayout } from '@lcax/ui'

export const AdminLayout = () => {
  const { data, isPending } = authClient.useSession()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isPending && !data?.user) {
      navigate('/login')
    }
  })

  return (
    <RolePermitter requiredRole='admin'>
      <AppLayout />
    </RolePermitter>
  )
}
