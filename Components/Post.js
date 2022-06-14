import { ChatIcon, HeartIcon } from "@heroicons/react/outline"

import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid"
import { addDoc, deleteDoc, doc, serverTimestamp, setDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import Moment from "react-moment"
import { useSession } from "next-auth/react"

// component for a single post
const Post = ({id, username, img, caption}) => {
    const { data: session } = useSession()
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const [likes, setLikes] = useState([])
    const [hasLiked, setHasLiked] = useState(false)

    useEffect(() =>
    {
        return onSnapshot(
            query(
                collection(db, 'posts', id, 'comments'),
                orderBy('timestamp', 'desc')
            ),
            snapshot => {setComments(snapshot.docs)}) 
    }, [db, id])

    useEffect(
        () => {
            onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => 
                setLikes(snapshot.docs)
            )
        }, [db, id])

    useEffect(
        () => 
        setHasLiked(
            likes.findIndex(like => like.id === session?.user?.uid) !== -1),
        [likes]
    )

    const likePost = async () => {
        if (hasLiked){
            await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid))
        }else{
            await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
                username: session.user.username
            })
        }
        
    }

    

    const sendComment = async(e) => {
        e.preventDefault()

        const commentToSend = comment;
        setComment('')

        await addDoc(collection(db, 'posts', id, 'comments'), {
            comment: commentToSend,
            username: session.user.username,
            timestamp: serverTimestamp()
        })
    }
    return (
        <div className="bg-white my-7 border rounded-sm">
           
            
            {/* img */}
            <img src={img} className="object-cover h-68 w-96" alt=""/>
            {/* Buttons */}
            <div className="flex space-x-4 px-4 pt-4">
                {hasLiked ?
                    <HeartIconFilled onClick={likePost} className="h-7 hove:scale-125 curor-pointer transition-all duration-150 ease-out text-red-500"/> 
                :
                    <HeartIcon onClick={likePost} className="h-7 hove:scale-125 curor-pointer transition-all duration-150 ease-out"/>
                }
                <ChatIcon className="h-7 hove:scale-125 curor-pointer transition-all duration-150 ease-out"/>
            </div>
            {/* Caption */}
            <p className="p-5 truncate">
                {likes.length > 0 && (
                    <p className="font-bold mb-1">{likes.length} likes</p>
                )}
                <span className="font-bold mr-2 text-gray-800">{username}</span>
                {caption}
            </p>
            {/* Comments */}
            {comments.length > 0 && (
                <div className="ml-10 h-20 overflow-y-scroll scrollbar-hide">
                    {comments.map((comment) => (
                        <div key={comment.id} className="flex items-center space-x-2 mb-3">
                            <p className="text-sm flex-1">
                                <span className="text-blue-400 font-bold pr-2">{comment.data().username}</span>
                                {comment.data().comment}
                            </p>
                            <Moment fromNow className="pr-5 text-xs text-gray-400">
                                <span >{comment.data().timestamp?.toDate()}</span>
                            </Moment>
                        </div>
                    ))}
                </div>

            )}

            {/* Input Box */}
            <form className="flex items-center p-2">
                <input
                 type="text"
                 value={comment}
                 onChange={e => setComment(e.target.value)}
                 placeholder="Add a comment..."
                 className="border-none flex-1 focus:ring-0 outline-none"/>
                <button
                 disabled={!comment.trim()}
                 type='submit'
                 onClick={sendComment}
                 className="font-semibold text-blue-400">Post</button>
            </form>
        </div>
    )
}


export default Post