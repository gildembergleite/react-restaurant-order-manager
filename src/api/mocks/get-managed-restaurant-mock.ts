import { HttpResponse, http } from 'msw'
import { GetManagedRestaurantResponse } from '../get-managed-restaurant'

export const getManagedRestaurantMock = http
  .get<never, never, GetManagedRestaurantResponse>(
    '/managed-restaurant',
    () => {
      return HttpResponse.json({
        id: 'a-09s8hd-78wdu9as-d',
        managerId: '9q87ch-a9unc98h',
        name: 'Pizza Shop',
        description: null,
        createdAt: new Date(),
        updatedAt: null,
      })
    }
  )
