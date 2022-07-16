import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { UserCircleIcon } from "@heroicons/react/solid"
import Link from 'next/link'

const Header = (props) => {
    const { data: session } = useSession()
    const router = useRouter()


    const signInPage = () => {
        signOut()
        router.push('/auth/signin')
    }

        console.log(session)
    return (
   
        <div className="pt-5 px-8">
            <div className="flex justify-between items-center">
            <Link href="/"><p className="tracking-wide font-bold hover:cursor-pointer">PCHA</p></Link>
                <div className="flex flex-row gap-5">
                    <Link href={`/profile/${session?.user?.username}`}>
                        <UserCircleIcon className="h-9 w-9 my-1 "/>
                    </Link>
                    <button onClick={signInPage} className="py-2 px-4 bg-gradient-to-r from-[#adda89] to-[#fdf9a1] rounded-lg text-white">Sign out</button>
                </div>
            </div>
            
            
        </div>
        
    )
}
export default Header

export async function getServerSideProps(context) {
    return {
      props: {}, // will be passed to the page component as props
    };
  }