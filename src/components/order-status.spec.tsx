import { render } from '@testing-library/react'
import { OrderStatus, orderStatusMap } from './order-status'

describe('Order Status', () => {
  it('should display the right text based on order status', () => {
    Object.entries(orderStatusMap).map(([orderKey, orderInfo]) => {
      const { getByText, getByTestId } = render(<OrderStatus status={orderKey as OrderStatus} />)

      const statusText = getByText(orderInfo.value)
      const badgeElement = getByTestId(`badge-${orderKey}`)

      expect(statusText).toBeInTheDocument()
      expect(badgeElement).toHaveClass(orderInfo.color)
    })
  })
})
