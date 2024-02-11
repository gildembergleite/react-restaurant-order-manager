import { ArrowRightIcon, SearchIcon, XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetails } from './order-details'

import { approveOrder } from '@/api/approve-order'
import { cancelOrder } from '@/api/cancel-order'
import { deliverOrder } from '@/api/deliver-order'
import { dispatchOrder } from '@/api/dispatch-order'
import { GetOrdersResponse } from '@/api/get-orders'
import { OrderStatus } from '@/components/order-status'
import { formatCurrency } from '@/utils/format-currency'
import { formatTime } from '@/utils/format-time'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

interface OrderTableRow {
  order: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }
}

export function OrderTableRow({ order }: OrderTableRow) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const queryClient = useQueryClient()

  function updateOrderStatusOnCache(orderId: string, status: OrderStatus) {
    const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders']
    })

    ordersListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return

      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.orderId === orderId) {
            return { ...order, status }
          }

          return order
        })
      })
    })
  }

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } = useMutation({
    mutationFn: cancelOrder,
    async onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, 'canceled')
    }
  })

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } = useMutation({
    mutationFn: approveOrder,
    async onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, 'processing')
    }
  })

  const { mutateAsync: dispatchOrderFn, isPending: isDispathingOrder } = useMutation({
    mutationFn: dispatchOrder,
    async onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, 'delivering')
    }
  })

  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } = useMutation({
    mutationFn: deliverOrder,
    async onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, 'delivered')
    }
  })

  const canICancelOrder = !['pending', 'processing'].includes(order.status)

  async function handleCancelOrder(orderId: string) {
    await cancelOrderFn({ orderId })
    toast.success('Pedido cancelador com sucesso!')
  }

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button size={'sm'}>
              <SearchIcon size={12} />
              <span className='sr-only'>Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetails orderId={order.orderId} open={isDetailsOpen} />
        </Dialog>
      </TableCell>
      <TableCell>
        <div className='w-48 font-mone text-xs font-medium pr-4'>
          {order.orderId}
        </div>
      </TableCell>
      <TableCell className='text-muted-foreground whitespace-nowrap pr-4'>
        {formatTime(order.createdAt)}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className='font-medium whitespace-nowrap pr-4'>
        {order.customerName}
      </TableCell>
      <TableCell className='font-medium whitespace-nowrap pr-4'>
        {formatCurrency(order.total, true)}
      </TableCell>
      <TableCell>
        {order.status === 'pending' && (
          <Button
            onClick={() => approveOrderFn({ orderId: order.orderId })}
            variant={'ghost'}
            size={'sm'}
            className='gap-1 items-center'
            disabled={isApprovingOrder}
          >
            <ArrowRightIcon size={12} />
            Aprovar
          </Button>
        )}

        {order.status === 'processing' && (
          <Button
            onClick={() => dispatchOrderFn({ orderId: order.orderId })}
            variant={'ghost'}
            size={'sm'}
            className='gap-1 items-center'
            disabled={isDispathingOrder}
          >
            <ArrowRightIcon size={12} />
            Em rota
          </Button>
        )}

        {order.status === 'delivering' && (
          <Button
            onClick={() => deliverOrderFn({ orderId: order.orderId })}
            variant={'ghost'}
            size={'sm'}
            className='gap-1 items-center'
            disabled={isDeliveringOrder}
          >
            <ArrowRightIcon size={12} />
            Entregue
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          onClick={() => handleCancelOrder(order.orderId)}
          disabled={canICancelOrder || isCancelingOrder}
          variant={'ghost'}
          size={'sm'}
          className='gap-1 items-center'
        >
          <XIcon size={12} />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
