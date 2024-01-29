import { UtensilsIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function MonthOrdersAmountCard() {
  return (
    <Card>
      <CardHeader className='flex-row items-center justify-between pb-2 space-y-0'>
        <CardTitle className='text-base'>
          Pedidos (mês)
        </CardTitle>
        <UtensilsIcon size={16} />
      </CardHeader>
      <CardContent className='space-y-1'>
        <span className='text-2xl font-bold'>
          246
        </span>
        <p className='text-xs text-muted-foreground'>
          <span className='text-emerald-600 dark:text-emerald-400'>
            +6%
          </span>{' '}
          em relação ao mês passado
        </p>
      </CardContent>
    </Card>
  )
}
