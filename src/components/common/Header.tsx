import { useGameStore } from "../../store/useGameStore";
import { Coin, Star } from "../../assets";
import Stat from "./Stat";

type HeaderProps = {
  stageName?: string;
};

export default function Header({ stageName = "여정의 길" }: HeaderProps) {
  const gold = useGameStore((s) => s.gold);
  const reputation = useGameStore((s) => s.reputation);
  const currentStage = useGameStore((s) => s.currentStage);

  return (
    <header
      className="flex items-center justify-between w-full px-6 py-3 bg-[#2a1d11] border-b-4 border-[#1a1108]"
      style={{ imageRendering: "pixelated", fontFamily: '"Press Start 2P", monospace' }}
    >
      <div className="flex flex-col leading-tight">
        <span className="text-[#e8b86b] text-2xl tracking-widest drop-shadow-[2px_2px_0_#000]">
          STAGE {currentStage}
        </span>
        <span className="text-[#8a6a3d] text-sm mt-1 tracking-wider">
          {stageName}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Stat icon={Coin} value={gold} iconAlt="gold" />
        <Stat icon={Star} value={reputation} iconAlt="reputation" />
      </div>
    </header>
  );
}


