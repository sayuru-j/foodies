import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddPost() {
  const navigate = useNavigate();

  const [state, setState] = useState({
    caption: "",
    photo: "",
    userid: "252",
    username: "sayuru",
    avatar:
      "https://cdna.artstation.com/p/assets/images/images/018/649/560/large/florian-dreyer-portrait2.jpg?1560191987",
  });

  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [isClickedPost, setIsClickedPost] = useState(false);

  const handleChange = (input) => (e) => {
    setState({ ...state, [input]: e.target.value });
  };

  const { caption, photo, userid, username, avatar } = state;

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ecgop3wq");
    data.append("cloud_name", "df2vpsktp");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/df2vpsktp/image/upload",
      data
    );
    const responseData = await response.data;
    setUrl(responseData.url);
    return responseData.url;
  };

  const createPost = async (imageUrl) => {
    const response = await axios.post(
      "http://localhost:8080/api/v1/post/savePost",
      {
        caption,
        photo: imageUrl,
        userid,
        username,
        avatar,
        likes: [1, 2, 3],
      }
    );
  };

  // console.log(image);

  const uploadAndSave = async () => {
    setIsClickedPost(true);
    const imageUrl = await uploadImage();
    createPost(imageUrl);

    navigate("/", { replace: true });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-rose-100 to-teal-100">
      <form className="flex flex-col items-center w-full lg:max-w-xl max-w-md shadow-sm bg-white rounded-xl">
        <h1 className="text-center font-medium border-b-[1px] w-full rounded-t-xl border-black/10 py-3">
          Create new post
        </h1>

        <div className="min-h-[400px] flex flex-col justify-center">
          {image ? (
            <div className="flex w-full justify-center py-4">
              <label className="flex flex-col items-center">
                <input
                  className="hidden"
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <p
                  className="text-sm cursor-pointer bg-blue-500 text-white font-medium py-1 px-3 rounded-md mt-2"
                  type="button"
                >
                  Change picture
                </p>
              </label>
            </div>
          ) : (
            <div className="flex w-full justify-center py-4">
              <label className="flex flex-col items-center">
                <svg
                  className="w-20"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
                </svg>
                <h1 className="font-medium">Drag photos here</h1>
                <input
                  className="hidden"
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <p
                  className="text-sm cursor-pointer bg-blue-500 text-white font-medium py-1 px-3 rounded-md mt-2"
                  type="button"
                >
                  Select from computer
                </p>
              </label>
            </div>
          )}

          {image && (
            <div className="flex flex-col">
              <div className="px-10 flex flex-col">
                <img
                  className="w-full rounded-2xl"
                  src={URL.createObjectURL(image)}
                  alt=""
                />
              </div>
              <div className="flex py-4 w-full justify-center items-center relative">
                <label className="absolute left-3 font-bold ml-10 pr-3 border-r-[2px] text-primary/50 border-primary/40 text-sm">
                  Caption
                </label>
                <input
                  className="bg-slate-100 font-medium shadow-sm rounded-full w-full py-3 text-sm px-24 mx-10 outline-none"
                  value={caption}
                  onChange={handleChange("caption")}
                  type="text"
                />
              </div>
            </div>
          )}

          {image && (
            <button
              className="bg-blue-600 text-white p-2 rounded-b-xl"
              type="button"
              onClick={uploadAndSave}
            >
              {isClickedPost ? "Posting" : "Post"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddPost;
