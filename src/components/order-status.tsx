import { cn } from '@/lib/utils'

export type OrderStatus =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

type OrderStatusInfo = {
  value: string
  color: string
}

export const orderStatusMap: Record<OrderStatus, OrderStatusInfo> = {
  pending: { value: 'Pendente', color: 'bg-slate-500' },
  canceled: { value: 'Cancelado', color: 'bg-rose-500' },
  processing: { value: 'Em preparo', color: 'bg-amber-500' },
  delivering: { value: 'Em rota', color: 'bg-sky-500' },
  delivered: { value: 'Entregue', color: 'bg-green-500' }
}

export function OrderStatus({ status }: { status: OrderStatus | undefined}) {
  return (
    <>
      {status && (
        <div className='flex items-center gap-2 whitespace-nowrap pr-12'>
          <span data-testid={`badge-${status}`} className={cn('h-2 w-2 rounded-full', orderStatusMap[status].color)} />
          <span className='font-medium text-muted-foreground'>
            {orderStatusMap[status].value}
          </span>
        </div>
      )
      }
    </>
  )
}
