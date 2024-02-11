
import { getOrderDetails } from '@/api/get-order-details'
import { OrderStatus } from '@/components/order-status'
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatCurrency } from '@/utils/format-currency'
import { formatTime } from '@/utils/format-time'
import { useQuery } from '@tanstack/react-query'

interface OrderDetailsProps {
  orderId: string
  open: boolean
}

export function OrderDetails({ orderId, open }: OrderDetailsProps) {

  const { data: order } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrderDetails(orderId),
    enabled: open
  })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className='flex gap-2'>
          <span>ID:</span>
          {order?.id ? order.id : <Skeleton className='h-5 w-64' />}
        </DialogTitle>
      </DialogHeader>
      <div className='space-y-6'>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className='text-muted-foreground'>Status</TableCell>
              <TableCell className='flex justify-end'>
                <OrderStatus status={order?.status} />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className='text-muted-foreground'>Cliente</TableCell>
              <TableCell className='flex justify-end'>
                {order?.customer.name
                  ? order?.customer.name
                  : <Skeleton className='h-4 w-32' />
                }
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className='text-muted-foreground'>Telefone</TableCell>
              <TableCell className='flex justify-end'>
                {order?.customer.phone
                  ? order.customer.phone
                  : order?.customer.phone === undefined
                    ? <Skeleton className='h-4 w-24' />
                    : 'Sem número'
                }
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className='text-muted-foreground'>Realizado</TableCell>
              <TableCell className='flex justify-end'>
                {order?.createdAt
                  ? formatTime(order?.createdAt)
                  : <Skeleton className='h-4 w-20' />
                }
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produtos</TableHead>
              <TableHead className='text-right'>Qtd.</TableHead>
              <TableHead className='text-right'>Preço</TableHead>
              <TableHead className='text-right'>Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order?.orderItems.map((orderItem) => (
              <TableRow key={orderItem.id}>
                <TableCell>{orderItem.product.name}</TableCell>
                <TableCell className='text-right'>
                  {orderItem.quantity}
                </TableCell>
                <TableCell className='text-right'>
                  {orderItem.priceInCents
                    ? formatCurrency(orderItem.priceInCents)
                    : <Skeleton className='h-4 w-12' />
                  }
                </TableCell>
                <TableCell className='text-right'>
                  {orderItem.priceInCents
                    ? formatCurrency(orderItem.priceInCents * orderItem.quantity)
                    : <Skeleton className='h-4 w-12' />
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total do pedido</TableCell>
              <TableCell className='flex justify-end'>
                {order?.totalInCents
                  ? formatCurrency(order.totalInCents)
                  : <Skeleton className='h-4 w-20' />
                }
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </DialogContent>
  )
}
