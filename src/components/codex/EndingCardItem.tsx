import { ENDINGS } from "../../constants/endings";
import type { EndingId } from "../../types/game";

export default function EndingCardItem({
  id,
  unlocked,
  onClick,
}: {
  id: EndingId;
  unlocked: boolean;
  onClick: () => void;
}) {
  const ending = ENDINGS[id];

  return (
    <div
      onClick={onClick}
      className={`relative flex cursor-pointer flex-col rounded-md border-2 p-3 transition-colors md:p-5 ${
        unlocked
          ? "border-[#8a6a3d] bg-[#1a1208] hover:border-[#e8b86b]"
          : "border-[#2a1f12] bg-[#1a1208]/60 hover:border-[#5a4a2a]"
      }`}
    >
      <div className="flex h-24 w-full items-center justify-center md:h-32 lg:h-40">
        <span
          className={`text-4xl md:text-5xl lg:text-6xl ${
            unlocked ? "" : "opacity-30 grayscale"
          }`}
        >
          {unlocked ? ending.icon : "🔒"}
        </span>
      </div>
      <div className="mt-3 border-t border-[#3a2a1c] pt-3">
        <p
          className={`text-xs md:text-sm ${
            unlocked ? "text-[#e8b86b]" : "text-[#5a4a2a]"
          }`}
        >
          {unlocked ? ending.name : "???"}
        </p>
        <p
          className={`mt-1 text-[9px] leading-relaxed md:text-[10px] ${
            unlocked ? "text-[#a88a5a]" : "text-[#5a4a2a]"
          }`}
        >
          {unlocked ? ending.subtitle : "아직 걷지 않은 길."}
        </p>
      </div>
    </div>
  );
}
