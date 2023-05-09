import React, { useEffect, useState } from "react";
import { SearchIcon, XIcon } from "@heroicons/react/outline";

function Search({ className }) {
  const [closeToggle, setCloseToggle] = useState(false);

  return (
    <div
      className={`${className} ${
        closeToggle ? "hidden" : ""
      } flex items-center justify-center fixed top-0 z-50 bg-white w-full border-b-2 rounded-b-2xl py-4`}
    >
      <div className="flex relative max-w-md w-full items-center justify-center">
        <input
          className="bg-slate-100 max-w-lg w-full rounded-full py-2 shadow-sm pl-14"
          type="text"
        />
        <SearchIcon className="w-6 absolute left-4" />
        <button
          type="button"
          className="absolute bg-primary/80 text-white font-medium h-full px-4 right-0 rounded-r-full"
        >
          Search
        </button>
      </div>
      <XIcon
        onClick={() => setCloseToggle(!closeToggle)}
        className="w-5 absolute right-5 hover:scale-125 hover:cursor-pointer transition-all duration-100 ease-out"
      />
    </div>
  );
}

export default Search;
