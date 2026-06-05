import { ENDING_ORDER } from "../../constants/endings";
import type { EndingId } from "../../types/game";
import EndingCardItem from "./EndingCardItem";

export default function EndingGrid({
  unlockedEndings,
  onSelect,
}: {
  unlockedEndings: EndingId[];
  onSelect: (id: EndingId) => void;
}) {
  return (
    <section className="rounded-lg border border-[#3a2a1c] bg-[#2a1d11] p-6 md:p-8">
      <div className="mb-5 flex items-end justify-between md:mb-6">
        <div>
          <p className="text-[10px] tracking-[0.3em] text-[#6a4e2d] md:text-xs">
            ENDINGS
          </p>
          <h2 className="mt-2 text-xl text-[#e8b86b] md:text-2xl">걸어온 길</h2>
        </div>
        <p className="text-[10px] tracking-[0.3em] text-[#6a4e2d] md:text-xs">
          {unlockedEndings.length} / {ENDING_ORDER.length}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        {ENDING_ORDER.map((id) => (
          <EndingCardItem
            key={id}
            id={id}
            unlocked={unlockedEndings.includes(id)}
            onClick={() => onSelect(id)}
          />
        ))}
      </div>
    </section>
  );
}
