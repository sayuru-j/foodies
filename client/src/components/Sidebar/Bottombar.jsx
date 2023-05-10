import {
  CameraIcon,
  HomeIcon,
  BellIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import NoContextMenuImage from "../../helpers/NoContextMenuImage";
import { useState } from "react";
import { useEffect } from "react";

function Bottombar() {
  const [loginDetails, setLoginDetails] = useState([]);

  useEffect(() => {
    let loginDetails = localStorage.getItem("loginDetails");
    const accessToken = JSON.parse(loginDetails)?.accessToken;

    setLoginDetails(JSON.parse(loginDetails));
  }, []);
  return (
    <div className="fixed w-full md:hidden bg-white flex bottom-0 z-50 py-2 items-center justify-between border-t-[1px] shadow-sm px-10">
      <div className="flex gap-2 lg:justify-normal justify-center items-center hover:bg-slate-200 rounded-md p-2">
        <HomeIcon className="w-7" />
      </div>
      <div className="flex gap-2 lg:justify-normal justify-center items-center hover:bg-slate-200 rounded-md p-2">
        <SearchIcon className="w-7" />
      </div>
      <div className="flex gap-2 lg:justify-normal justify-center items-center hover:bg-slate-200 rounded-md p-2">
        <CameraIcon className="w-7" />
      </div>
      <div className="flex gap-2 lg:justify-normal justify-center items-center hover:bg-slate-200 rounded-md p-2">
        <BellIcon className="w-7" />
      </div>

      <div className="flex gap-2 lg:justify-normal justify-center items-center hover:bg-slate-200 rounded-md p-2">
        <NoContextMenuImage
          className="w-7 h-7 object-cover rounded-full"
          src={loginDetails?.user?.avatar}
          alt=""
        />
      </div>
    </div>
  );
}

export default Bottombar;
