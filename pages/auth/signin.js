import { getProviders, signIn as signIntoProvider } from "next-auth/react"
import { ArrowSmDownIcon } from "@heroicons/react/solid"
import Image from "next/future/image"
// import backG from "../../public/backgrounds/bw.png"

export default function SignIn({ providers }) {
  return (
    <>
      {/* <Image src={backG} alt="" layout="fill" className="fixed -z-10 min-h-screen"/> */}
      <div className="flex flex-col items-center jusifty-center py-2 px-14 text-center bg-white text-black min-h-screen">
        <div className="mt-28">
          <div className="flex justify-center text-3xl font-bold mb-8 text-black tracking-widest">
            <Image src="/floral.ico" width={30} height={30} className="mr-4"/>
            <span className="text-[#9ea659]">P</span>CHA
          </div>
          <p className="font-xs italic">Sign in to create, discover and connect with the community.</p>
          <p className="font-xs italic">Google accounts allow us to personalize your page.</p>
          
        </div>
        <ArrowSmDownIcon className="h-12 w-8 mt-16"/>
        <div className="mt-20">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button className="transition ease-in-out duration-500 rounded-full px-6 py-4 border border-black hover:border-[#336934] hover:bg-black shadow hover:text-white font-bold text-black bg-white shadow-[#a3d2a0]"
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