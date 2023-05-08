import image from "../../assets/mock-login.png";
import logo from "../../assets/foodies-logo-text.png";

function Login() {
  return (
    <div className="grid lg:grid-cols-5 grid-col-1 h-screen px-2 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900">
      <div className="lg:block hidden"></div>
      <div className="col-span-3 flex items-center justify-center">
        <div className="w-full md:flex items-center justify-center hidden">
          <img className="w-[800px] drop-shadow-xl" src={image} alt="" />
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
                className="inline-block shadow-lg bg-[#3c70ad] hover:bg-primary w-full py-2 text-sm rounded-xl border-[1px] border-[#1e335b] hover:border-primary text-white font-semibold transition-all duration-200 ease-out"
                type="submit"
              >
                SIGN IN
              </button>
              <h1 className="my-2 text-sm border-t-[1px] border-b-[1px] rounded-md py-2 border-black/10 text-black/50 text-center">
                Or
              </h1>
              <div className="flex flex-col gap-2">
                <button
                  className="inline-block shadow-sm bg-[#3c70ad] hover:bg-blue-600 w-full py-2 text-sm rounded-xl border-[1px] border-[#1e335b] hover:border-blue-600 text-white font-semibold transition-all duration-200 ease-out"
                  type="button"
                >
                  SIGN IN WITH FACEBOOK
                </button>
                <button
                  className="inline-block shadow-sm bg-[#3c70ad] hover:bg-red-600 w-full py-2 text-sm rounded-xl border-[1px] border-[#1e335b] hover:border-red-600 text-white font-semibold transition-all duration-200 ease-out"
                  type="button"
                >
                  SIGN IN WITH GOOGLE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="lg:block hidden"></div>
    </div>
  );
}

export default Login;
