import Head from 'next/head'
import Header from "../Components/Header"
import Loading from '../Components/Loading'
import ReactPlayer from 'react-player/lazy'
import { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { db } from '../firebase'
import { collection, onSnapshot, orderBy, query, addDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import Link from 'next/link'
import { UploadIcon } from '@heroicons/react/solid'




function Random () {

    const { data: session, status} = useSession()
    const [contents, setContents ] = useState([])
    const [url, setUrl] = useState('')
    const [valid, setValid] = useState(true)
    const [prompt, setPrompt] = useState(false)
    const [loading, setLoading] = useState(false)
    const [windowObj, setWindowObj] = useState(false);


    // solves for dynamic imports issue when dealing with React Player in NextJS
    useEffect(() => {
        if (typeof window !== "undefined") setWindowObj(true);
    }, []);

    useEffect(() =>
    {
        
        return onSnapshot(
            query(
                collection(db, "random"),
                orderBy('timestamp', 'desc')
            ),
            snapshot => {setContents(snapshot.docs)}
        )
    }, [db])

    
    useEffect(() => {
        setLoading(false)
        setValid(true)
        setPrompt(false)
    }, [url])


    const urlPatternValidation = URL => {
        const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')  
        return regex.test(URL)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addNewRandom()
        e.target.reset();
    }

    
    // Add a shared post to firebase
    const addNewRandom = async() => {
        if(loading) return

        setLoading(true)

        if(urlPatternValidation(url) & ReactPlayer.canPlay(url)){
            const docRef = await addDoc(collection(db, "random"), {
                url: url,
                username: session.user.username,
                timestamp: serverTimestamp()
            })
            
        }

        else {
            if(!urlPatternValidation(url)) {
                setValid(false)
                setLoading(false)
                return
            }
            setPrompt(true)
        }

        
        
        setLoading(false)

    }

    if (status === "loading") {
        return <Loading />
    }

    return (
        <div className='bg-white text-black'>
            <Header />
            <Head>
                <title>Random | PCHA</title>
                <link rel="icon" href="/floral.ico" />
            </Head>

            <div className="flex flex-col justify-center pb-1 pt-2 px-2 md:px-40 lg:px-96">
                {contents.map(content => (
                    windowObj &&
                    <div className='mb-10 ' key={content.id}>
                        <div><ReactPlayer url={content.data().url} controls={true} width='100%' light={true}/></div>
                        <div className="flex justify-end px-2">
                            <Link href={`/profile/${content?.data().username}`}><span className="font-bold mr-2 text-gray-400 hover:cursor-pointer text-sm mt-4">shared by <span className='text-gray-500'>{content.data().username}</span></span></Link>
                            {/* <div className="text-sm text-gray-800 font-bold">{timestamp?.toDate().toLocaleDateString()}</div> */}
                        </div>

                    </div>
                    
                ))}
                
                
            </div>

            <div className="flex flex-col justify-center mb-16 mx-2 ">
                <div className="mb-20 h-20 md:px-40 lg:px-96">
                    {!valid &&
                        <div className='flex px-10 py-3 mb-5 rounded bg-lime-50 tracking-wide text-slate-500'>
                             Example URL: https://www.youtube.com/watch?v=JAfPL7ZrYo8
                        </div>
                    }
                    {prompt &&
                        <div className='flex px-10 py-3 mb-5 rounded bg-lime-50 tracking-wide text-slate-500'>
                            We currently only support content from YouTube, Facebook, Twitch, SoundCloud, Streamable, Vimeo, Wistia, Mixcloud and DailyMotion
                        </div>
                    }
                    <form className='relative flex justify-end' onSubmit={handleSubmit}>
                        
                        <input
                        
                        onChange={(e) => setUrl(e.target.value)}
                        type="text"
                        className="
                            outline-0
                            ring-[#adda89] ring-inset ring-1
                            block
                            w-full
                            h-14
                           
                            py-1.5
                            text-base
                           
                            pl-5
                            rounded-full
                            bg-white bg-opacity-5 backdrop-blur-lg drop-shadow-lg
                            transition
                            ease-in-out
                            m-0
                            focus:border-[#a3d2a0]
                            focus:outline-0 focus:ring-0
                        "
                        placeholder="URL"
                        required
                        />
                        <button type='submit' className='rounded-full inset-y-0 absolute  bg-gradient-to-r from-[#adda89] to-[#8dd7d3] flex items-center px-2 m-2 justify-self-end shadow shadow-[white] ml-4 hover:scale-105'>
                            {!loading ? <UploadIcon className='w-6 h-6 text-white'/> :
                            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-black fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>}
                        </button>
                    </form>
                    
                </div>
                
            </div>

        </div>
    )
}

export default Random
