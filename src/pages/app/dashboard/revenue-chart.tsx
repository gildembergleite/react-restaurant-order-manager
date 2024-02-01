import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import colors from 'tailwindcss/colors'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const data = [
  { date: '10/12', revenue: 1130 },
  { date: '11/12', revenue: 920 },
  { date: '12/12', revenue: 470 },
  { date: '13/12', revenue: 720 },
  { date: '14/12', revenue: 370 },
  { date: '15/12', revenue: 1390 },
  { date: '16/12', revenue: 810 },
]

export function RevenueChart() {
  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle>Receita no período</CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width={'100%'} height={240}>
          <LineChart data={data} style={{ fontSize: 12 }}>
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
              tickFormatter={(value: number) => value.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            />
            <Line
              type={'linear'}
              strokeWidth={2}
              dataKey={'revenue'}
              stroke={colors.violet['500']}
            />
            <CartesianGrid
              vertical={false}
              className='stroke-zinc-200 dark:stroke-zinc-600'
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
