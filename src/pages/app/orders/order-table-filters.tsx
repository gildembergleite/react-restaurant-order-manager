import { SearchIcon, XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

const orderFiltersSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional()
})

type OrderTableFilter = z.infer<typeof orderFiltersSchema>

export function OrderTableFilter() {
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get('orderId') ?? ''
  const customerName = searchParams.get('customerName') ?? ''
  const status = searchParams.get('status') ?? ''

  const { register, handleSubmit, control } = useForm<OrderTableFilter>({
    resolver: zodResolver(orderFiltersSchema),
    defaultValues: {
      orderId,
      customerName ,
      status
    }
  })

  function handleFilter({ orderId, status, customerName }: OrderTableFilter) {
    setSearchParams((state) => {
      if (orderId) {
        state.set('orderId', orderId)
      } else {
        state.delete('orderId')
      }

      if (status) {
        state.set('status', status)
      } else {
        state.delete('status')
      }

      if (customerName) {
        state.set('customerName', customerName)
      } else {
        state.delete('customerName')
      }

      state.set('page', '1')

      return state
    })
  }

  return (
    <form onSubmit={handleSubmit(handleFilter)} className='flex items-center gap-2'>
      <span className='text-sm font-semibold'>
        Filtros:
      </span>

      <Input
        placeholder='ID do pedido'
        className='h-8 w-52'
        {...register('orderId')}
      />

      <Input
        placeholder='Nome do cliente'
        className='h-8 w-96'
        {...register('customerName')}
      />

      <Controller
        name='status'
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => (
          <Select
            defaultValue={'all'}
            name={name}
            onValueChange={onChange}
            value={value}
            disabled={disabled}
          >
            <SelectTrigger className='h-8 w-44'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Todos os status</SelectItem>
              <SelectItem value='pending'>Pendente</SelectItem>
              <SelectItem value='canceled'>Cancelado</SelectItem>
              <SelectItem value='processing'>Em preparo</SelectItem>
              <SelectItem value='delivering'>Entregue</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      <Button type='submit' className='gap-1'>
        <SearchIcon size={16} />
        Filtrar resultados
      </Button>

      <Button type='submit' variant={'outline'} className='gap-1'>
        <XIcon size={16} />
        Remover filtros
      </Button>
    </form>
  )
}
