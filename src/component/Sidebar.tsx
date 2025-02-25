import {
  ArrowRight,
  ChartColumnStacked,
  House,
  Plus,
  Search,
} from "lucide-react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, onClick }) => {
  return (
    <button
      aria-label={label}
      className="flex items-center gap-3 pl-8 cursor-pointer"
      onClick={onClick}
    >
      <span className="w-6">{icon}</span>
      <p className="font-bold">{label}</p>
    </button>
  );
};

interface SidebarSectionProps {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({
  title,
  description,
  buttonText,
  onClick,
}) => {
  return (
    <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start gap-1">
      <h1>{title}</h1>
      <p className="font-light">{description}</p>
      <button
        aria-label={buttonText}
        className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4"
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateHome = useCallback(() => navigate("/"), [navigate]);

  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
        <SidebarItem
          icon={<House />}
          label="Home"
          onClick={handleNavigateHome}
        />
        <SidebarItem icon={<Search />} label="Search" />
      </div>

      <div className="bg-[#121212] h-[85%] rounded mt-2 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8">
              <ChartColumnStacked />
            </span>
            <p className="font-semibold">Your Library</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-5">
              <ArrowRight />
            </span>
            <span className="w-5">
              <Plus />
            </span>
          </div>
        </div>

        <SidebarSection
          title="Create your playlist"
          description="It’s easy, we will help you."
          buttonText="Create Playlist"
          onClick={() => console.log("Create Playlist clicked")}
        />

        <SidebarSection
          title="Let’s find some podcasts to follow"
          description="We’ll keep you updated on new episodes."
          buttonText="Browse podcasts"
          onClick={() => console.log("Browse Podcasts clicked")}
        />
      </div>
    </div>
  );
};

export default Sidebar;
