import Logo from "../Components/Logo"
import Header from "../Components/Header"
import Head from "next/head"
import { useRouter } from "next/router"

const communities = [{name: "patient zero 💉", id:1}, {name :"90s", id:2}]

const Community = () => {

    const router = useRouter()

    const setCommunity = (community) => {
        fetch(`${window.location.origin}/api/community`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(community)
        })

        router.push("/")
       
    }

    return (
        <div className="bg-[#fbfcfa] h-screen">
            <Head>
                <title>PCHA</title>
                <link rel="icon" href="/floral.ico" />
            </Head>
            <Header protected={true}/>
            <div className="flex flex-col justify-center items-center gap-10 mt-20">
                <div>Choose a community to get started:</div>
                {communities.map(community => (
                    <button onClick={() => setCommunity(community.name)} key={community.id} className="min-w-[250px] transition ease-in-out duration-500 rounded-full px-6 py-4 border border-black  hover:bg-black shadow hover:text-white font-bold text-black bg-white shadow-[#C4D668]">
                        {community.name}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Community