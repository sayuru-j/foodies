import { Route, Routes } from "react-router-dom";
import Home from "../Home/home";
import Login from "../../components/Login/Login";
import AddPost from "../../components/Post/AddPost";
import Notification from "../../components/Notification/Notification";
import Profile from "../../components/Profile/Profile";
import Settings from "../../components/Settings/Settings";
import Search from "../../components/Search/Search";
import { useState } from "react";
import { useEffect } from "react";
import LoginToProceed from "../../components/LoginToProceed/LoginToProceed";

function Navigation() {
  const [accessToken, setAccessToken] = useState(null);
  const [loginDetails, setLoginDetails] = useState([]);

  useEffect(() => {
    let loginDetails = localStorage.getItem("loginDetails");
    const accessToken = JSON.parse(loginDetails)?.accessToken;

    setLoginDetails(JSON.parse(loginDetails));
    setAccessToken(accessToken);
  }, []);
  return (
    <Routes>
      <Route path="/login" exact Component={Login} />

      <Route path="/" element={accessToken ? <Home /> : <LoginToProceed />} />
      <Route
        path="/addpost"
        Component={accessToken ? AddPost : LoginToProceed}
      />
      <Route
        path="/notification"
        Component={accessToken ? Notification : LoginToProceed}
      />
      <Route
        path="/profile/my"
        Component={accessToken ? Profile : LoginToProceed}
      />
      <Route path="/search" Component={accessToken ? Search : LoginToProceed} />
      <Route
        path="/settings"
        Component={accessToken ? Settings : LoginToProceed}
      />
    </Routes>
  );
}

export default Navigation;
