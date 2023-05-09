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

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function Post() {
  const [posts, setPosts] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [optionIsToggled, setOptionIsToggled] = useState(false);

  const getPosts = async () => {
    const response = await axios("http://localhost:8080/api/v1/post/getPosts");

    setPosts(response?.data);
  };

  useEffect(() => {
    getPosts();
  }, [isDeleted]);

  const handleDelete = async (postid) => {
    const response = await axios.delete(
      `http://localhost:8080/api/v1/post/deletePost/${postid}`
    );

    setIsDeleted(response?.data && true);
    setOptionIsToggled(false);
  };

  return (
    <>
      {posts.map((post) => (
        <div
          key={post.postid}
          className="max-w-2xl w-full py-2 rounded-xl shadow-sm border-t-[1px] border-b-[1px] justify-center mx-auto"
        >
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center justify-center gap-2">
              <NoContextMenuImage
                className="w-8 h-8 rounded-full object-cover"
                src={post.avatar}
                alt="avatar"
              />
              <div className="flex flex-col">
                <h1 className="font-semibold text-sm">{post.username}</h1>
                <p className="text-xs">{dayjs(post.created).fromNow()}</p>
              </div>
            </div>
            {!optionIsToggled ? (
              <DotsHorizontalIcon
                onClick={() => setOptionIsToggled(!optionIsToggled)}
                className="w-5 cursor-pointer"
              />
            ) : (
              <div className="flex gap-3">
                <EyeOffIcon
                  onClick={() => setOptionIsToggled(!optionIsToggled)}
                  className="w-4 cursor-pointer text-primary/50 hover:text-primary"
                />
                <button
                  className="text-sm font-medium text-primary/50 hover:text-primary"
                  type="button"
                >
                  Report
                </button>
                <button
                  onClick={handleDelete.bind(null, parseInt(post.postid))}
                  className="text-sm font-medium text-secondary/50 hover:text-secondary"
                  type="button"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
          <div className="py-2 px-2">
            <NoContextMenuImage
              className="w-full rounded-xl object-cover"
              src={post.photo}
              alt="Not Found 404"
            />
          </div>
          <div className="flex items-center justify-between px-4 py-1">
            <div className="flex gap-2">
              <HeartIcon className="w-7 cursor-pointer" />
              <ChatIcon
                onClick={() => setIsCommenting(!isCommenting)}
                className="w-7 cursor-pointer"
              />
              <PaperAirplaneIcon className="w-7 rotate-45" />
            </div>
            <BookmarkIcon className="w-7" />
          </div>
          <div className="px-4" id="bottom-section">
            <p className="font-medium text-sm">
              {post.likes === null ? 0 : post.likes.length} Likes
            </p>
            <p className="text-sm">{post.caption}</p>
            <p className="text-sm">Comments</p>
          </div>

          <div
            className={`${
              isCommenting ? "" : "hidden"
            } px-3 py-1 relative flex items-center`}
          >
            <EmojiHappyIcon className="w-5 absolute left-5" />
            <input
              className="w-full bg-slate-100 focus:outline-none rounded-full text-sm py-2 px-8"
              type="text"
            />
            <button
              className="font-medium absolute right-7 text-sm text-blue-600/80 hover:text-blue-600"
              type="button"
            >
              Comment
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default Post;
