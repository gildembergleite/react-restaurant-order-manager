import { PizzaIcon } from 'lucide-react'
import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <main className='min-h-screen grid grid-cols-2'>
      <div className='h-full border-r border-foreground/5 bg-muted p-10 text-muted-foreground flex flex-col justify-between'>
        <div className='flex items-center gap-3 text-lg font-medium text-foreground'>
          <PizzaIcon size={20} />
          <span className='font-semibold'>pizza.shop</span>
        </div>
        <footer>
          Painel do parceiro &copy; pizza.shop - {new Date().getFullYear()}
        </footer>
      </div>
      <div className='flex justify-center items-center'>
        <Outlet />
      </div>
    </main>
  )
}