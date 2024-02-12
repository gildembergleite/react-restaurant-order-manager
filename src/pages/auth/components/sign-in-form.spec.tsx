import { queryClient } from '@/lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import { SignInForm } from './sign-in-form'

describe('SignIn', () => {
  it('should set default input value if email is present on search params', () => {
    const { getByPlaceholderText } = render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/sign-in?email=name@example.com']}>
          <QueryClientProvider client={queryClient}>
            <SignInForm />
          </QueryClientProvider>
        </MemoryRouter>
      </HelmetProvider>
    )

    const emailInput = getByPlaceholderText('name@example.com') as HTMLInputElement
    expect(emailInput.value).toEqual('name@example.com')
  })
})
