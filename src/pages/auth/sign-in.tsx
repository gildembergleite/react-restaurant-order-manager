import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'

import { SignInForm } from './components/sign-in-form'

export function SignIn() {
  return (
    <>
      <Helmet title='Login' />
      <div className='p-8'>
        <div className='absolute flex gap-6 right-8 top-8'>
          <Link to={'/sign-up'}>
            <Button variant={'outline'}>
              Novo estabelecimento
            </Button>
          </Link>
          <ModeToggle />
        </div>
        <div className='w-[350px] flex flex-col justify-center gap-6'>
          <div className='space-y-2 text-center'>
            <h1 className='text-2xl font-bold'>
              Acessar painel
            </h1>
            <p className='text-sm text-muted-foreground'>
              Acompanhe suas vendas pelo painel do parceiro.
            </p>
          </div>
          <SignInForm />
        </div>
      </div>
    </>
  )
}
