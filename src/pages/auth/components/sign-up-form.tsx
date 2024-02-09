import { zodResolver } from '@hookform/resolvers/zod'
import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerRestaurant } from '@/api/register-restaurant'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMutation } from '@tanstack/react-query'
import console from 'console'

const signUpSchema = z.object({
  restaurantName: z.string()
    .min(6, {
      message: 'O nome deve conter no mínimo 6 caracteres.'
    })
    .max(36, {
      message: 'O nome deve conter no máximo 36 caracteres.'
    }),
  managerName: z.string()
    .min(6, {
      message: 'O nome deve conter no mínimo 6 caracteres.'
    })
    .max(36, {
      message: 'O nome deve conter no máximo 36 caracteres.'
    }),
  phone: z.string().
    refine(phone => {
      const rawPhone = phone.replace(/\D/g, '')
      return rawPhone.length === 10 || rawPhone.length === 11
    }, {
      message: 'Número de telefone inválido.'
    }),
  email: z.string({
    required_error: 'Você precisa preencher esse campo.',
  }).email({
    message: 'Por favor insira um endereço de email válido.'
  }),
})

type FormValues = z.infer<typeof signUpSchema>

export function SignUpForm() {
  const [phone, setPhone] = useState<string>('')

  const { setValue, register, handleSubmit, formState: { isSubmitting, errors } } = useForm<FormValues>({
    resolver: zodResolver(signUpSchema)
  })

  const navigate = useNavigate()

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  })

  async function handleSignUp(formData: FormValues) {
    try {
      await registerRestaurantFn({
        restaurantName: formData.restaurantName,
        managerName: formData.managerName,
        phone: formData.phone,
        email: formData.email
      })
      toast.success('Sucesso!', {
        description: 'Seu estabelecimento foi cadastrado, clique em login para acessar sua conta.',
        action: {
          label: 'Login',
          onClick: () => navigate(`/sign-in?email=${formData.email}`)
        },
        actionButtonStyle: {
          backgroundColor: 'green',
          marginTop: 10,
        },
        className: 'flex flex-wrap',
        duration: 8000,
      })
    } catch (err) {
      const error = err as Error
      console.log(error)
      toast.error(error.message)
    }
  }

  function formatPhone(phone: string) {
    if (phone.length <= 6) {
      return phone.replace(/\D/g, '')
    } else if (phone.length <= 10) {
      return phone.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
    } else {
      return phone.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
    }
  }

  function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.target.value.replace(/\D/g, '')

    if (input.length <= 11) {
      const formatted = formatPhone(event.target.value.replace(/\D/g, ''))
      setPhone((state) => state !== formatted ? formatted : state)
      setValue('phone', formatted.replace(/[()\s-]/g, ''))
    }
  }


  return (
    <form onSubmit={handleSubmit(handleSignUp)} className='space-y-4'>
      <div>
        <Label htmlFor='restaurantName'>Nome do estabelecimento</Label>
        <Input
          id="restaurantName"
          type="text"
          autoCapitalize="none"
          autoCorrect="off"
          placeholder="Insira o nome do estabelecimento"
          {...register('restaurantName')}
          className='w-full text-zinc-700 my-2'
        />
        {errors.restaurantName &&
          <span className='flex flex-wrap text-sm text-destructive ml-2'>
            {errors.restaurantName.message}
          </span>
        }
      </div>

      <div>
        <Label htmlFor='managerName'>Seu nome</Label>
        <Input
          id="managerName"
          type="text"
          autoCapitalize="none"
          autoCorrect="off"
          placeholder="Nome do responsável pelo estabelecimento"
          {...register('managerName')}
          className='w-full text-zinc-700 my-2'
        />
        {errors.managerName &&
          <span className='text-sm text-destructive ml-2'>
            {errors.managerName.message}
          </span>
        }
      </div>

      <div>
        <Label htmlFor='phone'>Telefone</Label>
        <Input
          id="phone"
          type="tel"
          max={15}
          autoCapitalize="none"
          autoCorrect="off"
          placeholder="99 99999-9999"
          value={phone}
          onChange={handlePhoneChange}
          className='w-full text-zinc-700 my-2'
        />
        {errors.phone &&
          <span className='text-sm text-destructive ml-2'>
            {errors.phone.message}
          </span>
        }
      </div>

      <div>
        <Label htmlFor='email'>Seu email</Label>
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
      </div>

      <Button disabled={isSubmitting} className='w-full mt-6'>
        {isSubmitting
          ? (<div className='h-5 w-5 rounded-full border-2 border-r-primary animate-spin'/>)
          : 'Finalizar cadastro'}
      </Button>
    </form>

  )
}
