import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"

const Header = () => {
    const { data: session} = useSession()
    const router = useRouter()


    const signInPage = () => {
        signOut()
        router.push('/auth/signin')
    }

    return (
   
        <div className="pt-5 px-8">
            <div className="flex justify-between items-center">
                <p>Welcome, <span className="font-bold mr-2 text-gray-800">{session.user.username}</span></p>
                <button onClick={signInPage} className="py-2 px-4 bg-gradient-to-r from-[#f2cbac] to-[#bac9c9] rounded-lg text-white">Sign out</button>
            </div>
            
            
        </div>
        
    )
}
export default Header