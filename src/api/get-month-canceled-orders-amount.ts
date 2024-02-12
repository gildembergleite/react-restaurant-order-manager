import { api } from '@/lib/axios'

interface GetMonthCanceledOrdersAmountResponse {
  amount: number
  diffFromLastMonth: number
}

export async function getMonthCanceledOrdersAmount() {
  const response =
    await api.get<GetMonthCanceledOrdersAmountResponse>(
      '/metrics/month-canceled-orders-amount'
    )

  return response.data
}
