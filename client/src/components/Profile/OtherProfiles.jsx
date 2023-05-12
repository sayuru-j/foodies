import { useState } from "react";
import { Gradient } from "../../constants/Gradients";
import Bottombar from "../Sidebar/Bottombar";
import Sidebar from "../Sidebar/Sidebar";
import { useEffect } from "react";
import NoContextMenuImage from "../../helpers/NoContextMenuImage";

import { CameraIcon } from "@heroicons/react/solid";
import { CogIcon, PhotographIcon } from "@heroicons/react/outline";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function OtherProfiles() {
  const [loginDetails, setLoginDetails] = useState({});
  const [userDetails, setUserDetails] = useState({
    userid: "",
    username: "",
    email: "",
    fullname: "",
    city: "",
    followers: [],
    following: [],
  });
  const [followStatus, setFollowStatus] = useState(false);
  const urlParams = useParams({});
  const navigate = useNavigate();

  const getUsers = async ({ userid }) => {
    let username = urlParams.username;
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/user/getUserByUsername/${username}`
      // `${import.meta.env.VITE_API_URL}/user/getUsers`
    );

    setFollowStatus(response.data.followers.includes(userid) && true); // If current user follow selected user sets followStatus to true
    setUserDetails(response.data.userid === userid ? {} : response.data);

    //Navigate to own profile if current user is selected user
    if (userid === response.data.userid) {
      navigate("/profile/my");
    }
  };

  useEffect(() => {
    let loginDetails = localStorage.getItem("loginDetails"); //Accessing LocalStorage
    const accessToken = JSON.parse(loginDetails)?.accessToken;

    let userdata = JSON.parse(loginDetails); // Parsing stringified data to JSON

    setLoginDetails(userdata);

    getUsers(userdata.user); // Passing current userdata as props
  }, []);

  const handleFollow = async () => {
    const followResponse = await axios.post(`
    ${import.meta.env.VITE_API_URL}/user/followUser?uuid=${
      loginDetails?.user?.userid
    }&userId=${userDetails?.userid}
    `);

    setFollowStatus(followResponse?.data && true);

    // console.log(followResponse);
  };
  const handleUnfollow = async () => {
    const unfollowResponse = await axios.post(`
    ${import.meta.env.VITE_API_URL}/user/unfollowUser?uuid=${
      loginDetails?.user?.userid
    }&userId=${userDetails?.userid}
    `);

    setFollowStatus(!unfollowResponse?.data && false);
  };

  return (
    <>
      <Sidebar />
      <Bottombar />
      <div className={`${Gradient} h-screen lg:ml-64 md:ml-16`}>
        <div className="grid grid-cols-3 px-10 py-6 min-h-[250px] border-b-2">
          <div className="flex items-start justify-end">
            <div className="flex md:items-start items-center justify-center">
              <NoContextMenuImage
                className="w-36 h-36 relative rounded-full object-cover"
                src={userDetails?.avatar}
                alt=""
              />
            </div>
          </div>
          <div className="col-span-2 ml-6">
            <div className="flex flex-col min-h-[142px] justify-between">
              <div className="flex items-center gap-2 relative">
                <h1 className="font-medium">{userDetails?.username}</h1>
                {followStatus ? (
                  <div className="">
                    <button
                      onClick={handleUnfollow}
                      type="button"
                      className="bg-blue-500 absolute top-[6px] z-10 text-white font-medium px-4 rounded-full hover:opacity-0 transition-all duration-[50ms] ease-out text-xs"
                    >
                      Following
                    </button>
                    <button
                      onClick={handleUnfollow}
                      type="button"
                      className="bg-secondary/50 absolute top-[6px] z-0 text-white font-medium px-4 rounded-full text-xs"
                    >
                      Unfollow
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={handleFollow}
                      type="button"
                      className="bg-blue-500 absolute top-[6px] z-10 text-white font-medium px-4 rounded-full text-xs"
                    >
                      Follow
                    </button>
                  </div>
                )}
              </div>
              <div className="flex gap-8 items-center">
                <h1 className="text-sm">
                  <span className="font-medium">0</span> Posts
                </h1>
                <h1 className="text-sm">
                  <span className="font-medium">
                    {userDetails?.followers?.length}
                  </span>{" "}
                  Followers
                </h1>
                <h1 className="text-sm">
                  <span className="font-medium">
                    {userDetails?.following?.length}
                  </span>{" "}
                  Following
                </h1>
              </div>
              <div className="flex flex-col">
                <h1 className="text-sm font-medium">
                  {userDetails?.fullname
                    ? userDetails?.fullname
                    : userDetails?.username?.toLocaleUpperCase()}
                </h1>
                <p className="text-sm font-thin">{userDetails?.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center gap-2 pt-40">
          <PhotographIcon className="w-20 opacity-70" />
          <h1 className="text-[20px] font-bold">
            Photos of {userDetails?.fullname}
          </h1>
        </div>
      </div>
    </>
  );
}

export default OtherProfiles;
