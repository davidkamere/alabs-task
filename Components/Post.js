import { ChatIcon, HeartIcon } from "@heroicons/react/outline"

import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid"
import { addDoc, deleteDoc, doc, serverTimestamp, setDoc } from "firebase/firestore"
import { useEffect, useRef, useState } from "react"
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import Moment from "react-moment"
import { useSession } from "next-auth/react"
import Image from "next/future/image"


// component for a single post
const Post = ({ id, username, img, caption }) => {
    const { data: session } = useSession()
    const addComment = useRef(null)
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const [likes, setLikes] = useState([])
    const [hasLiked, setHasLiked] = useState(false)
    const [hidden, setHidden] = useState('hidden')

    useEffect(() => {
        return onSnapshot(
            query(
                collection(db, 'posts', id, 'comments'),
                orderBy('timestamp', 'desc')
            ),
            snapshot => { setComments(snapshot.docs) })
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
        if (hasLiked) {
            await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid))
        } else {
            await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
                username: session.user.username
            })
        }

    }
    const hideVideo = () => {
        setHidden('hidden')
    }


    const sendComment = async (e) => {
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
        <div className="my-7 md:w-56">
            <div className="my-3">
                <Image src={img} width={384} height={500} className="object-fill h-auto w-96 md:w-56" alt="" onLoad={hideVideo} />
                <video className={`object-contain h-68 w-96 ${hidden}`} controls="controls" id="video">
                    <source src={img} type="video/mp4"></source>
                </video>
            </div>

            <div className="border rounded-sm border-[#fdf9a1] border-opacity-25 w-96 shadow-sm shadow-gray-500 md:w-56 md:text-sm md:border-none md:shadow-none ">
                {/* img */}

                {/* Buttons */}
                <div className="flex justify-between px-4 pt-4 mb-2 md:px-0 ">
                    <div>
                        {hasLiked ?
                            <HeartIconFilled onClick={likePost} className="h-6 hover:scale-125 curor-pointer transition-all duration-150 ease-out text-[#adda89]" />
                            :
                            <HeartIcon onClick={likePost} className="h-6 hover:scale-125 curor-pointer transition-all duration-150 ease-out" />
                        }
                    </div>
                    <div>
                        {likes.length > 0 && (
                            <p className="font-bold text-[#adda89]">{likes.length} {likes.length > 1 ? <span>Likes</span> : <span>Like</span>}</p>
                        )}
                    </div>
                </div>
                {/* Caption */}
                <div className="p-5 md:px-0">
                    
                    <span className="font-bold mr-2 text-gray-800 ">{username}</span>
                    <span className="">{caption}</span>
                </div>
                {/* Comments */}
                {/* {comments.length > 0 && (
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
                )} */}

                {/* Input Box */}
                {/* <form className="flex items-center p-2 ">
                    <input
                        type="text"
                        ref={addComment}
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        placeholder="Add a Comment..."
                        className="border-none flex-1 focus:ring-0 outline-none bg-opacity-0 bg-white text-white" />
                    <button
                        disabled={!comment.trim()}
                        type='submit'
                        onClick={sendComment}
                        className="font-semibold text-[#336934] mr-3 hover:text-white">Post</button>
                </form> */}
            </div>
        </div>
    )
}


export default Post