import { Route, Routes } from "react-router-dom";
import Home from "../Home/home";
import Login from "../../components/Login/Login";
import AddPost from "../../components/Post/AddPost";

function Navigation() {
  return (
    <Routes>
      <Route path="/login" exact Component={Login} />
      <Route path="/" element={<Home />} />
      <Route path="/addpost" Component={AddPost} />
    </Routes>
  );
}

export default Navigation;
