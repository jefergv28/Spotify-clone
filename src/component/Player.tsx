/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useContext, useCallback } from "react";
import {
  ListMusic,
  Maximize2,
  Mic,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Speaker,
  TvMinimalPlay,
  Volume2,
} from "lucide-react";
import { PlayerContext } from "../context/PlayerContext";

// Definimos los tipos para las props de los componentes
interface ControlButtonProps {
  onClick?: () => void;
  ariaLabel: string;
  children: React.ReactNode;
}

interface PlayPauseButtonProps {
  isPlaying: boolean;
  onClick: () => void;
}

interface ProgressBarProps {
  currentTime: { minute: number; second: number };
  totalTime: { minute: number; second: number };
  seekBg: React.RefObject<HTMLDivElement>;
  seekSong: (event: React.MouseEvent<HTMLDivElement>) => void;
  seekBar: React.RefObject<HTMLHRElement>;
}

// Componente reutilizable para botones de control
const ControlButton: React.FC<ControlButtonProps> = ({
  onClick,
  ariaLabel,
  children,
}) => {
  return (
    <button
      aria-label={ariaLabel}
      className="w-6 h-6 cursor-pointer text-gray-400 hover:text-white transition"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Componente reutilizable para el botón de Play/Pause
const PlayPauseButton: React.FC<PlayPauseButtonProps> = ({
  isPlaying,
  onClick,
}) => {
  return (
    <button
      aria-label={isPlaying ? "Pause" : "Play"}
      className="w-8 h-8 cursor-pointer text-white hover:scale-110 transition-transform"
      onClick={onClick}
    >
      {isPlaying ? <Pause /> : <Play />}
    </button>
  );
};

// Componente reutilizable para la barra de progreso
const ProgressBar: React.FC<ProgressBarProps> = ({
  currentTime,
  totalTime,
  seekBg,
  seekSong,
  seekBar,
}) => {
  const progress =
    ((currentTime.minute * 60 + currentTime.second) /
      (totalTime.minute * 60 + totalTime.second)) *
    100;

  return (
    <div className="flex items-center gap-5">
      <p>{`${currentTime.minute}:${currentTime.second < 10 ? "0" : ""}${
        currentTime.second
      }`}</p>
      <div
        ref={seekBg}
        onClick={seekSong}
        className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
      >
        <hr
          ref={seekBar}
          className="h-1 border-none bg-green-800 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p>{`${totalTime.minute}:${totalTime.second < 10 ? "0" : ""}${
        totalTime.second
      }`}</p>
    </div>
  );
};

// Componente principal Player
const Player: React.FC = () => {
  const context = useContext(PlayerContext);

  if (!context) {
    return <div>Cargando...</div>;
  }

  const {
    seekBar,
    seekBg,
    playStatus,
    play,
    pause,
    track,
    time,
    setTime,
    audioRef,
    previous,
    next,
    seekSong,
  } = context;

  // Efecto para actualizar el tiempo de reproducción
  useEffect(() => {
    if (!audioRef?.current) return;
    const audioElement = audioRef.current;

    const handleTimeUpdate = () => {
      const currentTime = audioElement.currentTime;
      const totalTime = audioElement.duration;

      setTime({
        currentTime: {
          second: Math.floor(currentTime % 60),
          minute: Math.floor(currentTime / 60),
        },
        totalTime: {
          second: Math.floor(totalTime % 60),
          minute: Math.floor(totalTime / 60),
        },
      });
    };

    audioElement.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audioRef, setTime]);

  // Funciones de control con useCallback
  const handlePlay = useCallback(() => play(), [play]);
  const handlePause = useCallback(() => pause(), [pause]);
  const handlePrevious = useCallback(() => previous(), [previous]);
  const handleNext = useCallback(() => next(), [next]);

  return (
    <div className="h-20 bg-black flex justify-between items-center text-white px-4 pr-4">
      {/* Sección de la izquierda: Información de la canción */}
      <div className="hidden lg:flex items-center gap-3">
        <img
          className="w-12 h-12 rounded object-cover"
          src={track.cover_image}
          alt={track.title}
        />
        <div>
          <p className="font-bold text-lg">{track.title}</p>
          <p className="text-gray-400 text-sm">{track.artist}</p>
        </div>
      </div>

      {/* Controles de reproducción */}
      <div className="flex flex-col items-center gap-2 flex-grow justify-center">
        <div className="flex gap-6 items-center">
          <ControlButton ariaLabel="Shuffle">
            <Shuffle />
          </ControlButton>
          <ControlButton onClick={handlePrevious} ariaLabel="Previous">
            <SkipBack />
          </ControlButton>
          <PlayPauseButton
            isPlaying={playStatus}
            onClick={playStatus ? handlePause : handlePlay}
          />
          <ControlButton onClick={handleNext} ariaLabel="Next">
            <SkipForward />
          </ControlButton>
          <ControlButton ariaLabel="Repeat">
            <Repeat />
          </ControlButton>
        </div>
        <ProgressBar
          currentTime={time.currentTime}
          totalTime={time.totalTime}
          seekBg={seekBg}
          seekSong={seekSong}
          seekBar={seekBar}
        />
      </div>

      {/* Sección de la derecha: Controles adicionales */}
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <ControlButton ariaLabel="Play">
          <Play />
        </ControlButton>
        <ControlButton ariaLabel="Mic">
          <Mic />
        </ControlButton>
        <ControlButton ariaLabel="List Music">
          <ListMusic />
        </ControlButton>
        <ControlButton ariaLabel="Speaker">
          <Speaker />
        </ControlButton>
        <ControlButton ariaLabel="Volume">
          <Volume2 />
        </ControlButton>
        <div className="w-20 bg-slate-50 h-1 rounded"></div>
        <ControlButton ariaLabel="TV Minimal Play">
          <TvMinimalPlay />
        </ControlButton>
        <ControlButton ariaLabel="Maximize">
          <Maximize2 />
        </ControlButton>
      </div>
    </div>
  );
};

export default Player;
