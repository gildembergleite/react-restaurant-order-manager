import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react'

import { Button } from './ui/button'

interface PaginationProps {
  pageIndex: number
  totalCount: number
  perPage: number
}
export default function Pagination(props: PaginationProps) {
  const { pageIndex, totalCount, perPage } = props
  const pages = Math.ceil(totalCount / perPage) || 1

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total de {totalCount} de item(s)
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Página {pageIndex + 1} de {pages}
        </div>

        <div className="flex items-center gap-2">
          <Button variant={'outline'} className="w-8 h-8 p-0">
            <ChevronsLeftIcon size={16} />
            <span className="sr-only">Primeira página</span>
          </Button>

          <Button variant={'outline'} className="w-8 h-8 p-0">
            <ChevronLeftIcon size={16} />
            <span className="sr-only">Próxima página</span>
          </Button>

          <Button variant={'outline'} className="w-8 h-8 p-0">
            <ChevronRightIcon size={16} />
            <span className="sr-only">Página anterior</span>
          </Button>

          <Button variant={'outline'} className="w-8 h-8 p-0">
            <ChevronsRightIcon size={16} />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
