import { ENDINGS, ENDING_ORDER } from "../../../game/endings";
import type { EndingId } from "../../../types/game";

export default function CollectionBar({
  unlockedEndings,
  currentEnding,
}: {
  unlockedEndings: EndingId[];
  currentEnding: EndingId;
}) {
  return (
    <div className="flex flex-col">
      <p className="text-[10px] tracking-[0.3em] text-[#8a6a3d]">
        ENDING COLLECTION {unlockedEndings.length} / {ENDING_ORDER.length}
      </p>
      <div className="mt-3 flex gap-3">
        {ENDING_ORDER.map((id) => {
          const unlocked = unlockedEndings.includes(id);
          const isCurrent = id === currentEnding;

          return (
            <div
              key={id}
              className={`flex h-20 w-20 flex-col items-center justify-center rounded-sm border-2 ${
                isCurrent
                  ? "border-[#e8b86b] bg-[#3d2818] shadow-[0_0_12px_rgba(232,184,107,0.4)]"
                  : unlocked
                    ? "border-[#8a6a3d] bg-[#2a1d11]"
                    : "border-[#3d2818] bg-[#1a1108]"
              }`}
            >
              <span className="text-2xl">
                {unlocked ? ENDINGS[id].icon : "?"}
              </span>
              <span className="mt-1 text-[8px] tracking-widest text-[#8a6a3d]">
                {unlocked ? ENDINGS[id].name : "LOCKED"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
