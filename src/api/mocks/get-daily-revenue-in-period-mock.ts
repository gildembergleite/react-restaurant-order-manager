import { HttpResponse, http } from 'msw'
import { GetDailyRevenueInPeriodResponse } from '../get-daily-revenue-in-period'

export const getDailyRevenueInPeriodMock = http
  .get<never, never, GetDailyRevenueInPeriodResponse[]>(
    '/metrics/daily-receipt-in-period',
    () => {
      return HttpResponse.json([
        { receipt: 2000000, date: '06/02/2024' },
        { receipt: 8000000, date: '07/02/2024' },
        { receipt: 5000000, date: '08/02/2024' },
        { receipt: 4000000, date: '09/02/2024' },
        { receipt: 3500000, date: '10/02/2024' },
        { receipt: 1200000, date: '11/02/2024' },
        { receipt: 8700000, date: '12/02/2024' }
      ])
    }
  )
