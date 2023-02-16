import type { NextPage } from 'next'
import Head from 'next/head'
import { Layout } from 'src/components/layout'

import HomePage from '../views/Home'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Kuanto Kusta</title>
      </Head>
      <main>
        <HomePage />
      </main>
    </>
  )
}

Object.assign(Home, {
  Layout
})

export default Home
