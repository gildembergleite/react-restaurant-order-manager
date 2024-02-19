import { HttpResponse, http } from 'msw'

interface CancelOrderParams {
  orderId: string
}

export const cancelOrderMock = http.patch<CancelOrderParams, never, never>(
  '/orders/:orderId/cancel',
  async ({ params }) => {
    if (params.orderId === 'error-order-id') {
      return new HttpResponse(null, { status: 400 })
    }

    return new HttpResponse(null, { status: 204 })
  }
)
