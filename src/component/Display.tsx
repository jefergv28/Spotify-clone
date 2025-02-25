import { Route, Routes, useLocation, useParams } from "react-router-dom";
import { useEffect, useRef, useMemo } from "react";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import { albumsMock } from "../hooks/mockData";

const Display = () => {
  const displayRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  useParams<{ id: string }>();

  const isAlbum = location.pathname.includes("album");

  const bgColor = useMemo(() => {
    if (isAlbum) {
      const albumId = location.pathname.split("/").pop();
      const albumData = albumsMock.find((album) => album.id === albumId);
      return albumData ? albumData.bgColor : "#121212";
    }
    return "#121212";
  }, [isAlbum, location.pathname]);

  const updateBackground = (bgColor: string, isAlbum: boolean) => {
    if (displayRef.current) {
      displayRef.current.style.background = isAlbum
        ? `linear-gradient(${bgColor}, #121212)`
        : "#121212";
    }
  };

  useEffect(() => {
    updateBackground(bgColor, isAlbum);
  }, [bgColor, isAlbum]);

  return (
    <div
      ref={displayRef}
      className="w-full m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-3/4 lg:ml-0"
      aria-label="Contenido principal"
    >
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/album/:id" element={<DisplayAlbum />} />
      </Routes>
    </div>
  );
};

export default Display;
