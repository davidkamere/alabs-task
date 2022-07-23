import { PlusIcon } from "@heroicons/react/outline"
import { useRecoilState } from "recoil"
import { modalState } from "../atoms/modalAtom"

const Footer = () => {
    const [open, setOpen] = useRecoilState(modalState)
    return(
        <div className="flex flex-col items-center justify-center ">
            <div onClick={() => setOpen(true)} className="pt-5 px-12 z-50 ">
                <PlusIcon  className="h-7 cursor-pointer transition-all duration-150 ease-out text-[#9ea659]"/>
                
            </div>
            <p className="mb-1.5 p-0 font-bold">New</p>
        </div>
    )
}

export default Footer