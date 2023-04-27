import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import Post from './Post';
import Search from './Search';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const postsCollection = collection(db, "posts");

        const q = query(
          postsCollection,
          search ? where('caption', '>=', search) : orderBy('timestamp', 'desc')
        );
        return onSnapshot(q, (snapshot) => {
          setPosts(snapshot.docs);
        });
    }, [db, search]);


    return (
        <>
        <div className="flex justify-center">
            <Search search={search} setSearch={setSearch} />
        </div>
        <div className="flex flex-wrap gap-5 md:p-5 justify-center items-end">
            {posts.map((post) => (
            <div key={post.id} className="mx-5 md:p-10">
                <Post
                id={post.id}
                username={post.data().username}
                img={post.data().image}
                caption={post.data().caption}
                timestamp={post.data().timestamp}
                />
            </div>
            ))}
        </div>
        </>
    );
};

export default Posts;
