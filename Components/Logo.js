import Image from "next/future/image"

const Logo = () => {
    return (
    <div className="flex justify-center text-3xl font-bold mb-8 text-black tracking-widest">
        {/* <Image src="/floral.ico" width={30} height={30} className="mr-4"/> */}
        <span className="text-black">P</span>CHA
    </div>
    )
}

export default Logo