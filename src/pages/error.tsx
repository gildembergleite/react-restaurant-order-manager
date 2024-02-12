import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export function Error() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">
        Houve um erro ao carregar os dados da aplicação
      </h1>
      <p className="text-accent-foreground">
        Tente{' '}
        <Button
          className='p-0 text-base text-sky-600 dark:text-sky-400'
          onClick={() => location.reload()}
          variant={'link'}
        >
          recarregar a página
        </Button>
        .
      </p>

      <p className="text-accent-foreground">
        Ou{' '}
        <Link to={'/'} className="text-sky-600 dark:text-sky-400">
          entre em contato
        </Link>
        .
      </p>
    </div>
  )
}
