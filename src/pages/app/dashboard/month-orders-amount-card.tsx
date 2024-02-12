import { UtensilsIcon } from 'lucide-react'

import { getMonthOrdersAmount } from '@/api/get-month-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { MetricsCardSkeleton } from './metric-card-skeleton'

export function MonthOrdersAmountCard() {
  const { data: monthOrdersAmount } = useQuery({
    queryKey: ['metrics', 'month-orders-amount'],
    queryFn: getMonthOrdersAmount
  })

  return (
    <Card>
      <CardHeader className='flex-row items-center justify-between pb-2 space-y-0'>
        <CardTitle className='text-base'>
          Pedidos (mês)
        </CardTitle>
        <UtensilsIcon size={16} />
      </CardHeader>
      <CardContent className='space-y-1'>
        {monthOrdersAmount
          ? (<>
            <span className='text-2xl font-bold'>
              {monthOrdersAmount.amount}
            </span>
            <p className='text-xs text-muted-foreground'>
              {monthOrdersAmount.diffFromLastMonth >= 0
                ? <span className='text-emerald-600 dark:text-emerald-400'>
                  +{monthOrdersAmount.diffFromLastMonth}%
                </span>
                : <span className='text-rose-600 dark:text-rose-400'>
                  {monthOrdersAmount.diffFromLastMonth}%
                </span>
              }
              {' '}em relação ao mês passado
            </p>
          </>)
          : (<MetricsCardSkeleton />)
        }
      </CardContent>
    </Card>
  )
}
