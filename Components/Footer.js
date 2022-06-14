import { PlusIcon } from "@heroicons/react/outline"
import { useRecoilState } from "recoil"
import { modalState } from "../atoms/modalAtom"

const Footer = () => {
    const [open, setOpen] = useRecoilState(modalState)
    return(
        <div className="flex flex-row items-center justify-center">
            <div onClick={() => setOpen(true)} className="py-5 px-12 shadow-sm border-b bg-white z-50 hover:bg-gray-200">
                <PlusIcon  className="h-7 hove:scale-125 curor-pointer transition-all duration-150 ease-out text-black"/>
                <p className="m-0">Post</p>
            </div>
        </div>
    )
}

export default Footer