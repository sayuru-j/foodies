import {
  CameraIcon,
  HomeIcon,
  BellIcon,
  SearchIcon,
  MenuIcon,
  LogoutIcon,
  CogIcon,
} from "@heroicons/react/outline";
import logo from "../../assets/foodies-logo-text.png";
import logoText from "../../assets/foodies-logo.png";
import { useState } from "react";
import NoContextMenuImage from "../../helpers/NoContextMenuImage";
import { GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Sidebar() {
  const [toggle, setToggle] = useState(false);
  const [loginDetails, setLoginDetails] = useState([]);

  useEffect(() => {
    let loginDetails = localStorage.getItem("loginDetails");
    const accessToken = JSON.parse(loginDetails)?.accessToken;

    setLoginDetails(JSON.parse(loginDetails));
  }, []);

  const navigate = useNavigate();

  const onLogoutSuccess = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <div className="fixed left-0 z-40 md:flex hidden bg-white flex-col px-2 py-2 justify-between h-screen lg:w-64 md:w-16 border-r-[1px] border-slate-950/5 transition-all duration-500 ease-out ">
        <div className="flex flex-col justify-center gap-14">
          <a href="/">
            <div className="p-2 lg:block hidden" id="top">
              <NoContextMenuImage className="w-44" src={logo} alt="" />
            </div>
            <div className="p-2 md:block lg:hidden hidden" id="top">
              <NoContextMenuImage className="w-full" src={logoText} alt="" />
            </div>
          </a>

          <div id="mid" className="flex flex-col gap-3 h-[88vh]">
            <a href="/">
              <div className="flex justify-center items-center hover:bg-accent/30 rounded-md p-2 lg:hover:p-4 transition-all duration-100 ease-out">
                <div className="flex items-center justify-center cursor-pointer gap-2 lg:justify-normal w-full">
                  <HomeIcon className="w-6" />
                  <h1 className="font-medium lg:block hidden">Home</h1>
                </div>
              </div>
            </a>
            <a href="/search">
              <div className="flex justify-center items-center hover:bg-accent/30 rounded-md p-2 lg:hover:p-4 transition-all duration-100 ease-out">
                <div className="flex items-center justify-center cursor-pointer gap-2 lg:justify-normal w-full">
                  <SearchIcon className="w-6" />
                  <h1 className="font-medium lg:block hidden">Search</h1>
                </div>
              </div>
            </a>
            <a href="/notification">
              <div className="flex justify-center items-center hover:bg-accent/30 rounded-md p-2 lg:hover:p-4 transition-all duration-100 ease-out">
                <div className="flex items-center justify-center cursor-pointer gap-2 lg:justify-normal w-full">
                  <BellIcon className="w-6" />
                  <h1 className="font-medium lg:block hidden">Notification</h1>
                </div>
              </div>
            </a>
            <a href="/addpost">
              <div className="flex justify-center items-center hover:bg-accent/30 rounded-md p-2 lg:hover:p-4 transition-all duration-100 ease-out">
                <div className="flex items-center justify-center cursor-pointer gap-2 lg:justify-normal w-full">
                  <CameraIcon className="w-6" />
                  <h1 className="font-medium lg:block hidden">Post</h1>
                </div>
              </div>
            </a>

            <a href="/profile/my">
              <div className="flex justify-center items-center hover:bg-accent/30 rounded-md p-2 lg:hover:p-4 transition-all duration-100 ease-out">
                <div className="flex items-center justify-center cursor-pointer gap-2 lg:justify-normal w-full">
                  <NoContextMenuImage
                    onContextMenu={(e) => e.preventDefault()}
                    className="w-7 h-7 rounded-full object-cover"
                    src={loginDetails?.user?.avatar}
                    alt=""
                  />
                  <h1 className="font-medium lg:block hidden">Profile</h1>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div
          id="bottom"
          className="max-h-16 relative h-full flex items-center "
        >
          <div
            onClick={() => setToggle(!toggle)}
            className="flex cursor-pointer lg:justify-normal justify-center gap-2 absolute left-0 bottom-6 items-center w-full hover:bg-accent/30 rounded-md p-2"
          >
            <MenuIcon className="w-6" />
            <h1 className="font-medium lg:block hidden">More</h1>
          </div>
          <div
            id="toggle"
            className={`${
              toggle ? "" : "hidden"
            } flex flex-col fixed left-2 lg:bottom-14 md:bottom-20 max-w-xs w-full bg-slate-200 rounded-md`}
          >
            <div className="flex gap-2 cursor-pointer lg:justify-normal justify-center items-center w-full hover:bg-accent/30 p-2 px-4 rounded-t-md">
              <CogIcon className="w-5" />
              <h1 className="font-medium lg:block hidden">Settings</h1>
            </div>

            <GoogleLogout
              render={(renderProps) => (
                <div
                  onClick={renderProps.onClick}
                  className="flex gap-2 cursor-pointer lg:justify-normal justify-center items-center w-full hover:bg-accent/30 p-2 px-4 rounded-b-md"
                >
                  <LogoutIcon className="w-5" />
                  <h1 className="font-medium lg:block hidden">Log Out</h1>
                </div>
              )}
              clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
              onLogoutSuccess={onLogoutSuccess}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
