import { useEffect } from "react";
import Navigation from "./pages/Routes/Routes";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  });

  return (
    <>
      <Navigation />
    </>
  );
}

export default App;
