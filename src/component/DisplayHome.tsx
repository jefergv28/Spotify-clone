import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Album, AlbumList } from "./AlbumList";
import { songList } from "../hooks/songMock";
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

interface Song {
  cover_image: string | undefined;
  title: string;
  artist: string;

  // Agrega más propiedades si es necesario
}

interface SongCardProps {
  song: Song;
  onClick: () => void; // Si onClick recibe argumentos, cámbialo
}

const SongCard: React.FC<SongCardProps> = ({ song, onClick }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Reproducir ${song.title}`}
      className="flex flex-col items-center py-4 rounded-2xl cursor-pointer transition-transform transform hover:scale-105 hover:bg-[#252525]"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onClick();
        }
      }}
    >
      <img
        src={song.cover_image}
        alt={song.title}
        className="w-36 h-36 sm:w-32 sm:h-32 md:w-40 md:h-40 object-cover rounded-lg shadow-md"
      />
      <h2 className="text-sm text-center mt-2">{song.title}</h2>
      <p className="text-xs text-center">{song.artist}</p>
    </div>
  );
};

const DisplayHome = () => {
  const navigate = useNavigate();
  const { playWithId } = useContext(PlayerContext);

  const onAlbumSelect = (album: Album) => {
    console.log("Álbum seleccionado:", album);
    navigate(`/album/${album.id}`);
  };

  const topSongs = useMemo(() => songList.slice(0, 5), []);

  return (
    <>
      <Navbar />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Prominent albums</h1>
        <div className="overflow-x-auto mb-6">
          <AlbumList onAlbumSelect={onAlbumSelect} />
        </div>
        <div className="mb-4">
          <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 overflow-auto">
            {topSongs.map((song) => (
              <SongCard
                key={song.id}
                song={song}
                onClick={() => {
                  console.log(`🎵 Click en: ${song.title}`);
                  playWithId(song.id.toString());
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
