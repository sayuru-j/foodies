import { faker } from "@faker-js/faker";
import axios from "axios";
import { useEffect, useState } from "react";

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

  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await axios("http://localhost:8080/api/v1/user/getUsers");
    setUsers(response?.data);
  };

  useEffect(() => {
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
            <div className="bg-gradient-to-r from-orange-500 via-primary/50 to-secondary rounded-full p-[2px]">
              <img
                className="rounded-full w-12 h-12 object-cover border-2"
                src={story.avatar}
                alt=""
              />
            </div>
            <p className="text-sm font-medium truncate">{story.username}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Stories;
