import Sidebar from "../../components/Sidebar/Sidebar";
import Bottombar from "../../components/Sidebar/Bottombar";
import Timeline from "../../components/Timeline/Timeline";
import LoginToProceed from "../../components/LoginToProceed/LoginToProceed";
import { useState } from "react";
import { useEffect } from "react";

function Home() {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    let loginDetails = localStorage.getItem("loginDetails");
    const accessToken = JSON.parse(loginDetails)?.accessToken;

    setAccessToken(accessToken);
  });
  return (
    <>
      {accessToken ? (
        <>
          <Sidebar />
          <Bottombar />
          <Timeline />
        </>
      ) : (
        <LoginToProceed />
      )}
    </>
  );
}

export default Home;
