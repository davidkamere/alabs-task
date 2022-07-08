
import Head from 'next/head'
import Header from '../Components/Header'
import Feed from '../Components/Feed'
import Footer from '../Components/Footer'
import Modal from '../Components/Modal'
import Loading from '../Components/Loading'
import { useSession } from 'next-auth/react'
import { useRouter } from "next/router"

const Home = () => {
  const { data: session, status } = useSession()
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
        <title>lab</title>
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
