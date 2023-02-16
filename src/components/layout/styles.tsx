import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  top: 7rem;
  position: sticky;
  height: 100%;
  width: 100%;
`

export const Content = styled.div`
  transition: margin-left 0.5s;
  width: 100%;

  max-width: 1020px;
  margin: 0 auto;
  padding: 0 20px 50px;
`

export const Main = styled.main`
  margin-bottom: 3rem;
`
