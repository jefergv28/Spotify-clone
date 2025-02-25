/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useCallback } from "react";
import { PlayerContext } from "../context/PlayerContext";

interface Song {
  id: number; // O string, dependiendo de tu implementación
  title: string;
  artist: string;
  cover_image: string;
}

interface SongItemProps {
  song: Song;
}

const SongItem: React.FC<SongItemProps> = ({ song }) => {
  const playerContext = useContext(PlayerContext);

  if (!playerContext) {
    console.error("❌ PlayerContext no disponible");
    return null;
  }

  const { playWithId } = playerContext;

  const handlePlaySong = useCallback(() => {
    console.log(`🎵 Click en: ${song.title} (ID: ${song.id})`);
    playWithId(String(song.id));
  }, [playWithId, song.id, song.title]);

  return (
    <button
      aria-label={`Reproducir ${song.title}`}
      className="flex flex-col items-center text-center cursor-pointer hover:bg-[#ffffff2b] p-2 rounded-lg transition-colors"
      onClick={handlePlaySong}
    >
      <img
        src={song.cover_image}
        alt={song.title}
        className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-cover rounded-lg shadow-md"
      />
      <h3 className="text-sm mt-2 font-semibold">{song.title}</h3>
      <p className="text-xs text-gray-400">{song.artist}</p>
    </button>
  );
};

export default SongItem;
