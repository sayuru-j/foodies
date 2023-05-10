import React from "react";
import NoContextMenuImage from "../../helpers/NoContextMenuImage";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  EyeOffIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";

import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import axios from "axios";
import { useEffect } from "react";

dayjs.extend(relativeTime);

function PostItem({
  postid,
  avatar,
  userid,
  uuid,
  created,
  photo,
  likes,
  caption,
  username,
}) {
  const [optionIsToggled, setOptionIsToggled] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [users, setUsers] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  const handleDelete = async (postid) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/post/deletePost/${postid}`
    );

    setIsDeleted(response?.data && true);
    setOptionIsToggled(false);
  };

  const onLike = async () => {
    setIsLiked(!isLiked);
  };

  const onUnlike = async () => {
    setIsLiked(!isLiked);
  };

  const getUsers = async () => {
    const response = await axios(
      `${import.meta.env.VITE_API_URL}/user/getUsers`
    );

    setUsers(response?.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div
      key={postid}
      className="max-w-2xl w-full py-2 rounded-xl shadow-sm border-t-[1px] border-b-[1px] justify-center mx-auto"
    >
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center justify-center gap-2">
          <NoContextMenuImage
            className="w-8 h-8 rounded-full object-cover"
            src={
              // Finding avatar based on userid relevant to post
              users.find((user) => user.userid === userid) &&
              users.find((user) => user.userid === userid).avatar
            }
            alt="avatar"
          />
          <div className="flex flex-col">
            <h1 className="font-semibold text-sm">
              {
                // Finding avatar based on userid relevant to post
                users.find((user) => user.userid === userid) &&
                  users.find((user) => user.userid === userid).username
              }
            </h1>
            <p className="text-xs">{dayjs(created).fromNow()}</p>
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
            {uuid === userid && (
              <button
                onClick={handleDelete.bind(null, parseInt(postid))}
                className="text-sm font-medium text-secondary/50 hover:text-secondary"
                type="button"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
      <div className="py-2 px-2">
        <NoContextMenuImage
          className="w-full rounded-xl object-cover"
          src={photo}
          alt="Not Found 404"
        />
      </div>
      <div className="flex items-center justify-between px-4 py-1">
        <div className="flex gap-2">
          {isLiked ? (
            <HeartIconFilled
              onClick={onLike}
              className="w-7 cursor-pointer text-secondary/90"
            />
          ) : (
            <HeartIcon onClick={onUnlike} className="w-7 cursor-pointer" />
          )}
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
          {likes === null ? 0 : likes.length} Likes
        </p>
        <p className="text-sm">{caption}</p>
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
  );
}

export default PostItem;
