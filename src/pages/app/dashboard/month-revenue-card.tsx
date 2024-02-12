import { DollarSignIcon } from 'lucide-react'

import { getMonthRevenue } from '@/api/get-month-revenue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { formatCurrency } from '@/utils/format-currency'
import { useQuery } from '@tanstack/react-query'

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
        <span className='text-2xl font-bold'>
          {monthRevenue
            ? formatCurrency(monthRevenue.receipt, true)
            : <Skeleton className='h-6 w-32' />
          }
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
      </CardContent>
    </Card>
  )
}
