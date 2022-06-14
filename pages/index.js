
import Head from 'next/head'
import Header from '../components/Header'
import Feed from '../components/Feed'
import Footer from '../components/Footer'
import Modal from '../components/Modal'
import Loading from '../components/Loading'
import { useSession } from 'next-auth/react'
import { useRouter } from "next/router"

const Home = () => {
  const { data: session, status } = useSession(null)
  const router = useRouter()

  if (status === "loading") {
    return <Loading />
  }

  if (status === "unauthenticated") {
    router.push('/auth/signin')
  }

  return (
    <div className="">
      <Head>
        <title>Adanian Labs Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Header with Log out  */}
      {session && <Header />}

      {/* Feed */}
      <Feed />

      {/* Upload Modal */}
      <Modal />

      {/* Sticky Footer */}
      <div className='sticky bottom-0 bg-white opacity-90'>
        <Footer />
      </div>

    </div>
  )
}

export default Home
