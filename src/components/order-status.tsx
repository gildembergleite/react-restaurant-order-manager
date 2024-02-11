import { cn } from '@/lib/utils'
import { ClassNameValue } from 'tailwind-merge'
import { Skeleton } from './ui/skeleton'

export type OrderStatus =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

type OrderStatusInfo = {
  value: string
  color: ClassNameValue
}

const orderStatusMap: Record<OrderStatus, OrderStatusInfo> = {
  pending: { value: 'Pendente', color: 'bg-slate-500' },
  canceled: { value: 'Cancelado', color: 'bg-rose-500' },
  processing: { value: 'Em preparo', color: 'bg-amber-500' },
  delivering: { value: 'Em rota', color: 'bg-sky-500' },
  delivered: { value: 'Entregue', color: 'bg-green-500' }
}

export function OrderStatus({ status }: { status: OrderStatus | undefined}) {
  return (
    <>
      {status
        ? (
          <div className='flex items-center gap-2'>
            <span className={cn('h-2 w-2 rounded-full', orderStatusMap[status].color)} />
            <span className='font-medium text-muted-foreground'>
              {orderStatusMap[status].value}
            </span>
          </div>
        )
        : <Skeleton className='h-4 w-20 rounded-full' />
      }
    </>
  )
}
