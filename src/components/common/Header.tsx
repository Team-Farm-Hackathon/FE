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
      className="flex w-full items-center justify-between border-b-4 border-[#1a1108] bg-[#2a1d11] px-4 py-3 pl-16 md:px-6 md:pl-6"
      style={{ imageRendering: "pixelated", fontFamily: '"Press Start 2P", monospace' }}
    >
      <div className="flex flex-col leading-tight">
        <span className="text-lg tracking-widest text-[#e8b86b] drop-shadow-[2px_2px_0_#000] md:text-2xl">
          STAGE {currentStage}
        </span>
        <span className="mt-1 text-xs tracking-wider text-[#8a6a3d] md:text-sm">
          {stageName}
        </span>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <Stat icon={Coin} value={gold} iconAlt="gold" />
        <Stat icon={Star} value={reputation} iconAlt="reputation" />
      </div>
    </header>
  );
}


