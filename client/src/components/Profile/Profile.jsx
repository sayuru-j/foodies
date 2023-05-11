import { useState } from "react";
import { Gradient } from "../../constants/Gradients";
import Bottombar from "../Sidebar/Bottombar";
import Sidebar from "../Sidebar/Sidebar";
import { useEffect } from "react";
import NoContextMenuImage from "../../helpers/NoContextMenuImage";

import { CameraIcon } from "@heroicons/react/solid";
import { CogIcon, PhotographIcon } from "@heroicons/react/outline";
import axios from "axios";

function Profile() {
  const [loginDetails, setLoginDetails] = useState({});
  const [userDetails, setUserDetails] = useState({});

  const getUsers = async ({ user }) => {
    let username = user.username.toLowerCase().replace(/\s/g, "");
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/user/getUserByUsername/${username}`
      // `${import.meta.env.VITE_API_URL}/user/getUsers`
    );

    setUserDetails(response.data);
  };

  useEffect(() => {
    let loginDetails = localStorage.getItem("loginDetails"); //Accessing LocalStorage
    const accessToken = JSON.parse(loginDetails)?.accessToken;

    let userdata = JSON.parse(loginDetails);

    setLoginDetails(userdata);
    getUsers(userdata);
  }, []);

  return (
    <>
      <Sidebar />
      <Bottombar />
      <div className={`${Gradient} h-screen lg:ml-64 md:ml-16`}>
        <div className="grid grid-cols-3 px-10 py-6 min-h-[250px] border-b-2">
          <div className="flex items-start justify-end">
            <div className="flex md:items-start items-center justify-center">
              <NoContextMenuImage
                className="w-36 h-36 relative rounded-full object-cover hover:opacity-70 transition-opacity duration-200 ease-out cursor-pointer"
                src={loginDetails?.user?.avatar}
                alt=""
              />
              <CameraIcon className="w-8 absolute md:top-20 text-white opacity-80 cursor-pointer" />
            </div>
          </div>
          <div className="col-span-2 ml-6">
            <div className="flex flex-col min-h-[142px] justify-between">
              <div className="flex gap-2 items-end">
                <h1 className="font-medium">
                  {loginDetails?.user?.username
                    .toLowerCase()
                    .replace(/\s/g, "")}
                </h1>
                <a href="/settings">
                  <CogIcon className="w-5 cursor-pointer" />
                </a>
              </div>
              <div className="flex gap-8 items-center">
                <h1 className="text-sm">
                  <span className="font-medium">0</span> Posts
                </h1>
                <h1 className="text-sm">
                  <span className="font-medium">
                    {userDetails?.followers === null
                      ? "0"
                      : userDetails?.followers?.length}
                  </span>{" "}
                  Followers
                </h1>
                <h1 className="text-sm">
                  <span className="font-medium">
                    {userDetails?.following === null
                      ? "0"
                      : userDetails?.following?.length}
                  </span>{" "}
                  Following
                </h1>
              </div>
              <div className="flex flex-col">
                <h1 className="text-sm font-medium">
                  {loginDetails?.user?.fullname}
                </h1>
                <p className="text-sm font-thin">{loginDetails?.user?.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center gap-2 pt-40">
          <PhotographIcon className="w-20 opacity-70" />
          <h1 className="text-[20px] font-bold">Share photos</h1>
          <a href="/addpost">
            <button
              type="button"
              className="bg-blue-500 rounded-md px-4 text-sm font-medium text-white"
            >
              Click to upload
            </button>
          </a>
        </div>
      </div>
    </>
  );
}

export default Profile;
