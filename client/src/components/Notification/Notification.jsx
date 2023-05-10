import { Gradient } from "../../constants/Gradients";
import Bottombar from "../Sidebar/Bottombar";
import Sidebar from "../Sidebar/Sidebar";

function Notification() {
  return (
    <>
      <Sidebar />
      <Bottombar />
      <div className={`${Gradient} h-screen lg:ml-64 md:ml-16`}>
        Notification
      </div>
    </>
  );
}

export default Notification;
