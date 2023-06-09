import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

import NoContextMenuImage from "../../helpers/NoContextMenuImage";
import { GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router-dom";

function MiniProfile() {
  const [users, setUsers] = useState([]);
  const [loginDetails, setLoginDetails] = useState({});
  const [followStatus, setFollowStatus] = useState(false);

  const navigate = useNavigate();

  const onLogoutSuccess = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    let loginDetails = JSON.parse(localStorage.getItem("loginDetails"));

    setLoginDetails(loginDetails);

    const getUsers = async () => {
      const response = await axios(
        "http://localhost:8080/api/v1/user/getUsers"
      );

      // Removing the current user from suggestions
      const CurrentUserIndex = response.data.findIndex(
        (user) => user.userid === loginDetails?.user?.userid
      );

      if (CurrentUserIndex >= 0) {
        const removedData = response.data[CurrentUserIndex];
        const filteredData = response.data.filter(
          (user) => user.userid !== removedData.userid
        );

        // Removing already followed users from suggsestions
        const nonFollowedUsers = filteredData.filter(
          (user) => !user.followers.includes(loginDetails?.user?.userid)
        );
        setUsers(nonFollowedUsers);
      }
    };

    getUsers();
  }, [followStatus]);

  const handleFollow = async (userid) => {
    const followResponse = await axios.post(`
    ${import.meta.env.VITE_API_URL}/user/followUser?uuid=${
      loginDetails?.user?.userid
    }&userId=${userid}
    `);

    setFollowStatus(followResponse?.data && true);

    // console.log(followResponse);
  };

  // console.log(users);

  return (
    <div className="max-w-sm h-[600px] w-full flex flex-col gap-2">
      <div className="flex items-center justify-between px-2 py-5 border-b-[1px] shadow-sm rounded-lg">
        <div className="flex items-center gap-2">
          <a href="/profile/my">
            <NoContextMenuImage
              className="w-12 h-12 rounded-full object-cover border-[2px] p-[2px]"
              src={loginDetails?.user?.avatar}
              alt=""
            />
          </a>

          <div className="flex flex-col justify-center">
            <a href="/profile/my">
              <h1 className="font-semibold text-sm">
                {loginDetails?.user?.username.toLowerCase().replace(/\s/g, "")}
              </h1>
            </a>

            <p className="text-sm">{loginDetails?.user?.fullname}</p>
          </div>
        </div>
        <GoogleLogout
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              className="text-sm font-medium"
            >
              Log Out
            </button>
          )}
          clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
          onLogoutSuccess={onLogoutSuccess}
        />
      </div>

      <div className="px-2 flex flex-col rounded-lg">
        <h1 className="font-bold text-black/80">Suggestions for you</h1>
        {users.map((user) => (
          <div
            className="flex py-1 px-1 items-center justify-between"
            key={user.userid}
          >
            <div className="flex items-center justify-center gap-2">
              <a
                href={`/profile/${user.userid}/${user.username}`}
                className="flex items-center justify-center gap-2"
              >
                <NoContextMenuImage
                  className="w-8 h-8 object-cover rounded-full cursor-pointer"
                  src={user.avatar}
                  alt=""
                />
                <div className="flex flex-col justify-center">
                  <h1 className="text-sm font-medium cursor-pointer">
                    {user.username}
                  </h1>
                  <p className="text-xs font-thin cursor-pointer">
                    {user.city}
                  </p>
                </div>
              </a>
            </div>
            <button
              onClick={handleFollow.bind(null, parseInt(user.userid))}
              className="font-medium text-xs"
              type="button"
            >
              Follow
            </button>
          </div>
        ))}
      </div>

      <div className="flex px-2 gap-2 text-xs font-thin border-t-[0.5px] border-black/5 py-2">
        <h1>Bad Bytes</h1>
        <p>|</p>
        <h1>Foodies</h1>
        <p>|</p>
        <h1>2023</h1>
      </div>
    </div>
  );
}

export default MiniProfile;
