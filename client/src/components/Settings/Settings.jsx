import { Gradient } from "../../constants/Gradients";

function Settings() {
  return (
    <div
      className={`${Gradient} flex flex-col gap-1 w-full h-screen items-center justify-center`}
    >
      <h1 className="font-medium">Warning!</h1>
      <button className="bg-secondary py-1 px-4 text-white font-bold rounded-md">
        Delete Account
      </button>
    </div>
  );
}

export default Settings;
