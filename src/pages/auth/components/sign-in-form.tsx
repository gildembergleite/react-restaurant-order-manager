import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const formSchema = z.object({
  email: z.string({
    required_error: 'Você precisa preencher esse campo.',
  }).email({
    message: 'Por favor insira um endereço de email válido.'
  }),
})

type FormValues = z.infer<typeof formSchema>

export function SignInForm() {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema)
  })

  async function handleSignIn(data: FormValues) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast.success('Bem vindo', {
      description: 'Enviamos um link de autenticação para o seu email!',
      action: {
        label: 'Reenviar',
        onClick: () => handleSignIn(data)
      },
      actionButtonStyle: {
        backgroundColor: 'green',
        marginTop: 10,
      },
      className: 'flex flex-wrap'
    })
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(handleSignIn)}>
      <Label>Seu email</Label>
      <Input
        id="email"
        type="email"
        autoCapitalize="none"
        autoCorrect="off"
        placeholder="name@example.com"
        {...register('email')}
        className='w-full text-zinc-700 my-2'
      />
      {errors.email &&
          <span className='text-sm text-destructive ml-2'>
            {errors.email.message}
          </span>
      }

      <Button disabled={isSubmitting} className='w-full mt-6'>
        {isSubmitting
          ? (<div className='h-5 w-5 rounded-full border-2 border-r-primary animate-spin'/>)
          : 'Sign In'}
      </Button>
    </form>

  )
}
