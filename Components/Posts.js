import { useEffect, useState } from 'react'
import Post from './Post'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'


// Renders all the posts
const Posts = () => {
    const [posts, setPosts] = useState([])

    useEffect(() =>
    {
        return onSnapshot(
            query(
                collection(db, "posts"),
                orderBy('timestamp', 'desc')
            ),
            snapshot => {setPosts(snapshot.docs)}
        )
    }, [db])

    return( 
        <div className="grid grid-cols-1 md:p-5 md:grid-cols-2 lg:grid-cols-4 justify-items-center items-end">
            {posts.map(post => (
                <div key={post.id}>
                    <Post  id={post.id} username={post.data().username} img={post.data().image} caption={post.data().caption}/>
                </div>
            ))}
           
        </div>
    )
}

export default Posts