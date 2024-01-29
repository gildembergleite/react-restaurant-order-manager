import { DialogDescription } from '@radix-ui/react-dialog'

import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export function OrderDetails() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Pedido: as9das9iudh9sudgas7
        </DialogTitle>
        <DialogDescription>
          Descrição do pedido
        </DialogDescription>
      </DialogHeader>
      <div className='space-y-6'>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className='text-muted-foreground'>Status</TableCell>
              <TableCell className='flex justify-end'>
                <div className='flex items-center gap-2'>
                  <span className='h-2 w-2 rounded-full bg-slate-400' />
                  <span className='font-medium text-muted-foreground'>
                    Pendente
                  </span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className='text-muted-foreground'>Cliente</TableCell>
              <TableCell className='flex justify-end'>
                João da Silva
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className='text-muted-foreground'>Telefone</TableCell>
              <TableCell className='flex justify-end'>
                (00) 00000-0000
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className='text-muted-foreground'>Realizado</TableCell>
              <TableCell className='flex justify-end'>
                há 1 hora
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produtos</TableHead>
              <TableHead className='text-right'>Qtd.</TableHead>
              <TableHead className='text-right'>Preço</TableHead>
              <TableHead className='text-right'>Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Pizza de Pepperoni Família</TableCell>
              <TableCell className='text-right'>2</TableCell>
              <TableCell className='text-right'>R$ 69,90</TableCell>
              <TableCell className='text-right'>R$ 139,80</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Pizza de Muzarela Família</TableCell>
              <TableCell className='text-right'>2</TableCell>
              <TableCell className='text-right'>R$ 49,90</TableCell>
              <TableCell className='text-right'>R$ 99,80</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total do pedido</TableCell>
              <TableCell className='text-right'>R$ 238,60</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </DialogContent>
  )
}
