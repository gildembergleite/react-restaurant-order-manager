import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { NavLink } from './nav-link'

describe('NavLink', () => {
  it('should highlight the nav link when is the current page', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/about']}>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </MemoryRouter>
    )

    expect(getByText('Home').dataset.current).toEqual('false')
    expect(getByText('About').dataset.current).toEqual('true')
  })
})
