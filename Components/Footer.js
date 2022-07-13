import { PlusIcon } from "@heroicons/react/outline"
import { useRecoilState } from "recoil"
import { modalState } from "../atoms/modalAtom"

const Footer = () => {
    const [open, setOpen] = useRecoilState(modalState)
    return(
        <div className="flex flex-row items-center justify-center">
            <div onClick={() => setOpen(true)} className="py-5 px-12 shadow-sm border-b z-50 hover:bg-gray-50">
                <PlusIcon  className="h-7 cursor-pointer transition-all duration-150 ease-out text-[#336934]"/>
                <p className="m-0 p-0">New</p>
            </div>
        </div>
    )
}

export default Footer