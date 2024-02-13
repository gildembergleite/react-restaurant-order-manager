import { OrderStatus } from '@/components/order-status'
import { HttpResponse, http } from 'msw'
import { GetOrdersResponse } from '../get-orders'

const statuses: OrderStatus[] = [
  'canceled',
  'processing',
  'delivered',
  'pending',
  'delivering'
]

const orders = Array.from(({ length: 30 })).map((_, index) => {
  return {
    orderId: `order-${index + 1}`,
    customerName: `Customer ${index + 1}`,
    createdAt: new Date().toISOString(),
    status: statuses[Math.floor(Math.random() * 5)],
    total: Math.floor(Math.random() * 1000)
  }
})

export const getOrdersMock = http
  .get<never, never, GetOrdersResponse>('/orders',
    async ({ request }) => {
      const { searchParams } = new URL(request.url)

      const pageIndex = searchParams.get('pageIndex')
        ? Number(searchParams.get('pageIndex'))
        : 0
      const orderId = searchParams.get('orderId')
      const status = searchParams.get('status')
      const customerName = searchParams.get('customerName')

      let filteredOrders = orders

      if (orderId) {
        filteredOrders = filteredOrders.filter((order) =>
          order.orderId.includes(orderId)
        )
      }

      if (status) {
        filteredOrders = filteredOrders.filter((order) =>
          order.status === status
        )
      }

      if (customerName) {
        filteredOrders = filteredOrders.filter((order) =>
          order.customerName.includes(customerName)
        )
      }

      const paginatedOrders = filteredOrders.slice(
        pageIndex * 10,
        (pageIndex + 1) * 10
      )

      return HttpResponse.json({
        orders: paginatedOrders,
        meta: {
          pageIndex,
          perPage: 10,
          totalCount: filteredOrders.length
        }
      })
    }
  )
