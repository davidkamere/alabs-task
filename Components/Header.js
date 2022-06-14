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
   
        <div className="py-5 px-12 shadow-sm border-b bg-white sticky top-0 z-50">
            <div className="flex justify-between items-center">
                <p>Welcome, <span className="font-bold mr-2 text-gray-800">{session.user.username}</span></p>
                <button onClick={signInPage} className="py-2 px-4 bg-black hover:bg-red-500 rounded-lg text-white">Logout</button>
            </div>
            
            
        </div>
        
    )
}
export default Header