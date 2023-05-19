import { DotsVerticalIcon } from "@heroicons/react/outline";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
dayjs.extend(relativeTime);
import { useNavigate } from "react-router-dom";

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
  const [commentEdit, setCommentEdit] = useState({
    body: body,
  });
  const [commentUpdated, setCommentUpdated] = useState(false);
  const navigate = useNavigate();

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

  const handleChange = (item) => (e) => {
    setCommentEdit({
      ...commentEdit,
      [item]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/comment/updateComment/${commentid}`,
        {
          body: commentEdit.body,
        }
      );

      setCommentUpdated(response.data && true);
      setCommentEdit(false);
      navigate(0);
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

              <div className="flex gap-2 max-w-lg pt-1">
                <a href={`/profile/${user?.userid}/${user?.username}`}>
                  <h1 className="text-sm font-medium">{user?.username}</h1>
                </a>

                {!editToggled && <p className="text-sm">{body}</p>}
              </div>
            </div>
          </div>

          {editToggled && (
            <input
              id="message"
              rows="4"
              className="block p-1 px-2 w-1/2 text-xs mt-1 text-gray-900 bg-gray-50 rounded-md border border-gray-300 outline-none"
              placeholder={body}
              onChange={handleChange("body")}
            />
          )}
          {editToggled && !optionToggled && (
            <button
              onClick={handleUpdate}
              type="button"
              className="font-medium text-sm bg-slate-50 shadow-sm mt-1 px-4 rounded-full"
            >
              OK
            </button>
          )}
          <div className="flex items-center gap-2">
            {optionToggled ? (
              <div className="flex absolute right-4 rounded-lg items-start pt-1">
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
              <div className="flex gap-1 items-center justify-between pt-1">
                <h1 className="text-xs font-thin opacity-70">
                  {created === updated
                    ? dayjs(created).fromNow()
                    : dayjs(updated).fromNow()}
                </h1>
              </div>
            )}
            <DotsVerticalIcon
              onClick={() => setOptionToggled(!optionToggled)}
              className="w-4 cursor-pointer pt-1"
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
