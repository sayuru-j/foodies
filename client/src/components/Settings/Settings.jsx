import { GoogleLogout } from "react-google-login";
import { Gradient } from "../../constants/Gradients";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  const onLogoutSuccess = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div
      className={`${Gradient} flex flex-col gap-1 w-full h-screen items-center justify-center`}
    >
      <h1 className="font-medium">Warning!</h1>

      <GoogleLogout
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            className="bg-secondary py-1 px-4 text-white font-bold rounded-md"
          >
            Delete Account
          </button>
        )}
        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
        onLogoutSuccess={onLogoutSuccess}
      />
    </div>
  );
}

export default Settings;
