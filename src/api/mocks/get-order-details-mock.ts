import { HttpResponse, http } from 'msw'
import { GetOrderDetailsParams, GetOrderDetailsResponse } from '../get-order-details'

export const getOrderDetailsMock = http
  .get<GetOrderDetailsParams, never, GetOrderDetailsResponse>(
    '/orders/:orderId',
    ({ params }) => {
      return HttpResponse.json({
        id: params.orderId,
        customer: {
          name: 'Customer name',
          phone: '123456789',
          email: 'name@example.com',
        },
        status: 'pending',
        createdAt: new Date().toISOString(),
        orderItems: [
          {
            id: 'nas9d-98nbs-dasidh',
            quantity: 2,
            priceInCents: 2000,
            product: {
              name: 'Portuguesa'
            }
          },
          {
            id: 'a-=s90diuh-9asu89s',
            quantity: 1,
            priceInCents: 1000,
            product: {
              name: 'Margherita'
            }
          }
        ],
        totalInCents: 5000
      })
    }
  )
