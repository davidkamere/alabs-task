import { useState, useEffect } from "react"

import Head from 'next/head'
import Post from "../../Components/Post"
import Header from "../../Components/Header"
import Loading from '../../Components/Loading'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../firebase'
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react"



function Profile (props) {
    const router = useRouter()
    const { data: session, status } = useSession()
    const [posts, setPosts] = useState([])
    const { id } = router.query

    useEffect(() =>
    {
        
        return onSnapshot(
            query(
                collection(db, "posts"),
                where("username", "==", id),
                orderBy('timestamp', 'desc')
            ),
            snapshot => {setPosts(snapshot.docs)}
        )
    }, [db])

    if (status === "loading") {
        return <Loading />
    }
    
    if (status === "unauthenticated") {
        router.push('/auth/signin')
    }


    return( 
        <div className="bg-black text-white min-h-screen">
            <Head>
                <title>Profile | PCHA</title>
                <link rel="icon" href="/floral.ico" />
            </Head>
            <Header />
            <div className="flex flex-wrap md:p-5 justify-center items-end">
                {posts.map(post => (
                    <div key={post.id}  className="mx-10">
                        <Post  id={post.id} username={null} img={post.data().image} caption={post.data().caption}/>
                    </div>
                ))}
            
            </div>
           
        </div>
    )
}

export default Profile

export async function getServerSideProps(context) {
    return {
      props: {}, // will be passed to the page component as props
    };
  }