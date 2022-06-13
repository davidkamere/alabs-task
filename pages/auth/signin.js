import { getProviders, signIn as signIntoProvider } from "next-auth/react"
import Header from "../../Components/Header"

export default function SignIn({ providers }) {
  return (
    <>
      <div className="flex flex-col  items-center jusifty-center min-h-screen mt-24 py-2 px-14 text-center">
        <div >
          <p className="font-xs italic">Sign in to create, discover and connect with the community</p>
        </div>
        <div className="mt-32">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button className="p-3 bg-blue-500 rounded-lg text-white" onClick={() => signIntoProvider(provider.id, {callbackUrl: '/'})}>
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