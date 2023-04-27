import { SearchIcon } from "@heroicons/react/outline";

const Search = ({ search, setSearch }) => {

    return (
        <div className="mt-10 mb-5 w-3/4 md:w-1/3 flex flex-row items-center relative">
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
                            text-sm
                            text-center
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
            <SearchIcon className="absolute w-10 h-10 mx-2 p-2 text-slate-600" />
        </div>
    );
}

export default Search;