import Head from 'next/head'
import Header from "../Components/Header"
import ReactPlayer from 'react-player/lazy'
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Loading from '../Components/Loading'
import { useRouter } from "next/router"
import { db } from '../firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

function Places () {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [contents, setContents ] = useState([])
    
    const [windowObj, setWindowObj] = useState(false);

    useEffect(() =>
    {
        
        return onSnapshot(
            query(
                collection(db, "places"),
                orderBy('timestamp', 'desc')
            ),
            snapshot => {setContents(snapshot.docs)}
        )
    }, [db])

    // solves for issue when dealing with dynamic imports in NextJS
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
                <title>Places | PCHA</title>
                <link rel="icon" href="/floral.ico" />
            </Head>

            <div className="flex flex-wrap gap-10 justify-center my-14">
                {contents.map(content => (
                    windowObj && <div key={content.id}><ReactPlayer url={content.data().url} width="375px"/></div>
                ))}
                
            </div>

        </>
    )
}

export default Places
