import { env } from '@/env'
import { setupWorker } from 'msw/browser'
import { registerRestaurantMock } from './register-restaurant-mock'
import { signInMock } from './sign-in-mock'

export const worker = setupWorker(
  signInMock,
  registerRestaurantMock
)

export async function enableMSW() {
  if (env.MODE === 'test') {
    await worker.start()
  }
}
