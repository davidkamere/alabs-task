import Head from 'next/head'
import Header from "../Components/Header"
import ReactPlayer from 'react-player/lazy'
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Loading from '../Components/Loading'
import { useRouter } from "next/router"

function Places () {
    const { data: session, status } = useSession()
    const router = useRouter()
    const videos = [{url: 'https://www.youtube.com/watch?v=sQ3TcRQPifw', id:1}, {url: 'https://www.youtube.com/watch?v=tZdGe54zv-g', id:2}]
    
    const [windowObj, setWindowObj] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") setWindowObj(true);
    }, []);

    if (status === "loading") {
        return <Loading />
    }
    
    if (status === "unauthenticated") {
        router.push('/auth/signin')
    }

    return (
        <>
            <Header />
            <Head>
                <title>PCHA</title>
                <link rel="icon" href="/floral.ico" />
            </Head>

            <div className="flex flex-wrap gap-6 justify-center my-14">
                {videos.map(video => (
                    windowObj && <div className="mx-8"><ReactPlayer id={video.id} url={video.url} width="370px" /></div>
                ))}
                
            </div>

        </>
    )
}

export default Places
