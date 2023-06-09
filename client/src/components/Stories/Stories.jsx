import { faker } from "@faker-js/faker";
import axios from "axios";
import { useEffect, useState } from "react";
import NoContextMenuImage from "../../helpers/NoContextMenuImage";

function Stories() {
  // const [suggestions, setSuggestions] = useState([]);
  // useEffect(() => {
  //   const suggestions = [...Array(20)].map((_, i) => ({
  //     username: faker.internet.userName(),
  //     avatar: faker.internet.avatar(),
  //   }));
  //   setSuggestions(suggestions);
  // }, []);

  // //   console.log(suggestions);
  const [loginDetails, setLoginDetails] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let loginDetails = JSON.parse(localStorage.getItem("loginDetails"));

    setLoginDetails(loginDetails);

    const getUsers = async () => {
      const response = await axios.get(
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
        const FollowedUsers = filteredData.filter((user) =>
          user.followers.includes(loginDetails?.user?.userid)
        );
        setUsers(FollowedUsers);
      }
    };

    getUsers();
  }, []);

  return (
    <div className="flex items-center overflow-auto border-b-[1px] shadow-sm w-full max-w-2xl mx-auto p-4 scrollbar-thin scrollbar-thumb-black/70 scrollbar-track-black/10 rounded-lg gap-7">
      {users.map((story) => (
        <div
          className="flex flex-col items-center justify-between"
          key={story.userid}
        >
          <div className="flex flex-col items-center justify-center">
            <a href={`/profile/${story.userid}/${story.username}`}>
              <div className="bg-gradient-to-r from-orange-500 via-primary/50 to-secondary rounded-full p-[2px]">
                <NoContextMenuImage
                  onContextMenu={(e) => e.preventDefault()}
                  className="rounded-full w-12 h-12 object-cover border-2"
                  src={story.avatar}
                  alt=""
                />
              </div>
            </a>

            <p className="text-sm font-medium w-14 text-center truncate">
              {story.username}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Stories;
