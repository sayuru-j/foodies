import { Gradient } from "../../constants/Gradients";
import Sidebar from "../Sidebar/Sidebar";
import Bottombar from "../Sidebar/Bottombar";

function Search() {
  return (
    <>
      <Sidebar />
      <Bottombar />
      <div
        className={`${Gradient} flex lg:ml-64 md:ml-16 h-screen items-center justify-center`}
      >
        Search
      </div>
    </>
  );
}

export default Search;
