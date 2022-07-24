import Head from 'next/head'
import Header from "../Components/Header"
import Loading from '../Components/Loading'
import ReactPlayer from 'react-player/lazy'
import { useEffect, useState } from 'react'
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
        setValid(false)
        setPrompt(false)
        if(url === ''){
            setValid(true)
        }
        else if(urlPatternValidation(url)){
            setValid(true)
        }
        else {
            setValid(false)
        }
    }, [url])


    const urlPatternValidation = URL => {
        const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')  
        return regex.test(URL)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addNewRandom()
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
            if(!urlPatternValidation(url)) return
            setPrompt(true)
        }

        
        
        setLoading(false)

    }

    if (status === "loading") {
        return <Loading />
    }

    return (
        <div className='bg-white min-h-screen'>
            <Header />
            <Head>
                <title>Random | PCHA</title>
                <link rel="icon" href="/floral.ico" />
            </Head>

            <div className="flex flex-col justify-center pb-1 pt-2 px-1 md:px-40 lg:px-96">
                {contents.map(content => (
                    windowObj &&
                    <div className='mb-10' key={content.id}>
                        <div><ReactPlayer url={content.data().url} controls={true} width='100%' light={true}/></div>
                        <div className="flex justify-end">
                            <Link href={`/profile/${content?.data().username}`}><span className="font-bold mr-2 text-gray-400 hover:cursor-pointer text-sm mt-4">shared by {content.data().username}</span></Link>
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
                            ring-[#e4da30] ring-inset ring-1
                            block
                            w-full
                            h-14
                           
                            py-1.5
                            text-base
                            bg-white
                            pl-5
                            bg-opacity-10 backdrop-blur-lg rounded-full drop-shadow-lg
                            transition
                            ease-in-out
                            m-0
                            focus:border-[#a3d2a0]
                            focus:outline-0 focus:ring-0
                        "
                        placeholder="URL"
                        required
                        />
                        <button type='submit' className='rounded-full inset-y-0 absolute z-10 bg-[#C4D668] flex items-center px-3 m-1 justify-self-end shadow shadow-[white] ml-4 hover:scale-105'>
                            <UploadIcon className='w-6 h-6 text-white'/>
                        </button>
                    </form>
                    
                </div>
                
            </div>

        </div>
    )
}

export default Random
