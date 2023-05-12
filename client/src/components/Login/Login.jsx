import image from "../../assets/mock-login.png";
import logo from "../../assets/foodies-logo-text.png";

import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [isSavedInAPI, setIsSavedInAPI] = useState();

  const onSuccess = (res) => {
    // Getting Login Details to a variable
    const loginDetails = {
      accessToken: res.accessToken,
      user: {
        userid: null,
        fullname: res.profileObj.name,
        email: res.profileObj.email,
        username: res.profileObj?.name?.toLowerCase(),
        avatar: res.profileObj.imageUrl,
      },
    };

    // Assigning a default dp if user does not have a display picture.
    if (loginDetails.user.avatar === undefined) {
      const urls = [
        "https://msuwdjwjwvcacj5ycwdcfb7pqre3ggztxfdjomcsudordomdhwpa.arweave.net/ZKlhpsm1RAEnuBWGIofvhEmzGzO5RpcwUqDdEbmDPZ4?ext=jpg",
      ];

      const randomIndex = Math.floor(Math.random() * urls.length);
      const randomUrl = urls[randomIndex];

      loginDetails.user.avatar = randomUrl;
    }

    const saveUserInApi = async () => {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/saveUser`,
        {
          username: loginDetails.user.username.toLowerCase().replace(/\s/g, ""),
          email: loginDetails.user.email,
          fullname: loginDetails.user.fullname,
          city: "Unknown",
          avatar: loginDetails.user.avatar,
        }
      );

      setIsSavedInAPI(response?.data);
    };

    // Saving user in API
    saveUserInApi();
    console.log(isSavedInAPI);

    const fetchUserId = async () => {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/user/getUserByUsername/${loginDetails.user.username
          .toLowerCase()
          .replace(/\s/g, "")}`
      );

      let userid = response.data.userid;

      loginDetails.user.userid = userid;
      // Saves User Details in LocalStorage
      localStorage.setItem("loginDetails", JSON.stringify(loginDetails));
      navigate("/");
    };

    // Fetch existing user
    fetchUserId();
  };

  const onFailure = (res) => {
    console.log("LOGIN FAILED!", res);
  };

  return (
    <div className="bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900">
      <div className="grid lg:grid-cols-5 grid-col-1 h-screen px-2">
        <div className="lg:block hidden"></div>
        <div className="col-span-3 flex items-center justify-center">
          <div className="w-full md:flex items-center justify-center hidden">
            <img className="w-[600px] drop-shadow-xl" src={image} alt="" />
          </div>
          <div className="w-full flex flex-col rounded-lg">
            <div className="flex justify-center w-full">
              <img className="w-40" src={logo} alt="" />
            </div>
            <div>
              <form className="px-10 py-4 max-w-md mx-auto">
                <div className="flex flex-col">
                  <label className="text-sm font-medium pl-2 pt-2 text-black/70">
                    Username
                  </label>
                  <input
                    className="shadow-lg pl-3 text-sm py-2 rounded-xl focus:outline-none"
                    type="text"
                    placeholder="Username or email"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium pl-2 pt-2 text-black/70">
                    Password
                  </label>
                  <input
                    className="shadow-lg pl-3 text-sm py-2 rounded-xl focus:outline-none"
                    type="text"
                    placeholder="Password"
                  />
                </div>
                <div className="py-4 flex justify-center">
                  <a className="text-xs cursor-pointer font-medium text-primary/70 hover:text-primary">
                    Forgot password?
                  </a>
                </div>
                <button
                  className="inline-block shadow-lg bg-[#3c70ad] hover:bg-primary w-full py-2 text-sm rounded-xl border-2 border-[#1e335b] hover:border-primary text-white font-semibold transition-all duration-200 ease-out"
                  type="submit"
                >
                  SIGN IN
                </button>
                <h1 className="my-2 text-sm border-t-[1px] border-b-[1px] rounded-md py-2 border-black/10 text-black/50 text-center">
                  Or
                </h1>
                <div className="flex flex-col gap-2">
                  <GoogleLogin
                    render={(renderProps) => (
                      <button
                        onClick={renderProps.onClick}
                        className="inline-block shadow-lg bg-[#3c70ad] hover:bg-[#02b875] w-full py-2 text-sm rounded-xl border-2 border-[#1e335b] hover:border-[#02b875] text-white font-semibold transition-all duration-200 ease-out"
                      >
                        SIGN IN WITH GOOGLE
                      </button>
                    )}
                    clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={"single_host_origin"}
                    isSignedIn={true}
                    scope="profile email"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="lg:block hidden"></div>
      </div>
    </div>
  );
}

export default Login;
