import { Helmet } from 'react-helmet-async'

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { OrderTableFilter } from './order-table-filters'
import { OrderTableRow } from './order-table-row-'

export function Orders() {
  return (
    <>
      <Helmet title="Pedidos" />
      <div className="flex flex-col gap-4">
        <h1 className='text-3xl font-bold tracking-tight'>
          Pedidos
        </h1>
      </div>
      <div className='space-y-2.5'>
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
              {Array.from({ length: 10 }).map((_, index) => (
                <OrderTableRow
                  key={index}
                  id={'as08d9-q9a8w7dh-9as8hd'}
                  client={'João da Silva'}
                  date={'há 25 minutos'}
                  status={'Pendente'}
                  total={'R$ 129,37'}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
