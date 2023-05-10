import {
  DotsHorizontalIcon,
  HeartIcon,
  ChatIcon,
  PaperAirplaneIcon,
  BookmarkIcon,
  EyeOffIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import NoContextMenuImage from "../../helpers/NoContextMenuImage";
import PostItem from "./PostItem";

function Post() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loginDetails, setLoginDetails] = useState("");

  useEffect(() => {
    let loginDetails = JSON.parse(localStorage.getItem("loginDetails"));

    setLoginDetails(loginDetails);
  }, []);

  const getPosts = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/post/getPosts`
    );

    setPosts(response?.data);
  };

  const getUsers = async () => {
    const response = await axios(
      `${import.meta.env.VITE_API_URL}/user/getUsers`
    );

    setUsers(response?.data);
  };

  useEffect(() => {
    getPosts();
    getUsers();
  }, []);

  console.log(posts);

  return (
    <div className="flex flex-col gap-10">
      {posts.map((post) => (
        <PostItem
          key={post.postid}
          {...post}
          uuid={loginDetails.user.userid}
          avatar={loginDetails.user.avatar}
          username={loginDetails.user.username}
        />
      ))}
    </div>
  );
}

export default Post;
