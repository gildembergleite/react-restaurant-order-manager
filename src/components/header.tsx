import { HomeIcon, PizzaIcon, UtensilsCrossedIcon } from 'lucide-react'

import { AccountMenu } from './account-menu'
import { ModeToggle } from './mode-toggle'
import { NavLink } from './nav-link'
import { Separator } from './ui/separator'

export function Header() {
  return (
    <header className="flex justify-between items-center border-b px-6">
      <div className="flex h-16 items-center gap-6">
        <PizzaIcon size={24} />
        <Separator orientation='vertical' className='h-6' />
        <nav className='flex items-center gap-4 lg:gap-6'>
          <NavLink to={'/'}>
            <HomeIcon size={20} />
            Início
          </NavLink>
          <NavLink to={'/orders'}>
            <UtensilsCrossedIcon size={20} />
            Pedidos
          </NavLink>
        </nav>
      </div>
      <div className='flex items-center gap-6'>
        <ModeToggle />
        <AccountMenu />
      </div>
    </header>
  )
}
