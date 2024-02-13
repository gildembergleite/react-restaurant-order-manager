import { HttpResponse, http } from 'msw'
import { GetProfileResponse } from '../get-profile'

export const getProfileMock = http
  .get<never, never, GetProfileResponse>( '/me', () => {
    return HttpResponse.json({
      id: '9q87ch-a9unc98h',
      name: 'Gildemberg Leite',
      email: 'gildembergle@gmail.com',
      createdAt: new Date(),
      phone: '123456789',
      role: 'manager',
      updatedAt: null
    })
  }
  )
