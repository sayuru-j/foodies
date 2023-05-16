import { DotsVerticalIcon } from "@heroicons/react/outline";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
dayjs.extend(relativeTime);

function CommentItem({
  user,
  body,
  created,
  updated,
  commentid,
  userid,
  uuid,
}) {
  const [optionToggled, setOptionToggled] = useState(false);
  const [commentDeleted, setCommentDeleted] = useState(false);
  const [editToggled, setEditToggled] = useState(false);

  const handleDeleteComment = async () => {
    let cid = commentid;

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/comment/deleteComment/${cid}`
      );

      if (response.data) {
        setCommentDeleted(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!commentDeleted ? (
        <div className="w-full flex items-start justify-between relative">
          <div className="flex items-start justify-between gap-2">
            <div className="flex gap-2">
              <a href={`/profile/${user?.userid}/${user?.username}`}>
                <img
                  className="w-8 h-8 object-cover rounded-full"
                  src={user?.avatar}
                  alt=""
                />
              </a>

              <div className="flex gap-2 max-w-lg">
                <a href={`/profile/${user?.userid}/${user?.username}`}>
                  <h1 className="text-sm font-medium">{user?.username}</h1>
                </a>

                <p className="text-sm">{body}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            {optionToggled ? (
              <div className="flex absolute right-4 rounded-lg items-start">
                {userid === uuid ? (
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setEditToggled(!editToggled);
                        setOptionToggled(!optionToggled);
                      }}
                      className="text-xs bg-slate-50 text-gray-800 px-4 rounded-lg shadow-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={handleDeleteComment}
                      className="text-xs bg-slate-50 text-red-500 px-4 rounded-lg shadow-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      type="button"
                      className="text-xs bg-slate-50 text-gray-800 px-4 rounded-lg shadow-sm font-medium"
                    >
                      Report
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-1 items-center justify-between">
                <h1 className="text-xs font-thin opacity-70">
                  {created === updated
                    ? dayjs(created).fromNow()
                    : dayjs(updated).fromNow()}
                </h1>
              </div>
            )}
            <DotsVerticalIcon
              onClick={() => setOptionToggled(!optionToggled)}
              className="w-4 cursor-pointer"
            />
          </div>
        </div>
      ) : (
        <div className="flex w-full items-center justify-center">
          <h1 className="text-xs text-red-400 font-medium">Comment Deleted</h1>
        </div>
      )}
    </>
  );
}

export default CommentItem;
