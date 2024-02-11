import { ArrowRightIcon, SearchIcon, XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetails } from './order-details'

import { OrderStatus } from '@/components/order-status'
import { formatCurrency } from '@/utils/format-currency'
import { formatTime } from '@/utils/format-time'
import { useState } from 'react'

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
        <Button variant={'ghost'} size={'sm'} className='gap-1 items-center'>
          <ArrowRightIcon size={12} />
          Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button variant={'ghost'} size={'sm'} className='gap-1 items-center'>
          <XIcon size={12} />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
