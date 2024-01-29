import { ArchiveXIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function CancelOrdersAmountCard() {
  return (
    <Card>
      <CardHeader className='flex-row items-center justify-between pb-2 space-y-0'>
        <CardTitle className='text-base'>
          Cancelamentos (mês)
        </CardTitle>
        <ArchiveXIcon size={16} />
      </CardHeader>
      <CardContent className='space-y-1'>
        <span className='text-2xl font-bold'>
          6
        </span>
        <p className='text-xs text-muted-foreground'>
          <span className='text-emerald-600 dark:text-emerald-400'>
            -5%
          </span>{' '}
          em relação ao mês anterior
        </p>
      </CardContent>
    </Card>
  )
}
