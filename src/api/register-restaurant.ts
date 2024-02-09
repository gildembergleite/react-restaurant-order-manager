import { api } from '@/lib/axios'

export interface RegisterRestaurantBody {
  restaurantName: string
  managerName: string
  email: string
  phone: string
}

export async function registerRestaurant(params: RegisterRestaurantBody) {
  const { restaurantName, managerName, email, phone } = params

  await api.post('/restaurants', {
    restaurantName, managerName, email, phone
  })
}
