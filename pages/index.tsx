import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../Components/Header'
import Feed from '../Components/Feed'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Adanian Labs Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header with Log out  */}
      <Header />

      {/* Feed */}
      <Feed />
      {/* Upload Modal */}
    </div>
  )
}

export default Home
