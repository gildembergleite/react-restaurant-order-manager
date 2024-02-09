import { getManagedRestaurant } from '@/api/get-managed-restaurant'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './ui/button'
import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

const storeProfileSchema = z.object({
  name: z.string(),
  description: z.string(),
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog() {
  const { data: managedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
  })

  const form = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? '',
    }
  })

  async function updateProfile(formData: StoreProfileSchema) {
    console.log(formData)
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription className='text-sm pt-2'>
          Atualize as informações do seu estabelecimento visíveis aos seus clientes.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(updateProfile)} className='space-y-6 py-2'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <div className='grid grid-cols-8 gap-4 items-center'>
                  <FormLabel className='col-span-2 text-left'>
                    Nome:
                  </FormLabel>
                  <FormControl className='col-span-6'>
                    <Input
                      type='text'
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <div className='grid grid-cols-8  gap-4 items-center'>
                  <FormLabel className='col-span-2 text-left'>
                    Descrição:
                  </FormLabel>
                  <FormControl className='col-span-6'>
                    <Textarea
                      rows={6}
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button type='button' variant={'ghost'}>
                Cancelar
              </Button>
            </DialogClose>
            <Button type='submit' variant={'sucess'}>
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}
