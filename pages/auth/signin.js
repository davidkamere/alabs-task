import { getProviders, signIn as signIntoProvider } from "next-auth/react"
import { ArrowSmDownIcon } from "@heroicons/react/solid"

export default function SignIn({ providers }) {
  return (
    <>
      <div className="flex flex-col bg-signin bg-cover bg-center bg-no-repeat items-center jusifty-center min-h-screen py-2 px-14 text-center">
        <div className="mt-32">
          <p className="font-xs italic">Sign in to create, discover and connect with the community.</p>
          <p className="font-xs italic">Google accounts allow us to personalize your page.</p>
          
        </div>
        <ArrowSmDownIcon className="h-12 w-8 mt-16 animate-bounce"/>
        <div className="mt-20">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button className="p-3 bg-black rounded-lg text-white bg-gradient-to-r from-[#336934] to-[#737238]"
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