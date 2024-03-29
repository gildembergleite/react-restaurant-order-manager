import { GetManagedRestaurantResponse, getManagedRestaurant } from '@/api/get-managed-restaurant'
import { updateProfile } from '@/api/update-profile'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from './ui/button'
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

const storeProfileSchema = z.object({
  name: z.string(),
  description: z.string(),
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog() {
  const queryClient = useQueryClient()

  const { data: managedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity
  })

  const form = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? '',
    }
  })

  async function handleUpdateProfile(formData: StoreProfileSchema) {
    try {
      await updateProfileFn({
        name: formData.name,
        description: formData.description,
      })

      toast.success('Perfil atualizado com sucesso!')
    } catch {
      toast.error('Não foi possível atualizar o perfil')
    }
  }

  function updateManagedRestaurantCache({ name, description }: StoreProfileSchema) {
    const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
      'managed-restaurant'
    ])

    if (cached) {
      queryClient.setQueryData(['managed-restaurant'], {
        ...cached,
        name,
        description,
      })
    }

    return { cached }
  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate({ name, description }) {
      const { cached } = updateManagedRestaurantCache({ name, description })

      return { previousProfile: cached }
    },
    onError(_, __, context) {
      if (context?.previousProfile) {
        updateManagedRestaurantCache({
          name: context.previousProfile.name,
          description: context.previousProfile.description ?? '',
        })
      }
    },
  })

  const { formState: { isSubmitting } } = form

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription className='text-sm pt-2'>
          Atualize as informações do seu estabelecimento visíveis aos seus clientes.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleUpdateProfile)} className='space-y-6 py-2'>
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
            <Button type='submit' variant={'sucess'} disabled={isSubmitting}>
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}
