import { Gradient } from "../../constants/Gradients";
import Sidebar from "../Sidebar/Sidebar";
import Bottombar from "../Sidebar/Bottombar";
import { SearchIcon } from "@heroicons/react/solid";

function Search() {
  return (
    <>
      <Sidebar />
      <Bottombar />
      <div className={`${Gradient} flex lg:ml-64 md:ml-16 h-screen`}>
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-center w-full py-4 border-b-[1px] rounded-xl">
            <div className="w-auto min-w-[350px] relative flex items-center justify-center">
              <input
                type="text"
                className="rounded-full py-2 max-w-sm w-full shadow-sm outline-none pl-10"
              />
              <SearchIcon className="w-5 absolute left-3" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
