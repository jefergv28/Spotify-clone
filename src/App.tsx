import { useContext } from "react";
import Display from "./component/Display";
import Player from "./component/Player";
import Sidebar from "./component/Sidebar";
import { PlayerContext } from "./context/PlayerContext";

function App() {
  const playerContext = useContext(PlayerContext);

  if (!playerContext) {
    return (
      <div className="h-screen bg-black flex items-center justify-center text-white">
        Cargando...
      </div>
    );
  }

  const { audioRef, track } = playerContext;

  return (
    <div className="h-screen bg-black">
      <div className="h-[90%] flex">
        <Sidebar />
        <Display />
      </div>
      <Player />
      <audio ref={audioRef} src={track.url} preload="auto"></audio>
    </div>
  );
}

export default App;
