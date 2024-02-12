import Pagination from './pagination'

import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const onPageChangeCallback = vi.fn()

describe('Pagination', () => {
  beforeEach(() => {
    onPageChangeCallback.mockClear()
  })
  it('should display the right amount of pages and results', () => {
    const { getByText } = render(
      <Pagination
        pageIndex={0}
        totalCount={100}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />
    )

    expect(getByText('Página 1 de 10')).toBeInTheDocument()
    expect(getByText('Total de 100 item(s)')).toBeInTheDocument()
  })
  it('should be able to navigate to the next page', async () => {
    const { getByRole } = render(
      <Pagination
        pageIndex={1}
        totalCount={100}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />
    )

    const nextPageButton = getByRole('button', { name: 'Próxima página' })

    await userEvent.click(nextPageButton)
    expect(onPageChangeCallback).toHaveBeenCalledWith(2)
  })
  it('should be able to navigate to the previous page', async () => {
    const { getByRole } = render(
      <Pagination
        pageIndex={5}
        totalCount={100}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />
    )

    const nextPageButton = getByRole('button', { name: 'Página anterior' })

    await userEvent.click(nextPageButton)
    expect(onPageChangeCallback).toHaveBeenCalledWith(4)
  })
  it('should be able to navigate to the first page', async () => {
    const { getByRole } = render(
      <Pagination
        pageIndex={5}
        totalCount={100}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />
    )

    const nextPageButton = getByRole('button', { name: 'Primeira página' })

    await userEvent.click(nextPageButton)
    expect(onPageChangeCallback).toHaveBeenCalledWith(0)
  })
  it('should be able to navigate to the last page', async () => {
    const { getByRole } = render(
      <Pagination
        pageIndex={5}
        totalCount={100}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />
    )

    const nextPageButton = getByRole('button', { name: 'Última página' })

    await userEvent.click(nextPageButton)
    expect(onPageChangeCallback).toHaveBeenCalledWith(9)
  })
})
