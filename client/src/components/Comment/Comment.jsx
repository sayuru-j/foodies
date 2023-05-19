import { EmojiHappyIcon } from "@heroicons/react/outline";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CommentItem from "./CommentItem";

function Comment({ postid, users, uuid }) {
  const [commentText, setCommentText] = useState({
    comment: "",
  });
  const [comments, setComments] = useState([]);

  const handleChange = (item) => (e) => {
    setCommentText({
      ...commentText,
      [item]: e.target.value,
    });
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

  const addComment = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/comment/saveComment`,
        {
          body: commentText.comment,
          postid: postid,
          userid: uuid,
        }
      );
      setCommentText(response?.data && "");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComments({ postid });
  }, [commentText]);
  return (
    <div>
      <div className="flex flex-col gap-3 py-4 px-4 max-h-[150px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-black/10 scrollbar-track-black/10">
        {comments?.map((comment) => (
          <CommentItem
            key={comment.commentid}
            {...comment}
            user={users?.find((user) => user.userid === comment.userid)}
            uuid={uuid}
          />
        ))}
      </div>
      <div className="px-3 py-1 relative flex items-center pt-2">
        <EmojiHappyIcon className="w-5 absolute left-5" />
        <input
          className="w-full bg-slate-100 focus:outline-none rounded-full text-sm py-2 px-8"
          type="text"
          onChange={handleChange("comment")}
        />
        <button
          onClick={addComment}
          className="font-medium absolute right-7 text-sm text-blue-600/80 hover:text-blue-600"
          type="button"
        >
          Comment
        </button>
      </div>
    </div>
  );
}

export default Comment;
