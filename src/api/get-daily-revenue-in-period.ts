import { api } from '@/lib/axios'

interface GetDailyRevenueInPeriodResponse {
  date: string
  receipt: number
}

export async function getDailyRevenueInPeriod() {
  const response =
    await api.get<GetDailyRevenueInPeriodResponse[]>('/metrics/daily-receipt-in-period')

  return response.data
}
