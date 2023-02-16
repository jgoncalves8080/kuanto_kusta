import type { NextPage } from 'next'
import Head from 'next/head'
import { Layout } from 'src/components/layout'

import CartPage from '../../views/Cart'

const Cart: NextPage = () => {
  return (
    <>
      <Head>
        <title>Kuanto Kusta</title>
      </Head>
      <main>
        <CartPage />
      </main>
    </>
  )
}

Object.assign(Cart, {
  Layout
})

export default Cart
