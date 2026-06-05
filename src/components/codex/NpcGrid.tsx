import { NPC_ORDER } from "../../constants/npcs";
import type { NpcId } from "../../types/game";
import NpcCardItem from "./NpcCardItem";

export default function NpcGrid({
  metNpcs,
  onSelect,
}: {
  metNpcs: NpcId[];
  onSelect: (id: NpcId) => void;
}) {
  const unlockedCount = NPC_ORDER.filter((id) => metNpcs.includes(id)).length;

  return (
    <section className="rounded-lg border border-[#3a2a1c] bg-[#2a1d11] p-6 md:p-8">
      <div className="mb-5 flex items-end justify-between md:mb-6">
        <div>
          <p className="text-[10px] tracking-[0.3em] text-[#6a4e2d] md:text-xs">
            CHARACTERS
          </p>
          <h2 className="mt-2 text-xl text-[#e8b86b] md:text-2xl">
            마주친 자들
          </h2>
        </div>
        <p className="text-[10px] tracking-[0.3em] text-[#6a4e2d] md:text-xs">
          {unlockedCount} / {NPC_ORDER.length}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {NPC_ORDER.map((id) => (
          <NpcCardItem
            key={id}
            id={id}
            unlocked={metNpcs.includes(id)}
            onClick={() => onSelect(id)}
          />
        ))}
      </div>
    </section>
  );
}
