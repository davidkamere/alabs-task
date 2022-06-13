import { PlusIcon } from "@heroicons/react/outline"
import { useRecoilState } from "recoil"
import { modalState } from "../atoms/modalAtom"

const Footer = () => {
    const [open, setOpen] = useRecoilState(modalState)
    return(
        <div className="flex items-center justify-center">
            <div className="py-5 px-12 shadow-sm border-b bg-white sticky bottom-0 z-50">
                <PlusIcon onClick={() => setOpen(true)} className="h-7 hove:scale-125 curor-pointer transition-all duration-150 ease-out"/>
            </div>
        </div>
    )
}

export default Footer