import Image from "next/future/image"
import Head from 'next/head'

const Loading = () => {
    return (
        <>
        <Head>
            <title>PCHA</title>
            <link rel="icon" href="/floral.ico" />
        </Head>
        <div className="flex justify-center items-center h-screen bg-black">
            <div className="animate-pulse flex justify-center text-3xl font-bold mb-8 text-white tracking-widest">
                {/* <Image src="/floral.ico" width={30} height={30} className="mr-4"/> */}
                <span className="text-white">P</span>CHA
            </div>
        </div>
        </>
      )
}

export default Loading;