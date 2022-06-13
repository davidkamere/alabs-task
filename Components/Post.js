import {
    ChatIcon,
    HeartIcon,
} from "@heroicons/react/outline"

import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid"


// component for a single post
const Post = ({id, username, img, caption}) => {
    return (
        <div className="bg-white my-7 border rounded-sm">
           
            
            {/* img */}
            <img src={img} className="object-cover h-68 w-96" alt=""/>
            {/* Buttons */}
            <div className="flex space-x-4 px-4 pt-4">
                <HeartIcon className="h-7 hove:scale-125 curor-pointer transition-all duration-150 ease-out"/>
                <ChatIcon className="h-7 hove:scale-125 curor-pointer transition-all duration-150 ease-out"/>
            </div>
            {/* Caption */}
            <p className="p-5 truncate">
                <span className="font-bold mr-2 text-gray-800">{username}</span>
                {caption}
            </p>
            {/* Comments */}
            {/* Input Box */}
            <form className="flex items-center p-2">
                <input type="text" placeholder="Add a comment..." className="border-none flex-1 focus:ring-0 outline-none"/>
                <button className="font-semibold text-blue-400">Post</button>
            </form>
        </div>
    )
}


export default Post