import { api } from '@/lib/axios'

interface GetOrdersQuery {
  pageIndex?: number | null
  orderId?: string | null
  customerName?: string | null
  status?: string | null
}

export interface GetOrdersResponse {
  orders: {
      orderId: string
      createdAt: string
      status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
      customerName: string
      total: number
  }[]
  meta: {
      pageIndex: number
      perPage: number
      totalCount: number
  }
}

export async function getOrders({ pageIndex, orderId, status, customerName }: GetOrdersQuery) {
  const response = await api.get<GetOrdersResponse>('/orders', {
    params: {
      pageIndex,
      orderId,
      status: status === 'all' ? undefined : status,
      customerName
    }
  })

  return response.data
}
