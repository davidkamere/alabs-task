import { getProviders, signIn as signIntoProvider } from "next-auth/react"
import { ArrowSmDownIcon } from "@heroicons/react/solid"

export default function SignIn({ providers }) {
  return (
    <>
      <div className="flex flex-col  items-center jusifty-center min-h-screen mt-28 py-2 px-14 text-center">
        <div >
          <p className="font-xs italic">Sign in to create, discover and connect with the community.</p>
          <p className="font-xs italic">Google accounts allow us to personalize your page.</p>
          
        </div>
        <ArrowSmDownIcon className="h-12 w-8 mt-8"/>
        <div className="mt-28">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button className="p-3 bg-red-600 rounded-lg text-white" onClick={() => signIntoProvider(provider.id, {callbackUrl: '/'})}>
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