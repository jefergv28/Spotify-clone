import { useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { albumsMock } from "../hooks/mockData";
import logo from "../assets/images/logo.png";
import { Clock } from "lucide-react";
import { songList } from "../hooks/songMock";
import { PlayerContext } from "../context/PlayerContext";

interface Song {
  cover_image: string | undefined;
  title: string;
  artist: string;
  duration: { minute: number; second: number }; // O ajusta el tipo según tu estructura
}

interface SongItemProps {
  item: Song;
  index: number;
  albumName: string;
  onClick: () => void; // Si recibe parámetros, ajusta la firma de la función
}

const SongItem: React.FC<SongItemProps> = ({
  item,
  index,
  albumName,
  onClick,
}) => {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Reproducir ${item.title}`}
      className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onClick();
        }
      }}
    >
      <p className="text-white">
        <strong className="mr-4 text-[#a7a7a7]">{index + 1}</strong>
        <img
          className="inline mr-5 w-10"
          src={item.cover_image}
          alt={item.title}
        />
        {item.title}
      </p>
      <p className="text-[15px]">{albumName}</p>
      <p className="text-[15px] hidden sm:block">5 days ago</p>
      <p className="text-[15px] text-center">
        {item.duration.minute} : {item.duration.second}
      </p>
    </div>
  );
};

const DisplayAlbum = () => {
  const { id } = useParams();
  const { playWithId } = useContext(PlayerContext);

  const albumData = useMemo(
    () => albumsMock.find((album) => album.id === id),
    [id]
  );
  const filteredSongs = useMemo(() => songList.filter((song) => song.id), []);

  if (!albumData) {
    return (
      <>
        <Navbar />
        <div className="mt-10 text-center">
          <h2>Álbum no encontrado</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img
          src={albumData.images?.[0]?.url}
          alt={albumData.name}
          className="w-48 rounded"
        />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {albumData.name}
          </h2>
          <h4>{albumData.desc}</h4>
          <p className="mt-1">
            <img
              className="inline-block w-5"
              src={logo}
              alt="Logo de Spotify"
            />
            <strong>Spotify</strong> 1,2323,154 likes
            <strong>50 songs,</strong> about 2 hr 30 min
          </p>
        </div>
      </div>

      {/* Encabezado de canciones */}
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <strong className="mr-4">#</strong> Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <span className="m-auto w-4">
          <Clock />
        </span>
      </div>
      <hr />

      {/* Lista de canciones */}
      {filteredSongs.map((item, index) => (
        <SongItem
          key={item.id}
          item={item}
          index={index}
          albumName={albumData.name}
          onClick={() => {
            console.log(`🎵 Click en: ${item.title}`);
            playWithId(item.id.toString());
          }}
        />
      ))}
    </>
  );
};

export default DisplayAlbum;
