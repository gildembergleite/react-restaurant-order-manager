import { DollarSignIcon } from 'lucide-react'

import { getMonthRevenue } from '@/api/get-month-revenue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/utils/format-currency'
import { useQuery } from '@tanstack/react-query'
import { MetricsCardSkeleton } from './metric-card-skeleton'

export function MonthRevenueCard() {
  const { data: monthRevenue } = useQuery({
    queryKey: ['metrics', 'month-revenue'],
    queryFn: getMonthRevenue
  })

  return (
    <Card>
      <CardHeader className='flex-row items-center justify-between pb-2 space-y-0'>
        <CardTitle className='text-base'>
          Receita total (mês)
        </CardTitle>
        <DollarSignIcon size={16} />
      </CardHeader>
      <CardContent className='space-y-1'>
        {monthRevenue
          ? (
            <>
              <span className='text-2xl font-bold'>
                {formatCurrency(monthRevenue.receipt, true)}
              </span>
              <p className='text-xs text-muted-foreground'>
                {monthRevenue && monthRevenue.diffFromLastMonth >= 0
                  ? <span className='text-emerald-600 dark:text-emerald-400'>
                    +{monthRevenue?.diffFromLastMonth}%
                  </span>
                  : <span className='text-rose-600 dark:text-rose-400'>
                    {monthRevenue?.diffFromLastMonth}%
                  </span>
                }
                {' '}em relação ao mês passado
              </p>
            </>
          )
          : (
            <MetricsCardSkeleton />
          )
        }
      </CardContent>
    </Card>
  )
}
