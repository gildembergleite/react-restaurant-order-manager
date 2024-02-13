import { render } from '@testing-library/react'
import { OrderStatus, orderStatusMap } from './order-status'

describe('Order Status', () => {
  it.each(Object.entries(orderStatusMap)
    .map(([orderKey, orderInfo]) => [
      orderKey, orderInfo.value, orderInfo.color
    ]))(
    'should display the right text "%s" and have class "%s" based on order status',
    (orderKey, expectedText, expectedClass) => {
      const { getByText, getByTestId } = render(
        <OrderStatus status={orderKey as OrderStatus} />
      )

      const statusText = getByText(expectedText)
      const badgeElement = getByTestId(`badge-${orderKey}`)

      expect(statusText).toBeInTheDocument()
      expect(badgeElement).toHaveClass(expectedClass)
    }
  )
})
