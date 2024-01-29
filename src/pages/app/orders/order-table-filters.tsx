import { SearchIcon, XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function OrderTableFilter() {
  return (
    <form action="" className='flex items-center gap-2'>
      <span className='text-sm font-semibold'>
        Filtros:
      </span>
      <Input
        placeholder='ID do pedido'
        className='h-8 w-52'
      />
      <Input
        placeholder='Nome do cliente'
        className='h-8 w-96'
      />
      <Select defaultValue={'all'}>
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
