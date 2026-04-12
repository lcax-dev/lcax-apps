import { auth } from '@/config/auth'

export const createUser = async () => {
  const data = await auth.api.signUpEmail({
    body: {
      name: 'LCAx Admin',
      email: 'admin@lcax.dev',
      password: 'password1234',
    },
  })

  console.log('User Created', data)
}