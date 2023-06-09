function LoginToProceed() {
  return (
    <div className="h-screen flex flex-col items-center justify-center w-full bg-gradient-to-r from-rose-100 to-teal-100">
      <h1 className="lg:text-[72px] text-[30px] font-bold">
        Welcome to Foodies<span className="text-secondary">!</span>
      </h1>
      <p className="font-thin lg:text-[30px] text-[20px] text-center max-w-6xl">
        Connect with friends, share your life, and discover new things. Follow
        your interests and be inspired by what you love. Start capturing and
        sharing your moments today.
      </p>

      <a href="/login">
        <button className="mt-10 bg-primary py-4 px-4 w-40 rounded-xl text-white font-medium">
          PROCEED
        </button>
      </a>
    </div>
  );
}

export default LoginToProceed;
