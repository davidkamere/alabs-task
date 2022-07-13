import { ChatIcon, HeartIcon } from "@heroicons/react/outline"

import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid"
import { addDoc, deleteDoc, doc, serverTimestamp, setDoc } from "firebase/firestore"
import { useEffect, useRef, useState } from "react"
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import Moment from "react-moment"
import { useSession } from "next-auth/react"

// component for a single post
const Post = ({id, username, img, caption}) => {
    const { data: session } = useSession()
    const addComment = useRef(null)
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const [likes, setLikes] = useState([])
    const [hasLiked, setHasLiked] = useState(false)
    const [hidden, setHidden] = useState('hidden')

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
    const hideVideo = () => {
        setHidden('hidden')
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

    const focusComment = () => {
        addComment.current.focus()
    }
    
    return (
        <div className="my-7">
        <div className="my-2 shadow-2xl">
            <img src={img} className="object-fill h-68 w-96" alt="" onLoad={hideVideo}/>
            <video className={`object-contain h-68 w-96 ${hidden}`} controls="controls" id="video">
                <source src={img} type="video/mp4"></source>
            </video>
        </div>

        <div className="bg-white border rounded-sm border-[#AAF0C1] border-opacity-25 w-96">
            {/* img */}
            
            {/* Buttons */}
            <div className="flex space-x-4 px-4 pt-4">
                {hasLiked ?
                    <HeartIconFilled onClick={likePost} className="h-7 hove:scale-125 curor-pointer transition-all duration-150 ease-out text-red-500"/> 
                :
                    <HeartIcon onClick={likePost} className="h-7 hove:scale-125 curor-pointer transition-all duration-150 ease-out"/>
                }
                <ChatIcon onClick={focusComment} className="h-7 hove:scale-125 curor-pointer transition-all duration-150 ease-out"/>
            </div>
            {/* Caption */}
            <div className="p-5">
                {likes.length > 0 && (
                    <p className="font-bold mb-1">{likes.length} likes</p>
                )}
                <span className="font-bold mr-2 text-gray-800">{username}</span>
                <span>{caption}</span>
            </div>
            {/* Comments */}
            {comments.length > 0 && (
                <div className="ml-5 h-14 overflow-y-scroll scrollbar-hide">
                    {comments.map((comment) => (
                        <div key={comment.id} className="flex items-center">
                            <p className="text-sm flex-1">
                                <span className="text-[#bac9c9] font-bold pr-2">{comment.data().username}</span>
                                <span className="m-auto">{comment.data().comment}</span>
                            </p>
                            <Moment fromNow className="pr-5 text-xs text-gray-400">
                                <span >{comment.data().timestamp?.toDate()}</span>
                            </Moment>
                        </div>
                    ))}
                </div>
            )}

            {/* Input Box */}
            <form className="flex items-center p-2 ">
                <input
                 type="text"
                 ref={addComment}
                 value={comment}
                 onChange={e => setComment(e.target.value)}
                 placeholder="Add a comment..."
                 className="border-none flex-1 focus:ring-0 outline-none bg-opacity-0 bg-white"/>
                <button
                 disabled={!comment.trim()}
                 type='submit'
                 onClick={sendComment}
                 className="font-semibold text-[#336934] mr-3 hover:text-black">Post</button>
            </form>
        </div>
        </div>
    )
}


export default Post