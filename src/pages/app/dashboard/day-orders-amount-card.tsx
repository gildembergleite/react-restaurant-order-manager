import { UtensilsIcon } from 'lucide-react'

import { getDayOrdersAmount } from '@/api/get-day-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'

export function DayOrdersAmountCard() {
  const { data: dayOrdersAmount } = useQuery({
    queryKey: ['metrics', 'day-orders-amount'],
    queryFn: getDayOrdersAmount
  })

  return (
    <Card>
      <CardHeader className='flex-row items-center justify-between pb-2 space-y-0'>
        <CardTitle className='text-base'>
          Pedidos (dia)
        </CardTitle>
        <UtensilsIcon size={16} />
      </CardHeader>
      <CardContent className='space-y-1'>
        <span className='text-2xl font-bold'>
          {dayOrdersAmount?.amount}
        </span>
        <p className='text-xs text-muted-foreground'>
          {dayOrdersAmount && dayOrdersAmount.diffFromYesterday >= 0
            ? <span className='text-emerald-600 dark:text-emerald-400'>
              +{dayOrdersAmount?.diffFromYesterday}%
            </span>
            :<span className='text-rose-600 dark:text-rose-400'>
              -{dayOrdersAmount?.diffFromYesterday}%
            </span>
          }
          {' '}em relação ao dia anterior
        </p>
      </CardContent>
    </Card>
  )
}
