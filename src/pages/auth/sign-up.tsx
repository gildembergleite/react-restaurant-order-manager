import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'

import { SignUpForm } from './components/sign-up-form'

export function SignUp() {
  return (
    <>
      <Helmet title='Login' />
      <div className='p-8'>
        <div className='absolute flex gap-6 right-8 top-8'>
          <Link to={'/sign-in'}>
            <Button variant={'outline'}>
              Já é membro? Faça login
            </Button>
          </Link>
          <ModeToggle />
        </div>
        <div className='w-[350px] flex flex-col justify-center gap-6'>
          <div className='space-y-2 text-center'>
            <h1 className='text-2xl font-bold'>
              Crie sua conta gratuitamente
            </h1>
            <p className='text-sm text-muted-foreground'>
              Seja um parceiro e comece suas vendas.
            </p>
          </div>
          <SignUpForm />
        </div>
      </div>
    </>
  )
}
