import { Helmet } from 'react-helmet-async'

import Pagination from '@/components/pagination'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { getOrders } from '@/api/get-orders'
import { useQuery } from '@tanstack/react-query'
import { OrderTableFilter } from './order-table-filters'
import { OrderTableRow } from './order-table-row-'

export function Orders() {
  const { data: result } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders
  })

  return (
    <>
      <Helmet title="Pedidos" />
      <div className="flex flex-col gap-4">
        <h1 className='text-3xl font-bold tracking-tight'>
          Pedidos
        </h1>

        <div className='space-y-4'>
          <OrderTableFilter />

          <div className='border rounded-md'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-16'></TableHead>
                  <TableHead className='w-40 whitespace-nowrap'>Identificador</TableHead>
                  <TableHead className='w-40 whitespace-nowrap'>Realizado há</TableHead>
                  <TableHead className='w-40'>Status</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className='w-60 whitespace-nowrap'>Total do pedido</TableHead>
                  <TableHead className='w-32'></TableHead>
                  <TableHead className='w-32'></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result && result.orders.map((order) => (
                  <OrderTableRow
                    key={order.orderId}
                    order={order}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <Pagination pageIndex={0} perPage={10} totalCount={35} />
      </div>
    </>
  )
}
