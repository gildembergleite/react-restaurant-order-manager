import { UtensilsIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function DayOrdersAmountCard() {
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
          12
        </span>
        <p className='text-xs text-muted-foreground'>
          <span className='text-rose-600 dark:text-rose-400'>
            -10%
          </span>{' '}
          em relação ao dia anterior
        </p>
      </CardContent>
    </Card>
  )
}
