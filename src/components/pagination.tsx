import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react'

import { Button } from './ui/button'

interface PaginationProps {
  pageIndex: number
  totalCount: number
  perPage: number
  onPageChange: (pageIndex: number) => Promise<void> | void
}

export default function Pagination(props: PaginationProps) {
  const { pageIndex, totalCount, perPage, onPageChange } = props
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
          <Button onClick={() => onPageChange(0)} variant={'outline'} className="w-8 h-8 p-0">
            <ChevronsLeftIcon size={16} />
            <span className="sr-only">Primeira página</span>
          </Button>

          <Button onClick={() => onPageChange(pageIndex - 1)} variant={'outline'} className="w-8 h-8 p-0">
            <ChevronLeftIcon size={16} />
            <span className="sr-only">Próxima página</span>
          </Button>

          <Button onClick={() => onPageChange(pageIndex + 1)} variant={'outline'} className="w-8 h-8 p-0">
            <ChevronRightIcon size={16} />
            <span className="sr-only">Página anterior</span>
          </Button>

          <Button onClick={() => onPageChange(pages - 1)} variant={'outline'} className="w-8 h-8 p-0">
            <ChevronsRightIcon size={16} />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
