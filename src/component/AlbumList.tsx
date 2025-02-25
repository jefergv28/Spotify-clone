import { useState } from "react";
import { albumsMock } from "../hooks/mockData";
import { useNavigate } from "react-router-dom";

export interface Album {
  id: string;
  name: string;
  images: { url: string }[];
  artists: { name: string }[];
}

interface AlbumListProps {
  onAlbumSelect: (album: Album) => void;
  maxAlbums?: number;
}

const AlbumCard = ({
  album,
  onAlbumSelect,
}: {
  album: Album;
  onAlbumSelect: (album: Album) => void;
}) => {
  const navigate = useNavigate();

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Ver detalles del álbum ${album.name}`}
      className="flex flex-col items-center p-2 rounded-2xl cursor-pointer transition-transform transform hover:scale-105 hover:bg-[#252525]"
      onClick={() => {
        onAlbumSelect(album);
        navigate(`/album/${album.id}`);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onAlbumSelect(album);
          navigate(`/album/${album.id}`);
        }
      }}
    >
      <div className="relative">
        <img
          src={album.images[0]?.url || "/placeholder.jpg"}
          alt={album.name}
          className="w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 object-cover rounded-lg shadow-lg"
          loading="lazy"
        />
      </div>
      <h2 className="text-center text-white mt-2 text-sm font-semibold">
        {album.name}
      </h2>
      <p className="text-center text-gray-300 text-xs">
        {album.artists.map((artist) => artist.name).join(", ")}
      </p>
    </div>
  );
};

export const AlbumList = ({ onAlbumSelect, maxAlbums = 5 }: AlbumListProps) => {
  const [albums] = useState<Album[]>(albumsMock);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-2">
      {albums.slice(0, maxAlbums).map((album) => (
        <AlbumCard key={album.id} album={album} onAlbumSelect={onAlbumSelect} />
      ))}
    </div>
  );
};

export default AlbumList;
