import { getProviders, signIn as signIntoProvider } from "next-auth/react"
import { ArrowSmDownIcon } from "@heroicons/react/solid"
import Image from "next/future/image"
import backG from "../../public/stone.png"

export default function SignIn({ providers }) {
  return (
    <>
      <Image src={backG} alt="" layout="fill" className="fixed -z-10 min-h-screen"/>
      <div className="flex flex-col items-center jusifty-center py-2 px-14 text-center">
        <div className="mt-32">
          <p className="font-xs italic">Sign in to create, discover and connect with the community.</p>
          <p className="font-xs italic">Google accounts allow us to personalize your page.</p>
          
        </div>
        <ArrowSmDownIcon className="h-12 w-8 mt-16 animate-bounce"/>
        <div className="mt-20">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button className="p-3 shadow-xl shadow-lime-900  rounded-lg text-black font-bold bg-gradient-to-r from-[#f2cbac] to-[#bac9c9] "
                      onClick={() => signIntoProvider(provider.id, {callbackUrl: '/'})}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

// server side rendering
export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}