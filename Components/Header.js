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
            <div className="flex items-center justify-end space-x-4">
                <button onClick={signInPage}>Logout</button> 
            </div>
        </div>
        
    )
}
export default Header