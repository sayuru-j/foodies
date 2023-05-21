import { useState } from "react";
import { Gradient } from "../../constants/Gradients";
import Bottombar from "../Sidebar/Bottombar";
import Sidebar from "../Sidebar/Sidebar";
import { useEffect } from "react";
import NoContextMenuImage from "../../helpers/NoContextMenuImage";

import { CameraIcon } from "@heroicons/react/solid";
import { CogIcon, PhotographIcon, PlusIcon } from "@heroicons/react/outline";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import PostItemProfile from "../Profile/PostItemProfile";

function OtherProfiles() {
  const [loginDetails, setLoginDetails] = useState({});
  const [userDetails, setUserDetails] = useState({
    userid: "",
    username: "",
    email: "",
    fullname: "",
    city: "",
    bio: "",
    followers: [],
    following: [],
  });
  const [followStatus, setFollowStatus] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const urlParams = useParams({});
  const navigate = useNavigate();
  const [postIsOpened, setPostIsOpened] = useState(false);
  const [postId, setPostId] = useState(0);

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

  const getPosts = async () => {
    let userid = parseInt(urlParams.id);
    const responsePosts = await axios.get(
      `${import.meta.env.VITE_API_URL}/post/getPosts`
    );

    const filterPosts = responsePosts?.data?.filter(
      (post) => post.userid === userid
    );

    setUserPosts(filterPosts);
  };

  useEffect(() => {
    let loginDetails = localStorage.getItem("loginDetails"); //Accessing LocalStorage
    const accessToken = JSON.parse(loginDetails)?.accessToken;

    let userdata = JSON.parse(loginDetails); // Parsing stringified data to JSON

    setLoginDetails(userdata);

    getUsers(userdata.user); // Passing current userdata as props
    getPosts();
  }, [followStatus]);

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
                     // onClick={handleUnfollow} 
                      onClick={ handleUnfollow }
                      type="button"
                      className="bg-blue-500 absolute top-[6px] z-10 text-white font-medium px-4 rounded-full hover:opacity-0 transition-all duration-[50ms] ease-out text-xs"
                    >
                      Following
                    </button>
                    <button
                     // onClick={handleUnfollow}
                     onClick={ handleUnfollow }
                      type="button"
                      className="bg-secondary/50 absolute top-[6px] z-0 text-white font-medium px-4 rounded-full text-xs"
                    >
                      Unfollow
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      //onClick={handleFollow}
                      onClick={ handleFollow }
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
                  <span className="font-medium">{userPosts?.length}</span> Posts
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
                <p className="text-sm font-thin">{userDetails?.bio}</p>
              </div>
            </div>
          </div>
        </div>

        {!userPosts && (
          <div className="w-full flex flex-col items-center justify-center gap-2 pt-40">
            <PhotographIcon className="w-20 opacity-70" />
            <h1 className="text-[20px] font-bold">
              Photos of {userDetails?.fullname}
            </h1>
          </div>
        )}
        {userPosts && (
          <div className="flex justify-center p-2">
            <div className="flex flex-wrap w-full md:justify-start justify-center md:max-w-3xl gap-3">
              {userPosts.map((post) => (
                <div
                  onClick={() => {
                    setPostIsOpened(!postIsOpened);
                    setPostId(post.postid);
                  }}
                  key={post.postid}
                >
                  <NoContextMenuImage
                    className="w-32 h-32 object-cover rounded-xl shadow-sm hover:opacity-80 hover:cursor-pointer"
                    src={post.photo}
                    alt={post.postid}
                  />
                </div>
              ))}
            </div>

            {postIsOpened && (
              <>
                <div
                  onClick={() => setPostIsOpened(!postIsOpened)}
                  className="h-screen bg-black fixed left-0 top-0 opacity-80 z-40 w-full flex"
                >
                  <PlusIcon
                    onClick={() => setPostIsOpened(!postIsOpened)}
                    className="w-8 text-white fixed right-2 top-2 rotate-45 cursor-pointer"
                  />
                </div>
                <div className="grid grid-cols-2 fixed z-50 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white shadow-sm w-full max-w-[120vh] rounded-sm">
                  <div className="relative">
                    <NoContextMenuImage
                      className="rounded-sm object-contain h-full"
                      src={
                        userPosts.find((post) => post.postid === postId).photo
                      }
                      alt=""
                    />
                  </div>
                  <div>
                    <PostItemProfile
                      uuid={loginDetails.user.userid}
                      avatar={loginDetails.user.avatar}
                      username={loginDetails.user.username}
                      {...userPosts.find((post) => post.postid === postId)}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default OtherProfiles;
