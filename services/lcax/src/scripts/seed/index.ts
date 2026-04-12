import 'dotenv/config'
import { waitForConnection } from '@/config'
import { createUser } from './user'

const main = async () => {
  await waitForConnection()

  console.log('Seed start')
  await createUser()

  console.log('Seed done')
}

await main()
