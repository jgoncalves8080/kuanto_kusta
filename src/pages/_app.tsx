import React, { ComponentType, useEffect, useState } from 'react'

import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from 'styled-components'

import GlobalStyles from '../styles/global'
import { theme } from '../styles/theme'

import { CartProvider } from 'src/hooks/useCart'

type NextPageWithLayout = NextPage & {
  Layout?: ComponentType
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
  err?: Error
}

function MyApp({ Component, pageProps, err }: AppPropsWithLayout) {
  const [showChild, setShowChild] = useState(false)
  const ComponentLayout = Component.Layout ? Component.Layout : React.Fragment

  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }

  if (typeof window === 'undefined') {
    return <></>
  } else {
    return (
      <ThemeProvider theme={theme}>
        <CartProvider>
          <ComponentLayout>
            <Component {...pageProps} err={err} />
          </ComponentLayout>
          <GlobalStyles />
          <ToastContainer autoClose={3000} />
        </CartProvider>
      </ThemeProvider>
    )
  }
}

export default MyApp
