import { render } from '../../utils/tests/wrapper'

import Header from '.'

import { mockCartData } from './mock'

jest.mock('../../hooks/useCart', () => {
  return {
    useCart: () => ({
      cart: mockCartData
    })
  }
})

describe('<Header />', () => {
  it('should be able to render the amount of products added to cart', () => {
    const { getByTestId } = render(<Header />)

    const cartSizeCounter = getByTestId('cart-size')
    expect(cartSizeCounter).toHaveTextContent('2 itens')
  })
})
