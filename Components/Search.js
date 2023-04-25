

const Search = ({ search, setSearch }) => {

    return (
        <div className="">
            <input
                type="text"
                placeholder="Search..."
                value={search}
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
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    );
}

export default Search;