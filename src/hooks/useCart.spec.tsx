import { renderHook, act } from '@testing-library/react-hooks'
import AxiosMock from 'axios-mock-adapter'

import { toast } from 'react-toastify'
import { api } from '../services/api'
import { useCart, CartProvider } from '../hooks/useCart'

const apiMock = new AxiosMock(api)

jest.mock('react-toastify')

const mockedToastError = toast.error as jest.Mock
const mockedSetItemLocalStorage = jest.spyOn(Storage.prototype, 'setItem')
const initialStoragedData = [
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

describe.skip('useCart Hook', () => {
  beforeEach(() => {
    apiMock.reset()

    jest
      .spyOn(Storage.prototype, 'getItem')
      .mockReturnValueOnce(JSON.stringify(initialStoragedData))
  })

  it('should be able to initialize cart with localStorage value', () => {
    const { result } = renderHook(useCart, {
      wrapper: CartProvider
    })

    expect(result.current.cart).toEqual(
      expect.arrayContaining([
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
      ])
    )
  })

  it('should be able to add a new product', async () => {
    const productId = 3

    apiMock.onGet(`stock/${productId}`).reply(200, {
      id: 3,
      amount: 2
    })
    apiMock.onGet(`products/${productId}`).reply(200, {
      id: 3,
      title: 'Tênis Adidas Duramo Lite 2.0',
      price: 219.9,
      image:
        'https://d3ugyf2ht6aenh.cloudfront.net/stores/002/212/775/products/c60eb02a99eab0ff4da9fb67bb79c209-a891665f4afb246e0d16626567907223-640-0.jpg'
    })

    const { result, waitForNextUpdate } = renderHook(useCart, {
      wrapper: CartProvider
    })

    act(() => {
      result.current.addProduct(productId)
    })

    await waitForNextUpdate({ timeout: 200 })

    expect(result.current.cart).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          amount: 2,
          image:
            'https://ae01.alicdn.com/kf/Hdaeb0bc30511453fbed0fb314bbc177cL/T-nis-de-malha-masculina-leve-sapatos-tenis-masculino-sapatos-de-caminhada-respir-vel-deslizamento-em.jpg_Q90.jpg_.webp',
          price: 179.9,
          title: 'Tênis de Caminhada Leve Confortável'
        },
        {
          id: 2,
          amount: 1,
          image:
            'https://images-americanas.b2w.io/produtos/97006103/imagens/tenis-de-caminhada-confortavel-detalhes-em-couro-legitimo-vr-preto/97006106_3_large.jpg',
          price: 139.9,
          title: 'Tênis VR Caminhada Confortável Detalhes Couro Masculino'
        },
        {
          id: 3,
          amount: 1,
          title: 'Tênis Adidas Duramo Lite 2.0',
          price: 219.9,
          image:
            'https://d3ugyf2ht6aenh.cloudfront.net/stores/002/212/775/products/c60eb02a99eab0ff4da9fb67bb79c209-a891665f4afb246e0d16626567907223-640-0.jpg'
        }
      ])
    )
    expect(mockedSetItemLocalStorage).toHaveBeenCalledWith(
      '@KuantoKusta:cart',
      JSON.stringify(result.current.cart)
    )
  })

  it('should not be able add a product that does not exist', async () => {
    const productId = 4

    apiMock.onGet(`stock/${productId}`).reply(404)
    apiMock.onGet(`products/${productId}`).reply(404)

    const { result, waitFor } = renderHook(useCart, {
      wrapper: CartProvider
    })

    act(() => {
      result.current.addProduct(productId)
    })

    await waitFor(
      () => {
        expect(mockedToastError).toHaveBeenCalledWith(
          'Erro na adição do produto'
        )
        expect(result.current.cart).toEqual(
          expect.arrayContaining(initialStoragedData)
        )
        expect(mockedSetItemLocalStorage).not.toHaveBeenCalled()
      },
      { timeout: 200 }
    )
  })

  it('should be able to increase a product amount when adding a product that already exists on cart', async () => {
    const productId = 1

    apiMock.onGet(`stock/${productId}`).reply(200, {
      id: 1,
      amount: 3
    })
    apiMock.onGet(`products/${productId}`).reply(200, {
      id: 1,
      amount: 2,
      image:
        'https://ae01.alicdn.com/kf/Hdaeb0bc30511453fbed0fb314bbc177cL/T-nis-de-malha-masculina-leve-sapatos-tenis-masculino-sapatos-de-caminhada-respir-vel-deslizamento-em.jpg_Q90.jpg_.webp',
      price: 179.9,
      title: 'Tênis de Caminhada Leve Confortável'
    })

    const { result, waitForNextUpdate } = renderHook(useCart, {
      wrapper: CartProvider
    })

    act(() => {
      result.current.addProduct(productId)
    })

    await waitForNextUpdate({ timeout: 200 })

    expect(result.current.cart).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          amount: 1,
          image:
            'https://ae01.alicdn.com/kf/Hdaeb0bc30511453fbed0fb314bbc177cL/T-nis-de-malha-masculina-leve-sapatos-tenis-masculino-sapatos-de-caminhada-respir-vel-deslizamento-em.jpg_Q90.jpg_.webp',
          price: 179.9,
          title: 'Tênis de Caminhada Leve Confortável'
        },
        {
          id: 2,
          amount: 1,
          image:
            'https://images-americanas.b2w.io/produtos/97006103/imagens/tenis-de-caminhada-confortavel-detalhes-em-couro-legitimo-vr-preto/97006106_3_large.jpg',
          price: 139.9,
          title: 'Tênis VR Caminhada Confortável Detalhes Couro Masculino'
        }
      ])
    )
    expect(mockedSetItemLocalStorage).toHaveBeenCalledWith(
      '@KuantoKusta:cart',
      JSON.stringify(result.current.cart)
    )
  })

  it('should not be able to increase a product amount when running out of stock', async () => {
    const productId = 2

    apiMock.onGet(`stock/${productId}`).reply(200, {
      id: 1,
      amount: 1
    })

    const { result, waitFor } = renderHook(useCart, {
      wrapper: CartProvider
    })

    act(() => {
      result.current.addProduct(productId)
    })

    await waitFor(
      () => {
        expect(mockedToastError).toHaveBeenCalledWith(
          'Quantidade solicitada fora de estoque'
        )
        expect(result.current.cart).toEqual(
          expect.arrayContaining(initialStoragedData)
        )
        expect(mockedSetItemLocalStorage).not.toHaveBeenCalled()
      },
      {
        timeout: 200
      }
    )
  })

  it('should be able to remove a product', () => {
    const productId = 2

    const { result } = renderHook(useCart, {
      wrapper: CartProvider
    })

    act(() => {
      result.current.removeProduct(productId)
    })

    expect(result.current.cart).toEqual(
      expect.arrayContaining([
        {
          amount: 2,
          id: 1,
          image:
            'https://ae01.alicdn.com/kf/Hdaeb0bc30511453fbed0fb314bbc177cL/T-nis-de-malha-masculina-leve-sapatos-tenis-masculino-sapatos-de-caminhada-respir-vel-deslizamento-em.jpg_Q90.jpg_.webp',
          price: 179.9,
          title: 'Tênis de Caminhada Leve Confortável'
        }
      ])
    )
    expect(mockedSetItemLocalStorage).toHaveBeenCalledWith(
      '@KuantoKusta:cart',
      JSON.stringify(result.current.cart)
    )
  })

  it('should not be able to remove a product that does not exist', () => {
    const productId = 3

    const { result } = renderHook(useCart, {
      wrapper: CartProvider
    })

    act(() => {
      result.current.removeProduct(productId)
    })

    expect(mockedToastError).toHaveBeenCalledWith('Erro na remoção do produto')
    expect(result.current.cart).toEqual(
      expect.arrayContaining(initialStoragedData)
    )
    expect(mockedSetItemLocalStorage).not.toHaveBeenCalled()
  })

  it('should be able to update a product amount', async () => {
    const productId = 2

    apiMock.onGet(`stock/${productId}`).reply(200, {
      id: 2,
      amount: 5
    })

    const { result, waitForNextUpdate } = renderHook(useCart, {
      wrapper: CartProvider
    })

    act(() => {
      result.current.updateProductAmount({ amount: 2, productId })
    })

    await waitForNextUpdate({ timeout: 200 })

    expect(result.current.cart).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          amount: 2,
          image:
            'https://ae01.alicdn.com/kf/Hdaeb0bc30511453fbed0fb314bbc177cL/T-nis-de-malha-masculina-leve-sapatos-tenis-masculino-sapatos-de-caminhada-respir-vel-deslizamento-em.jpg_Q90.jpg_.webp',
          price: 179.9,
          title: 'Tênis de Caminhada Leve Confortável'
        },
        {
          id: 2,
          amount: 2,
          image:
            'https://images-americanas.b2w.io/produtos/97006103/imagens/tenis-de-caminhada-confortavel-detalhes-em-couro-legitimo-vr-preto/97006106_3_large.jpg',
          price: 139.9,
          title: 'Tênis VR Caminhada Confortável Detalhes Couro Masculino'
        }
      ])
    )
    expect(mockedSetItemLocalStorage).toHaveBeenCalledWith(
      '@KuantoKusta:cart',
      JSON.stringify(result.current.cart)
    )
  })

  it('should not be able to update a product that does not exist', async () => {
    const productId = 4

    apiMock.onGet(`stock/${productId}`).reply(404)

    const { result, waitFor } = renderHook(useCart, {
      wrapper: CartProvider
    })

    act(() => {
      result.current.updateProductAmount({ amount: 3, productId })
    })

    await waitFor(
      () => {
        expect(mockedToastError).toHaveBeenCalledWith(
          'Erro na alteração de quantidade do produto'
        )
        expect(result.current.cart).toEqual(
          expect.arrayContaining(initialStoragedData)
        )
        expect(mockedSetItemLocalStorage).not.toHaveBeenCalled()
      },
      { timeout: 200 }
    )
  })

  it('should not be able to update a product amount when running out of stock', async () => {
    const productId = 2

    apiMock.onGet(`stock/${productId}`).reply(200, {
      id: 2,
      amount: 1
    })

    const { result, waitFor } = renderHook(useCart, {
      wrapper: CartProvider
    })

    act(() => {
      result.current.updateProductAmount({ amount: 2, productId })
    })

    await waitFor(
      () => {
        expect(mockedToastError).toHaveBeenCalledWith(
          'Quantidade solicitada fora de estoque'
        )
        expect(result.current.cart).toEqual(
          expect.arrayContaining(initialStoragedData)
        )
        expect(mockedSetItemLocalStorage).not.toHaveBeenCalled()
      },
      { timeout: 200 }
    )
  })

  it('should not be able to update a product amount to a value smaller than 1', async () => {
    const productId = 2

    apiMock.onGet(`stock/${productId}`).reply(200, {
      id: 2,
      amount: 1
    })

    const { result, waitForValueToChange } = renderHook(useCart, {
      wrapper: CartProvider
    })

    act(() => {
      result.current.updateProductAmount({ amount: 0, productId })
    })

    try {
      await waitForValueToChange(
        () => {
          return result.current.cart
        },
        { timeout: 50 }
      )
      expect(result.current.cart).toEqual(
        expect.arrayContaining(initialStoragedData)
      )
      expect(mockedSetItemLocalStorage).not.toHaveBeenCalled()
    } catch {
      expect(result.current.cart).toEqual(
        expect.arrayContaining(initialStoragedData)
      )
      expect(mockedSetItemLocalStorage).not.toHaveBeenCalled()
    }
  })
})
