import MiniProfile from "../MiniProfile/MiniProfile";
import Post from "../Post/Post";
import Stories from "../Stories/Stories";

function Timeline() {
  return (
    <div className="lg:ml-64 md:ml-16 flex flex-col gap-2">
      <div className="lg:grid lg:grid-cols-3 grid-cols-1">
        <div className="flex flex-col gap-4 col-span-2 px-2">
          <Stories />
          <Post />
        </div>
        <div className="lg:flex hidden px-2">
          <MiniProfile />
        </div>
      </div>
    </div>
  );
}

export default Timeline;
