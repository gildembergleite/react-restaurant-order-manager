import { api } from '@/lib/axios'

interface GetDailyRevenueInPeriodQuery {
  from?: Date
  to?: Date
}

interface GetDailyRevenueInPeriodResponse {
  date: string
  receipt: number
}

export async function getDailyRevenueInPeriod({
  from,
  to
}: GetDailyRevenueInPeriodQuery) {
  const response =
    await api.get<GetDailyRevenueInPeriodResponse[]>(
      '/metrics/daily-receipt-in-period',
      {
        params: {
          from,
          to
        }
      }
    )

  return response.data
}
