import { DropdownMenuItem, DropdownMenuLabel } from '@radix-ui/react-dropdown-menu'
import { BuildingIcon, ChevronDownIcon, LogOutIcon } from 'lucide-react'

import { getManagedRestaurant } from '@/api/get-managed-restaurant'
import { getProfile } from '@/api/get-profile'
import { signOut } from '@/api/sign-out'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { StoreProfileDialog } from './store-profile-dialog'
import { Button } from './ui/button'
import { Dialog, DialogTrigger } from './ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'

export function AccountMenu() {
  const navigate = useNavigate()

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity
  })

  const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity
  })

  const { mutateAsync: signOutFn, isPending: isSigninOut } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      navigate('/sign-in', { replace: true })
    }
  })

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={'outline'}
            className='flex items-center gap-2 select-none'
          >
            {isLoadingManagedRestaurant
              ? <Skeleton className='w-32 h-3 rounded-none' />
              : managedRestaurant?.name
            }
            <ChevronDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className=' p-4 w-56'>
          <DropdownMenuLabel className='flex flex-col'>
            {isLoadingProfile
              ? (
                <div className='space-y-2 mb-3'>
                  <Skeleton className='w-44 h-5 rounded-none' />
                  <Skeleton className='w-20 h-2 rounded-none' />
                  <Skeleton className='w-44 h-2 rounded-none' />
                </div>
              )
              : (
                <div className='flex flex-col gap-1.5 mb-2'>
                  <span>{profile?.name}</span>
                  <span className='text-muted-foreground capitalize text-sm'>
                    {profile?.role}
                  </span>
                  <span className='text-muted-foreground text-sm'>
                    {profile?.email}
                  </span>
                </div>
              )
            }
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className='pt-4 space-y-4'>
            <DialogTrigger asChild>
              <DropdownMenuItem className='flex items-center gap-2 cursor-pointer'>
                <BuildingIcon size={16} />
                <span>Perfil da loja</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem
              className='flex items-center gap-2 cursor-pointer'
              onClick={() => signOutFn()}
              disabled={isSigninOut}
            >
              <LogOutIcon size={16} className='text-rose-600 dark:text-rose-500' />
              <span>Sair</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <StoreProfileDialog />
    </Dialog>
  )
}
