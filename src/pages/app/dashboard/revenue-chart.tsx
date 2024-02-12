import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import colors from 'tailwindcss/colors'

import { getDailyRevenueInPeriod } from '@/api/get-daily-revenue-in-period'
import { DatePickerWithRange } from '@/components/date-range-picker'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { formatCurrency } from '@/utils/format-currency'
import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'

export function RevenueChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })

  const { data: dailyRevenueInPeriod } = useQuery({
    queryKey: ['metrics', 'daily-revenue-in-period', dateRange],
    queryFn: () => getDailyRevenueInPeriod({
      from: dateRange?.from,
      to: dateRange?.to,
    }),
  })

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle>Receita no período</CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
        <div className='flex items-center gap-3'>
          <Label>Período:</Label>
          <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
        </div>
      </CardHeader>
      <CardContent>
        {dailyRevenueInPeriod && (
          <ResponsiveContainer width={'100%'} height={240}>
            <LineChart data={dailyRevenueInPeriod} style={{ fontSize: 12 }}>
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                dy={16}
              />
              <YAxis
                stroke='#888'
                axisLine={false}
                tickLine={false}
                width={100}
                tickMargin={20}
                tickFormatter={(value: number) => formatCurrency(value, true)}
              />
              <Line
                type={'linear'}
                strokeWidth={2}
                dataKey={'receipt'}
                stroke={colors.violet['500']}
              />
              <CartesianGrid
                vertical={false}
                className='stroke-zinc-200 dark:stroke-zinc-600'
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
