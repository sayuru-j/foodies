import {
  CameraIcon,
  HomeIcon,
  BellIcon,
  SearchIcon,
} from "@heroicons/react/solid";

function Bottombar() {
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
        <img
          className="w-7 h-7 object-cover rounded-full"
          src="https://cdn.flipit.money/img/flips/zwEI9FB1xgPmEOHw024FoLglDcQRMuMQm6vUu3TN.jpg"
          alt=""
        />
      </div>
    </div>
  );
}

export default Bottombar;
