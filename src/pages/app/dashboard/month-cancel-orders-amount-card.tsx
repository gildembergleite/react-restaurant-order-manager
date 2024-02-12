import { ArchiveXIcon } from 'lucide-react'

import { getMonthCanceledOrdersAmount } from '@/api/get-month-canceled-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { MetricsCardSkeleton } from './metric-card-skeleton'

export function CancelOrdersAmountCard() {
  const { data: monthCanceledOrders } = useQuery({
    queryKey: ['metrics', 'month-canceled-orders'],
    queryFn: getMonthCanceledOrdersAmount
  })

  return (
    <Card>
      <CardHeader className='flex-row items-center justify-between pb-2 space-y-0'>
        <CardTitle className='text-base'>
          Cancelamentos (mês)
        </CardTitle>
        <ArchiveXIcon size={16} />
      </CardHeader>
      <CardContent className='space-y-1'>
        {monthCanceledOrders
          ? (<>
            <span className='text-2xl font-bold'>
              {monthCanceledOrders.amount}
            </span>
            <p className='text-xs text-muted-foreground'>
              {monthCanceledOrders.diffFromLastMonth <= 0
                ? <span className='text-emerald-600 dark:text-emerald-400'>
                  {monthCanceledOrders.diffFromLastMonth}%
                </span>
                : <span className='text-rose-600 dark:text-rose-400'>
                  +{monthCanceledOrders.diffFromLastMonth}%
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
