import { HttpResponse, http } from 'msw'
import { GetPopularProductsResponse } from '../get-popular-products'

export const getPopularProductsMock = http
  .get<never, never, GetPopularProductsResponse[]>(
    '/metrics/popular-products',
    () => {
      return HttpResponse.json([
        { amount: 20, product: 'Muzarela' },
        { amount: 80, product: 'Calabresa' },
        { amount: 50, product: 'Frango' },
        { amount: 40, product: 'Margherita' },
        { amount: 35, product: 'Carne do Sol' }
      ])
    }
  )
