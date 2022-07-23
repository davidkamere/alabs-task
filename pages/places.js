import Head from 'next/head'
import Header from "../Components/Header"
import ReactPlayer from 'react-player/lazy'
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Loading from '../Components/Loading'
import { useRouter } from "next/router"
import { db } from '../firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import Link from 'next/link';

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
        <div className='bg-black min-h-screen'>
            <Header />
            <Head>
                <title>Places | PCHA</title>
                <link rel="icon" href="/floral.ico" />
            </Head>

            <div className="flex flex-col justify-center pb-20 pt-2 px-1 md:px-40 lg:px-96">
                {contents.map(content => (
                    windowObj &&
                    <div className='mb-20'>
                        <div key={content.id}><ReactPlayer url={content.data().url} controls={true} width='100%' light={true}/></div>
                        <div className="flex justify-end">
                            <Link href={`/profile/${content?.data().username}`}><span className="font-bold mr-2 text-gray-800 hover:cursor-pointer text-sm mt-4">shared by {content.data().username}</span></Link>
                            {/* <div className="text-sm text-gray-800 font-bold">{timestamp?.toDate().toLocaleDateString()}</div> */}
                        </div>
                    </div>
                ))}
                
                
            </div>

        </div>
    )
}

export default Places
