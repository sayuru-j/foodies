import { useEffect } from "react";
import Navigation from "./pages/Routes/Routes";

function App() {
  useEffect(() => {
    function handleContextMenu(event) {
      event.preventDefault();
    }

    const images = document.querySelectorAll("img");
    images.forEach((image) => {
      image.addEventListener("contextmenu", handleContextMenu);
    });

    return () => {
      images.forEach((image) => {
        image.removeEventListener("contextmenu", handleContextMenu);
      });
    };
  }, []);
  return (
    <>
      <Navigation />
    </>
  );
}

export default App;
