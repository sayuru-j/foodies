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
import { NavigationType, useNavigate } from "react-router-dom";
import CommentItem from "../Comment/CommentItem";

dayjs.extend(relativeTime);

function PostItemProfile({
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
  const navigate = useNavigate();
  const [optionIsToggled, setOptionIsToggled] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [users, setUsers] = useState([]);
  const [isLiked, setIsLiked] = useState(likes.includes(uuid));
  const [comments, setComments] = useState([]);

  const handleDelete = async (postid) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/post/deletePost/${postid}`
    );

    setIsDeleted(response?.data && true);
    setOptionIsToggled(false);
  };

  const onLike = async () => {
    setIsLiked(true);

    let updatedLikes = likes;
    if (!updatedLikes.includes(uuid)) {
      updatedLikes = [...updatedLikes, uuid];
    }

    const response = await axios.post(
      `${
        import.meta.env.VITE_API_URL
      }/post/likePost?postId=${postid}&userId=${uuid}`
    );

    // console.log(response);
  };

  const onUnlike = async () => {
    setIsLiked(false);
    const response = await axios.post(
      `${
        import.meta.env.VITE_API_URL
      }/post/unlikePost?postId=${postid}&userId=${uuid}`
    );

    // console.log(response);
  };

  // console.log(isLiked);

  const getUsers = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/user/getUsers`
    );

    setUsers(response?.data);
  };

  const getComments = async ({ postid }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/comment/getComments`
      );

      const filteredComments = response.data.filter(
        (comment) => comment.postid === postid
      );

      setComments(filteredComments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
    getComments({ postid });
  }, []);

  return (
    <>
      {isDeleted ? (
        <div className="flex max-w-2xl h-20 w-full py-2 rounded-xl shadow-sm border-t-[1px] border-b-[1px] items-center justify-center mx-auto">
          <h1 className="font-medium text-sm text-secondary/60">
            Post Deleted
          </h1>
        </div>
      ) : (
        <div
          key={postid}
          className="flex flex-col w-full h-full justify-between"
        >
          <div className="flex flex-col">
            <div className="flex items-center w-full justify-between border-b-[1px] border-black/10 px-4 py-2">
              <div className="flex items-center justify-center gap-2">
                <a
                  href={`/profile/${
                    users.find((user) => user.userid === userid) &&
                    users.find((user) => user.userid === userid).userid
                  }/${
                    users.find((user) => user.userid === userid) &&
                    users.find((user) => user.userid === userid).username
                  }`}
                >
                  <NoContextMenuImage
                    className="w-8 h-8 rounded-full object-cover"
                    src={
                      // Finding avatar based on userid relevant to post
                      users.find((user) => user.userid === userid) &&
                      users.find((user) => user.userid === userid).avatar
                    }
                    alt="avatar"
                  />
                </a>

                <div className="flex flex-col">
                  <a
                    href={`/profile/${
                      users.find((user) => user.userid === userid) &&
                      users.find((user) => user.userid === userid).username
                    }`}
                  >
                    <h1 className="font-semibold text-sm">
                      {
                        // Finding username based on userid relevant to post
                        users.find((user) => user.userid === userid) &&
                          users.find((user) => user.userid === userid).username
                      }
                    </h1>
                  </a>

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

            <div className="px-4 py-4 flex">
              <p className="text-sm">{caption}</p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between px-4 py-1">
              <div className="flex gap-2">
                {isLiked ? (
                  <HeartIconFilled
                    onClick={onUnlike}
                    className="w-7 cursor-pointer text-secondary/90"
                  />
                ) : (
                  <HeartIcon onClick={onLike} className="w-7 cursor-pointer" />
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
                {likes === null && 0}
                {isLiked && !likes.includes(uuid)
                  ? likes.length + 1
                  : likes.length}
                <span className="pl-1">Likes</span>
              </p>

              <div className="flex flex-col gap-2 pt-2 max-h-[150px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-black/10 scrollbar-track-black/10">
                {comments?.map((comment) => (
                  <CommentItem
                    key={comment.commentid}
                    {...comment}
                    user={users.find((user) => user.userid === comment.userid)}
                  />
                ))}
              </div>
            </div>

            <div className="px-3 py-3 relative flex items-center">
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
        </div>
      )}
    </>
  );
}

export default PostItemProfile;
