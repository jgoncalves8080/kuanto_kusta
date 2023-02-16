import styled, { css } from 'styled-components';
import { MdAddShoppingCart } from 'react-icons/md'
import { darken } from 'polished';

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  list-style: none;

  li {
    display: flex;
    flex-direction: column;
    border-radius: 0.4rem;
    background-color: ${({ theme }) => theme.colors.primary.white};
    padding: ${({ theme }) => theme.spacings.xxxmultipleeight};

    img {
      align-self: center;
      max-width: 15rem;
    }

    > strong {
      font-size: ${({ theme }) => theme.font.sizes.midle};
      line-height: ${({ theme }) => theme.font.sizes.xxxlarge};
      color: ${({ theme }) => theme.colors.tertiary.xxgray};
      margin-top: 0.5rem;
    }

    > span {
      font-size: 2.1rem;
      font-weight: ${({ theme }) => theme.font.bold};
      margin: 0.5rem 0 ${({ theme }) => theme.spacings.xxxmultipleeight};
      color: ${({ theme }) => theme.colors.tertiary.xxgray};
    }

    button {
      background: ${({ theme }) => theme.colors.primary.orange};
      color: ${({ theme }) => theme.colors.primary.white};
      border: 0;
      border-radius: 0.4rem;
      overflow: hidden;
      margin-top: auto;

      display: flex;
      align-items: center;
      transition: background 0.2s;
      

      &:hover {
        ${({ theme }) => css`
          background: ${darken(0.06, theme.colors.primary.orange)};
        `}
      }

      div {
        display: flex;
        align-items: center;
        padding: 1.2rem;
        background: ${({ theme }) => theme.colors.shades.black(0.1)};

        svg {
          margin-right: 0.5rem;
        }
      }

      span {
        flex: 1;
        text-align: center;
        font-weight: ${({ theme }) => theme.font.bold};
      }
    }
  }
`;


export const AddShoppingCartIcon = styled(MdAddShoppingCart).attrs(({ theme }) => ({
  size: 16,
  color: theme.colors.primary.white
}))``