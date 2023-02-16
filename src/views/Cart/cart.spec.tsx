import { render, fireEvent } from '@testing-library/react'

import { useCart } from '../../hooks/useCart'
import Cart from '.'

const mockedRemoveProduct = jest.fn()
const mockedUpdateProductAmount = jest.fn()
const mockedUseCartHook = useCart as jest.Mock

jest.mock('../../hooks/useCart')

describe('<Cart />', () => {
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
      removeProduct: mockedRemoveProduct,
      updateProductAmount: mockedUpdateProductAmount
    })
  })

  it('should be able to increase/decrease a product amount', () => {
    const { getAllByTestId, rerender } = render(<Cart />)

    const [incrementFirstProduct] = getAllByTestId('increment-product')
    const [, decrementSecondProduct] = getAllByTestId('decrement-product')
    const [firstProductAmount, secondProductAmount] =
      getAllByTestId('product-amount')

    expect(firstProductAmount).toHaveDisplayValue('1')
    expect(secondProductAmount).toHaveDisplayValue('2')

    fireEvent.click(incrementFirstProduct)
    fireEvent.click(decrementSecondProduct)

    expect(mockedUpdateProductAmount).toHaveBeenCalledWith({
      amount: 2,
      productId: 1
    })
    expect(mockedUpdateProductAmount).toHaveBeenCalledWith({
      amount: 1,
      productId: 2
    })

    mockedUseCartHook.mockReturnValueOnce({
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
      ]
    })

    rerender(<Cart />)

    expect(firstProductAmount).toHaveDisplayValue('2')
    expect(secondProductAmount).toHaveDisplayValue('1')
  })

  it('should not be able to decrease a product amount when value is 1', () => {
    const { getAllByTestId } = render(<Cart />)

    const [decrementFirstProduct] = getAllByTestId('decrement-product')
    const [firstProductAmount] = getAllByTestId('product-amount')

    expect(firstProductAmount).toHaveDisplayValue('1')

    fireEvent.click(decrementFirstProduct)

    expect(decrementFirstProduct).toHaveProperty('disabled')
    expect(mockedUpdateProductAmount).not.toHaveBeenCalled()
  })

  it('should be able to remove a product', () => {
    const { getAllByTestId, rerender } = render(<Cart />)

    const [removeFirstProduct] = getAllByTestId('remove-product')
    const [firstProduct, secondProduct] = getAllByTestId('product')

    expect(firstProduct).toBeInTheDocument()
    expect(secondProduct).toBeInTheDocument()

    fireEvent.click(removeFirstProduct)

    expect(mockedRemoveProduct).toHaveBeenCalledWith(1)

    mockedUseCartHook.mockReturnValueOnce({
      cart: [
        {
          amount: 1,
          id: 2,
          image:
            'https://images-americanas.b2w.io/produtos/97006103/imagens/tenis-de-caminhada-confortavel-detalhes-em-couro-legitimo-vr-preto/97006106_3_large.jpg',
          price: 139.9,
          title: 'Tênis VR Caminhada Confortável Detalhes Couro Masculino'
        }
      ]
    })

    rerender(<Cart />)

    expect(firstProduct).not.toBeInTheDocument()
    expect(secondProduct).toBeInTheDocument()
  })
})
