import styled from 'styled-components';
import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline
} from 'react-icons/md'
import { darken, lighten } from 'polished';

export const Container = styled.div`
  padding: 3rem;
  background: ${({ theme }) => theme.colors.primary.white};
  border-radius: 0.4rem;
`;

export const Footer = styled.footer`
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  button {
    background: ${({ theme }) => theme.colors.primary.orange};
    color: ${({ theme }) => theme.colors.primary.white};
    border: 0;
    border-radius: 0.4rem;
    padding: 1.2rem ${({ theme }) => theme.spacings.xxxmultipleeight};
    font-weight: ${({ theme }) => theme.font.bold};
    text-transform: uppercase;
    transition: background 0.2s;
    
    &:hover {
      background: ${({ theme }) => darken(0.06, theme.colors.primary.orange)};
    }
  }
`

export const ProductTable = styled.table`
  width: 100%;

  thead th {
    color: ${({ theme }) => theme.colors.tertiary.xgray};
    text-align: left;
    padding: 1.2rem;
  }

  tbody td {
    padding: 1.2rem;
    border-bottom: ${({ theme }) => theme.border.solid(theme.colors.tertiary.xxxgray)};
  }

  img {
    height: 10rem;
  }

  strong {
    color: ${({ theme }) => theme.colors.tertiary.xxgray};
    display: block;
  }

  span {
    display: block;
    margin-top: 0.5rem;
    font-size: 1.8rem;
    font-weight: ${({ theme }) => theme.font.bold};
  }

  div {
    display: flex;
    align-items: center;

    input {
      border: ${({ theme }) => theme.border.solid('#ddd')};
      border-radius: 0.4rem;
      color: #666;
      padding: 0.6rem;
      width: ${({ theme }) => theme.spacings.xmultipleeight};
    }
  }

  button {
    background: none;
    border: 0;
    padding: 0.6rem;

    svg {
      color: ${({ theme }) => theme.colors.primary.orange};
      transition: color 0.2s;
    }

    &:hover {
      svg {
        color: ${({ theme }) => darken(0.06, theme.colors.primary.orange)} ;
      }
    }

    &:disabled {
      svg {
        color: ${({ theme }) => lighten(0.25, theme.colors.primary.orange)} ;
        cursor: not-allowed;
      }
    }
  }
`;

export const Total = styled.div`
  display: flex;
  align-items: baseline;

  span {
    color: #999;
    font-weight: ${({ theme }) => theme.font.bold};
  }

  strong {
    font-size: 2.8rem;
    margin-left: 0.5rem;
    color: #999;
  }
`;


export const DeleteIcon = styled(MdDelete).attrs({
  size: 20
})``

export const AddCircleOutlineIcon = styled(MdAddCircleOutline).attrs({
  size: 20
})``

export const RemoveCircleOutline = styled(MdRemoveCircleOutline).attrs({
  size: 20
})``

