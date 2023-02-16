import styled from 'styled-components';
import Link from 'next/link';

import { MdShoppingBasket } from 'react-icons/md'

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${({ theme }) => theme.spacings.xmultipleeight} 0;

  a {
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.7;
    }
  }

  img {
    width: 150px;
    height: 80px;
  }
`;

export const Cart = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
 
`;

export const CartWrapper = styled.div`
  margin-right: ${({ theme }) => theme.spacings.xxxxmultipleeight};
  text-align: right;

  div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
  }

  strong {
    display: block;
    color: ${({ theme }) => theme.colors.primary};
  }

  span {
    font-size: ${({ theme }) => theme.font.sizes.small};
    color: ${({ theme }) => theme.colors.tertiary.xgray};
  }
`

export const ShoppingBasketIcon = styled(MdShoppingBasket).attrs(({ theme }) => ({
  size: 32,
  color: theme.colors.primary.white
}))``