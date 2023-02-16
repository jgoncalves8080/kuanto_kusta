import React, { PropsWithChildren } from 'react'

import Header from '../header'

import * as S from './styles'

const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <S.Wrapper>
      <S.Content>
        <Header />
        <S.Main>{children}</S.Main>
      </S.Content>
    </S.Wrapper>
  )
}

export { Layout }
