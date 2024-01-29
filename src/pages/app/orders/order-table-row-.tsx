import { ArrowRightIcon, SearchIcon, XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetails } from './order-details'

interface OrderTableRow {
  id: string
  date: string
  status: string
  client: string
  total: string
}

export function OrderTableRow(props: OrderTableRow) {
  const { id, date, status, client, total } = props

  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button size={'sm'}>
              <SearchIcon size={12} />
              <span className='sr-only'>Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetails />
        </Dialog>
      </TableCell>
      <TableCell>
        <div className='w-full max-w-40 font-mone text-xs font-medium truncate pr-4'>
          {id}
        </div>
      </TableCell>
      <TableCell className='text-muted-foreground whitespace-nowrap pr-4'>
        {date}
      </TableCell>
      <TableCell>
        <div className='flex items-center gap-2 pr-4'>
          <span className='h-2 w-2 rounded-full bg-slate-400' />
          <span className='font-medium text-muted-foreground'>
            {status}
          </span>
        </div>
      </TableCell>
      <TableCell className='font-medium whitespace-nowrap pr-4'>
        {client}
      </TableCell>
      <TableCell className='font-medium whitespace-nowrap pr-4'>
        {total}
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
