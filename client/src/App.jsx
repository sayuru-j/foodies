import { useEffect } from "react";
import Navigation from "./pages/Routes/Routes";
import { gapi } from "gapi-script";

function App() {
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
