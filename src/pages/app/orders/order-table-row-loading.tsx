
import { TableCell, TableRow } from '@/components/ui/table'


import { Skeleton } from '@/components/ui/skeleton'

export function OrderTableRowLoading() {
  return (
    <TableRow>
      {/* DETAILS BUTTON */}
      <TableCell>
        <Skeleton className='w-10 h-8' />
      </TableCell>

      {/* ID */}
      <TableCell>
        <Skeleton className='w-48 h-5' />
      </TableCell>

      {/* DATE-TIME */}
      <TableCell className='pr-4'>
        <Skeleton className='w-24 h-5' />
      </TableCell>

      {/* STATUS */}
      <TableCell className='pr-12'>
        <Skeleton className='h-5 w-24' />
      </TableCell>

      {/* CUSTOMER */}
      <TableCell className='w-full font-medium whitespace-nowrap'>
        <Skeleton className='h-5 w-80' />
      </TableCell>

      {/* TOTAL */}
      <TableCell className='font-medium whitespace-nowrap pr-20'>
        <Skeleton className='h-5 w-20' />
      </TableCell>

      {/* ACTIONS */}
      <TableCell>
        <Skeleton className='h-8 w-20' />
      </TableCell>
      <TableCell>
        <Skeleton className='h-8 w-20' />
      </TableCell>
    </TableRow>
  )
}
