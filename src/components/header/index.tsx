import React from 'react'
import Link from 'next/link'

import * as S from './styles'
import { useCart } from '../../hooks/useCart'

const Header = (): JSX.Element => {
  const { cart } = useCart()
  const cartSize = cart.length

  return (
    <S.Container>
      <Link href={'/'}>
        <a>
          <img
            src={
              'https://cdn1.newsplex.pt/media/transferido/styles/625x350-imagem_interior/public/kuantokusta_-_01.jpg?type=artigo'
            }
            alt="KuantoKusta"
          />
        </a>
      </Link>

      <S.Cart href={'/cart'}>
        <a>
          <S.CartWrapper>
            <strong>Meu carrinho</strong>
            <div>
              <span data-testid="cart-size">
                {cartSize === 1 ? `${cartSize} item` : `${cartSize} itens`}
              </span>
              <S.ShoppingBasketIcon />
            </div>
          </S.CartWrapper>
        </a>
      </S.Cart>
    </S.Container>
  )
}

export default Header
