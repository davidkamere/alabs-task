import { getProviders, signIn as signIntoProvider } from "next-auth/react"
import { ArrowSmDownIcon } from "@heroicons/react/solid"
import Logo from "../../Components/Logo"
import { useSession } from 'next-auth/react'
import Loading from '../../Components/Loading'
import Head from "next/head"

export default function SignIn({ providers }) {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <Loading />
  }

  return (
    <div className="bg-white text-black">
      <Head>
        <title>PCHA</title>
        <link rel="icon" href="/floral.ico" />
      </Head>
      {/* <Image src={backG} alt="" layout="fill" className="fixed -z-10 min-h-screen"/> */}
      <div className="flex flex-col items-center jusifty-center py-2 px-14 text-center bg-gray-50 min-h-screen">
        <div className="mt-28">
          <Logo/>
          <p className="font-xs italic">Sign in to create, discover and connect with the community.</p>
          <p className="font-xs italic">Google accounts allow us to personalize your page.</p>
          
        </div>
        <ArrowSmDownIcon className="h-12 w-8 mt-16"/>
        <div className="mt-20">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button className="transition ease-in-out duration-500 rounded px-6 py-4 bg-gradient-to-r from-[#ddd37a] to-[#01a280] shadow hover:text-white font-bold text-black bg-white shadow-[#C4D668]"
                      onClick={() => signIntoProvider(provider.id, {callbackUrl: '/'})}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// server side rendering
export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}