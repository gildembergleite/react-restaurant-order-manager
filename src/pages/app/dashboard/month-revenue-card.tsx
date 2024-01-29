import { DollarSignIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function MonthRevenueCard() {
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
          R$ 1248,60
        </span>
        <p className='text-xs text-muted-foreground'>
          <span className='text-emerald-600 dark:text-emerald-400'>
            +2%
          </span>{' '}
          em relação ao mês passado
        </p>
      </CardContent>
    </Card>
  )
}
