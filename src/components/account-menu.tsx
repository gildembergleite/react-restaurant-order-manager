import { DropdownMenuItem, DropdownMenuLabel } from '@radix-ui/react-dropdown-menu'
import { BuildingIcon, ChevronDownIcon } from 'lucide-react'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu'

export function AccountMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={'outline'}
          className='flex items-center gap-2 select-none'
        >
          Pizza Shop
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className=' p-4 w-56'>
        <DropdownMenuLabel className='flex flex-col'>
          <span>Gildemberg Leite</span>
          <span className='text-xs font-normal text-muted-foreground'>
            gildembergleite@gmail.com
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className='pt-4 space-y-4'>
          <DropdownMenuItem className='flex items-center gap-2 cursor-pointer'>
            <BuildingIcon size={16} />
            <span>Perfil da loja</span>
          </DropdownMenuItem>
          <DropdownMenuItem className='flex items-center gap-2 cursor-pointer'>
            <BuildingIcon size={16} />
            <span>Perfil da loja</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
