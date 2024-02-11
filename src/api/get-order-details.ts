import { OrderStatus } from '@/components/order-status'
import { api } from '@/lib/axios'

interface GetOrderDetailsResponse {
  status: OrderStatus
  id: string
  createdAt: string
  totalInCents: number
  customer: {
      name: string
      email: string
      phone: string | null
  }
  orderItems: {
    id: string
    priceInCents: number
    quantity: number
    product: {
      name: string
    }
  }[]
}

export async function getOrderDetails(orderId: string) {
  const response = await api.get<GetOrderDetailsResponse>(`/orders/${orderId}`)

  return response.data
}
