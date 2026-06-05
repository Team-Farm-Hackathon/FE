import { NPCS, NPC_ICON, NPC_TIER } from "../../constants/npcs";
import type { NpcId } from "../../types/game";

export default function NpcCardItem({
  id,
  unlocked,
  onClick,
}: {
  id: NpcId;
  unlocked: boolean;
  onClick: () => void;
}) {
  const npc = NPCS[id];
  const tier = NPC_TIER[id];

  return (
    <div
      onClick={onClick}
      className={`relative flex cursor-pointer flex-col rounded-md border p-3 transition-colors md:p-5 ${
        unlocked
          ? "border-[#3a2a1c] bg-[#1a1208] hover:border-[#8a6a3d]"
          : "border-[#2a1f12] bg-[#1a1208]/60 hover:border-[#5a4a2a]"
      }`}
    >
      <span className="absolute top-2 right-2 text-[8px] tracking-widest text-[#6a4e2d] md:top-3 md:right-3 md:text-[9px]">
        TIER {tier}
      </span>

      <div className="flex h-28 w-full items-center justify-center md:h-40 lg:h-48">
        {unlocked ? (
          <img
            src={NPC_ICON[id]}
            alt={npc.name}
            className="h-24 w-24 object-contain md:h-32 md:w-32 lg:h-40 lg:w-40"
          />
        ) : (
          <span className="text-4xl text-[#5a4a2a] md:text-5xl">🔒</span>
        )}
      </div>

      <div className="mt-3 border-t border-[#3a2a1c] pt-3">
        <p
          className={`text-xs md:text-sm ${
            unlocked ? "text-[#e8b86b]" : "text-[#5a4a2a]"
          }`}
        >
          {unlocked ? npc.name : "???"}
        </p>
        <p
          className={`mt-1 text-[9px] leading-relaxed md:text-[10px] ${
            unlocked ? "text-[#a88a5a]" : "text-[#5a4a2a]"
          }`}
        >
          {unlocked ? npc.title : "아직 만나지 않은 자."}
        </p>
      </div>
    </div>
  );
}
