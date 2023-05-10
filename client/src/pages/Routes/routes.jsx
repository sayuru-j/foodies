import { Route, Routes } from "react-router-dom";
import Home from "../Home/home";
import Login from "../../components/Login/Login";
import AddPost from "../../components/Post/AddPost";
import Notification from "../../components/Notification/Notification";
import Profile from "../../components/Profile/Profile";
import Settings from "../../components/Settings/Settings";
import Search from "../../components/Search/Search";

function Navigation() {
  return (
    <Routes>
      <Route path="/login" exact Component={Login} />
      <Route path="/" element={<Home />} />
      <Route path="/addpost" Component={AddPost} />
      <Route path="/notification" element={<Notification />} />
      <Route path="/profile/my" Component={Profile} />
      <Route path="/search" Component={Search} />
      <Route path="/settings" Component={Settings} />
    </Routes>
  );
}

export default Navigation;
