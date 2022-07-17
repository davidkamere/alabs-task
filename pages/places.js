import Head from 'next/head'
import Header from "../Components/Header"
import ReactPlayer from 'react-player/lazy'
import { useEffect, useState } from 'react';


function Places () {

    const videos = [{url: 'https://www.youtube.com/watch?v=sQ3TcRQPifw', id:1}, {url: 'https://www.youtube.com/watch?v=tZdGe54zv-g', id:2}]

    const [windowObj, setWindowObj] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") setWindowObj(true);
    }, []);

    return (
        <>
            <Header />
            <Head>
                <title>PCHA</title>
                <link rel="icon" href="/floral.ico" />
            </Head>

            <div className="flex flex-wrap gap-6 justify-center my-14">
                {videos.map(video => (
                    windowObj && <div className="mx-8"><ReactPlayer id={video.id} url={video.url} width="460px" /></div>
                ))}
                
            </div>

        </>
    )
}

export default Places
