import { useState } from "react"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { UserCircleIcon } from "@heroicons/react/outline"
import Link from 'next/link'
import Image from "next/future/image"
import { FilmIcon } from "@heroicons/react/outline"

const Header = (props) => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const { data: session } = useSession()
    const router = useRouter()


    const signInPage = () => {
        signOut()
        router.push('/auth/signin')
    }

    return (
        <div className="pt-1 px-8 ">
            <div className="flex items-center justify-between py-8">
                <div className="flex items-center ">
                    <Link href="/"><Image src="/floral.ico" width={30} height={30} className="mr-4"/></Link>
                    <Link href="/"><p className="mt-0.5 font-bold hover:cursor-pointer text-sm">PCHA</p></Link>
                </div>

            <nav className="">
                <section className="MOBILE-MENU flex lg:hidden ">
                <div
                    className="HAMBURGER-ICON space-y-2"
                    onClick={() => setIsNavOpen((prev) => !prev)}
                >
                    <span className="block h-0.5 w-7 bg-[#adda89]"></span>
                    <span className="block h-0.5 w-7 bg-[#adda89]"></span>
                    <span className="block h-0.5 w-7 bg-[#adda89]"></span>
                </div>
        
                <div className={isNavOpen ? "showMenuNav " : "hideMenuNav"}>
                    <div
                    className="absolute top-0 right-0 px-8 py-8 "
                    onClick={() => setIsNavOpen(false)}
                    >
                    <svg
                        className="h-8 w-8 text-black"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    </div>
                    <ul className="flex flex-col items-center justify-between min-h-[250px] ">
                        <li className="mt-0 mb-8 uppercase">
                            <Link href="/">HOME</Link>
                        </li>
                        <li className="my-8 uppercase">
                            <Link href={`/profile/${session?.user?.username}`}>PROFILE</Link>
                        </li>
                        <li className="my-8 uppercase">
                            <Link href="/places"><span className="text-gray-400">PLACES</span></Link>
                        </li>
                        <li className="my-8">
                            <button onClick={signInPage} className="py-2 px-3 bg-gradient-to-r from-[#adda89] to-[#fdf9a1] rounded-lg text-sm">SIGN OUT</button>
                        </li>
                    </ul>
                </div>
                </section>
        
                <ul className="DESKTOP-MENU hidden space-x-7 lg:flex">
                    <li>
                        <Link href="/places">
                            <div>
                                <FilmIcon className="h-7 w-7 hover:cursor-pointer text-slate-700 hover:text-slate-900"/>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/profile/${session?.user?.username}`}>
                            <UserCircleIcon className="h-7 w-7 hover:cursor-pointer text-slate-700 hover:text-slate-900"/>
                        </Link>
                    </li>
                    <li>
                        <button onClick={signInPage} className="py-2 px-3 bg-gradient-to-r from-[#adda89] to-[#fdf9a1] rounded-lg text-xs font-bold">SIGN OUT</button>
                    </li>
                </ul>
            </nav>
            <style>{`
            .hideMenuNav {
                display: none;
            }
            .showMenuNav {
                display: block;
                position: absolute;
                width: 100%;
                height: 100vh;
                top: 0;
                left: 0;
                background: white;
                z-index: 10;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                align-items: center;
            }
            `}</style>
            </div>
        </div>
      );
}
export default Header

export async function getServerSideProps(context) {
    return {
      props: {}, // will be passed to the page component as props
    };
}