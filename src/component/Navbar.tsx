import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface NavButtonProps {
  onClick: () => void; // Función sin parámetros y sin retorno
  ariaLabel: string; // Texto accesible
  children: React.ReactNode; // Contenido del botón (puede ser texto o elementos JSX)
}

const NavButton: React.FC<NavButtonProps> = ({
  onClick,
  ariaLabel,
  children,
}) => {
  return (
    <button
      aria-label={ariaLabel}
      className="w-8 p-2 text-white bg-black rounded-2xl cursor-pointer hover:bg-gray-800 flex items-center justify-center"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

interface FilterButtonProps {
  label: string; // El texto del botón
  isActive: boolean; // Si el botón está activo o no
  onClick: () => void; // Función que se ejecuta al hacer clic
}

const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  isActive,
  onClick,
}) => {
  return (
    <button
      aria-label={`Filter by ${label}`}
      className={`px-4 py-1 rounded-2xl cursor-pointer ${
        isActive
          ? "bg-white text-black hover:bg-gray-300"
          : "bg-black text-white hover:bg-gray-800"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

const Navbar = () => {
  const navigate = useNavigate();

  const handleGoBack = useCallback(() => navigate(-1), [navigate]);
  const handleGoForward = useCallback(() => navigate(1), [navigate]);

  return (
    <div className="w-full flex justify-between items-center font-semibold sticky top-0 z-50 p-3">
      {/* Contenedor de flechas y filtros */}
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        {/* Flechas de navegación */}
        <div className="flex justify-start gap-2">
          <NavButton onClick={handleGoBack} ariaLabel="Go back">
            <ArrowLeft />
          </NavButton>
          <NavButton onClick={handleGoForward} ariaLabel="Go forward">
            <ArrowRight />
          </NavButton>
        </div>

        {/* Filtros ("All", "Music", "Podcast") */}
        <div className="flex gap-2">
          <FilterButton
            label="All"
            isActive={true}
            onClick={() => console.log("Filter: All")}
          />
          <FilterButton
            label="Music"
            isActive={false}
            onClick={() => console.log("Filter: Music")}
          />
          <FilterButton
            label="Podcast"
            isActive={false}
            onClick={() => console.log("Filter: Podcast")}
          />
        </div>
      </div>

      {/* Otros elementos del Navbar */}
      <div className="flex items-center gap-4">
        <button
          aria-label="Explore Premium"
          className="bg-white text-black text-sm px-3 py-1 rounded-2xl hidden md:block cursor-pointer hover:bg-gray-300"
        >
          Explore Premium
        </button>
        <button
          aria-label="Install App"
          className="bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer hover:bg-gray-800"
        >
          Install App
        </button>
        <button
          aria-label="User Profile"
          className="bg-purple-500 text-white w-7 h-7 rounded-full flex items-center justify-center font-bold"
        >
          J
        </button>
      </div>
    </div>
  );
};

export default Navbar;
