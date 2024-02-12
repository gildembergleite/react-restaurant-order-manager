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
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { OrderTableFilter } from './order-table-filters'
import { OrderTableRow } from './order-table-row-'
import { OrderTableRowLoading } from './order-table-row-loading'

export function Orders() {
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const pageIndex = z.coerce.number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data: result } = useQuery({
    queryKey: ['orders', pageIndex, orderId, customerName, status],
    queryFn: () => getOrders({ pageIndex, orderId, customerName, status })
  })

  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set('page', String(pageIndex + 1))

      return state
    })
  }

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
                {result
                  ? result.orders.map((order) => (
                    <OrderTableRow
                      key={order.orderId}
                      order={order}
                    />
                  ))
                  : Array.from(({ length: 10 })).map((_, index) => (
                    <OrderTableRowLoading key={index} />
                  ))
                }
              </TableBody>
            </Table>
          </div>
        </div>
        {result && (
          <Pagination
            pageIndex={result.meta.pageIndex}
            perPage={result.meta.perPage}
            totalCount={result.meta.totalCount}
            onPageChange={handlePaginate}
          />
        )}
      </div>
    </>
  )
}
