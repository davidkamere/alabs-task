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
        <div className="pt-1 px-6 md:px-8">
            <div className="flex items-center justify-between py-8">
                {!props.protected ? <div className="flex items-center ">
                    {/* <Link href="/"><Image src="/floral.ico" width={30} height={30} className="mr-4"/></Link> */}
                    <Link href="/"><p className="mt-0.5 font-bold hover:cursor-pointer text-sm text-black tracking-widest"><span className="text-[black]">P</span>CHA</p></Link>
                </div> : <div className="text-slate-500 FONT-BOLD">Welcome, {session?.user?.username}</div>}

            <nav className="">
                <section className="MOBILE-MENU flex lg:hidden ">
                <div
                    className="HAMBURGER-ICON space-y-2"
                    onClick={() => setIsNavOpen((prev) => !prev)}
                >
                    <span className="block h-0.5 w-7 bg-black"></span>
                    <span className="block h-0.5 w-7 bg-black"></span>
                    <span className="block h-0.5 w-7 bg-black"></span>
                </div>
        
                <div className={isNavOpen ? "showMenuNav " : "hideMenuNav"}>
                    <div
                    className="absolute top-0 right-0 px-8 py-8 "
                    onClick={() => setIsNavOpen(false)}
                    >
                    <svg
                        className="h-8 w-8 "
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    </div>
                    <ul className="flex flex-col items-center justify-between min-h-[250px] font-semibold ">
                        <li className="mt-0 mb-8 uppercase">
                            <Link href="/">HOME</Link>
                        </li>
                        <li className="my-8 uppercase hover:cursor-pointer">
                            <Link href={`/profile/${session?.user?.username}`}>PROFILE</Link>
                        </li>
                        {! props.protected && <li className="my-8 uppercase hover:cursor-pointer">
                            <Link href="/random"><span className="">Random</span></Link>
                        </li>}
                        <li className="mt-28">
                            <button onClick={signInPage} className="w-36 h-12 bg-white border border-[#adda89] rounded px-4 py-2 shadow-xs font-bold text-black text-sm">SIGN OUT</button>
                        </li>
                    </ul>
                </div>
                </section>
        
                <ul className="DESKTOP-MENU hidden space-x-7 lg:flex">
                    {! props.protected &&
                    <>
                    <li>
                        <Link href="/random">
                            <div>
                                <FilmIcon className="transition ease-in-out duration-100 hover:scale-105 h-8 w-8 py-1 hover:cursor-pointer text-slate-500 hover:text-slate-700"/>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/profile/${session?.user?.username}`}>
                            <UserCircleIcon className="transition ease-in-out duration-100 hover:scale-105 h-8 w-8 py-1 hover:cursor-pointer text-slate-500 hover:text-slate-700"/>
                        </Link>
                    </li></>} 
                    <li>
                        <button onClick={signInPage} className="bg-gradient-to-r from-[#adda89] to-[#d1f73f] hover:text-black  hover:bg-lime-50 rounded px-4 py-2 shadow-xs font-bold text-white text-sm transition ease-in-out duration-500">SIGN OUT</button>
                    </li>
                </ul>
            </nav>
            <style>{`
            .hideMenuNav {
                display: none;
            }
            .showMenuNav {
                opacity: 0.999;
                display: block;
                position: absolute;
                width: 100%;
                height: 100vh;
                top: 0;
                left: 0;
                background: #fbfcfa;
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