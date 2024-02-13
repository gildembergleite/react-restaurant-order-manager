import { api } from '@/lib/axios'

export interface UpdateProfileBody {
  name: string
  description: string
}

export async function updateProfile({ name, description }: UpdateProfileBody) {
  api.put('/profile', { name, description })
}
