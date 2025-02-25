/* eslint-disable react-refresh/only-export-components */
import { createContext, useRef, useState, ReactNode } from "react";
import { songList } from "../hooks/songMock";

export interface Track {
  id: number;
  title: string;
  artist: string;
  cover_image: string;
  url: string;
  duration: { minute: number; second: number };
}

interface PlayerContextType {
  audioRef: React.RefObject<HTMLAudioElement>;
  seekBar: React.RefObject<HTMLHRElement>;
  seekBg: React.RefObject<HTMLDivElement>;
  track: Track;
  setTrack: (track: Track) => void;
  playStatus: boolean;
  setPlayStatus: (status: boolean) => void;
  time: {
    currentTime: { second: number; minute: number };
    totalTime: { second: number; minute: number };
  };
  setTime: (time: {
    currentTime: { second: number; minute: number };
    totalTime: { second: number; minute: number };
  }) => void;
  play: () => void;
  pause: () => void;
  playWithId: (id: string) => Promise<void>;
  previous: () => void;
  next: () => void;
  seekSong: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const PlayerContext = createContext<PlayerContextType>(
  {} as PlayerContextType
);

export const PlayerContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const seekBg = useRef<HTMLDivElement>(null);
  const seekBar = useRef<HTMLHRElement | null>(null);

  const [track, setTrack] = useState<Track>(
    songList.length > 0
      ? { ...songList[0], id: Number(songList[0].id) }
      : {
          id: 0,
          title: "",
          cover_image: "",
          artist: "",
          url: "",
          duration: { minute: 0, second: 0 },
        }
  );

  const [playStatus, setPlayStatus] = useState<boolean>(false);
  const [time, setTime] = useState<{
    currentTime: { second: number; minute: number };
    totalTime: { second: number; minute: number };
  }>({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  const play = async () => {
    console.log("🔍 URL del track:", track.url);

    if (!track.url) {
      console.error("❌ No hay una URL de audio válida");
      return;
    }

    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setPlayStatus(true);
      } catch (err) {
        console.error("⚠️ Error al reproducir:", err);
      }
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };

  const playWithId = async (id: string) => {
    console.log("🟠 playWithId llamado con id:", id, "tipo:", typeof id);

    const song = songList.find((song) => song.id === Number(id));

    if (!song) {
      console.error("❌ Canción no encontrada con ID:", id);
      console.log("🔍 Lista de canciones:", songList);
      return;
    }

    console.log("✅ Canción encontrada:", song);

    setTrack(song);

    if (audioRef.current) {
      console.log("🎵 Asignando URL:", song.url);
      audioRef.current.src = song.url;

      audioRef.current.onloadeddata = () => {
        console.log("▶️ Intentando reproducir...");
        audioRef.current
          ?.play()
          .then(() => {
            console.log("✅ Reproducción exitosa");
            setPlayStatus(true);
          })
          .catch((err) => console.error("⚠️ Error al reproducir:", err));
      };
    } else {
      console.error("❌ audioRef es NULL");
    }
  };

  const previous = async () => {
    const previousIndex = track.id - 1;
    if (previousIndex >= 0) {
      const previousSong = songList[previousIndex];
      setTrack(previousSong);

      if (audioRef.current) {
        audioRef.current.src = previousSong.url;
        await audioRef.current.play();
        setPlayStatus(true);
      }
    }
  };

  const next = async () => {
    const nextIndex = track.id + 1;
    if (nextIndex < songList.length) {
      const nextSong = songList[nextIndex];
      setTrack(nextSong);

      if (audioRef.current) {
        audioRef.current.src = nextSong.url;
        await audioRef.current.play();
        setPlayStatus(true);
      }
    }
  };

  const seekSong = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && seekBg.current) {
      const { offsetX } = e.nativeEvent;
      const { offsetWidth } = seekBg.current;
      const { duration } = audioRef.current;

      if (duration) {
        audioRef.current.currentTime = (offsetX / offsetWidth) * duration;
      }
    }
  };

  const contextValue: PlayerContextType = {
    audioRef: audioRef as React.RefObject<HTMLAudioElement>,
    seekBar: seekBar as React.RefObject<HTMLHRElement>,
    seekBg: seekBg as React.RefObject<HTMLDivElement>,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
      <audio ref={audioRef} src={track.url} />
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
