import AxiosMock from 'axios-mock-adapter'
import { waitFor, render, fireEvent } from '../../utils/tests/wrapper'

import Home from '.'

import { api } from '../../services/api'
import { useCart } from '../../hooks/useCart'
import { mockCartData } from './mock'

const apiMock = new AxiosMock(api)
const mockedAddProduct = jest.fn()
const mockedUseCartHook = useCart as jest.Mock

jest.mock('../../hooks/useCart')

describe('<Home />', () => {
  beforeAll(() => {
    apiMock.onGet('products').reply(200, mockCartData)
  })

  beforeEach(() => {
    mockedUseCartHook.mockReturnValue({
      cart: [
        {
          amount: 2,
          id: 1,
          image:
            'https://ae01.alicdn.com/kf/Hdaeb0bc30511453fbed0fb314bbc177cL/T-nis-de-malha-masculina-leve-sapatos-tenis-masculino-sapatos-de-caminhada-respir-vel-deslizamento-em.jpg_Q90.jpg_.webp',
          price: 179.9,
          title: 'Tênis de Caminhada Leve Confortável'
        },
        {
          amount: 1,
          id: 2,
          image:
            'https://images-americanas.b2w.io/produtos/97006103/imagens/tenis-de-caminhada-confortavel-detalhes-em-couro-legitimo-vr-preto/97006106_3_large.jpg',
          price: 139.9,
          title: 'Tênis VR Caminhada Confortável Detalhes Couro Masculino'
        }
      ],
      addProduct: mockedAddProduct
    })
  })

  it('should be able to render each product quantity added to cart', async () => {
    const { getAllByTestId } = render(<Home />)

    await waitFor(() => getAllByTestId('cart-product-quantity'), {
      timeout: 200
    })

    const [
      firstProductCartQuantity,
      secondProductCartQuantity,
      thirdProductCartQuantity
    ] = getAllByTestId('cart-product-quantity')

    expect(firstProductCartQuantity).toHaveTextContent('2')
    expect(secondProductCartQuantity).toHaveTextContent('1')
    expect(thirdProductCartQuantity).toHaveTextContent('0')
  })

  it('should be able to add a product to cart', async () => {
    const { getAllByTestId, rerender } = render(<Home />)

    await waitFor(() => getAllByTestId('add-product-button'), {
      timeout: 200
    })

    const [addFirstProduct] = getAllByTestId('add-product-button')

    fireEvent.click(addFirstProduct)

    expect(mockedAddProduct).toHaveBeenCalledWith(1)

    mockedUseCartHook.mockReturnValueOnce({
      cart: [
        {
          amount: 3,
          id: 1,
          image:
            'https://ae01.alicdn.com/kf/Hdaeb0bc30511453fbed0fb314bbc177cL/T-nis-de-malha-masculina-leve-sapatos-tenis-masculino-sapatos-de-caminhada-respir-vel-deslizamento-em.jpg_Q90.jpg_.webp',
          price: 179.9,
          title: 'Tênis de Caminhada Leve Confortável'
        }
      ]
    })

    rerender(<Home />)

    const [firstProductCartQuantity] = getAllByTestId('cart-product-quantity')

    expect(firstProductCartQuantity).toHaveTextContent('3')
  })
})
