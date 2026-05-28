import { NPC_TYPES } from "../../../game/npcs";
import type { NpcType } from "../../../types/game";
import type { GuessResult } from "./constants";

export default function ActionBar({
  result,
  correctType,
  selected,
  onSubmit,
  onSkip,
  onContinue,
}: {
  result: GuessResult;
  correctType: NpcType;
  selected: NpcType | null;
  onSubmit: () => void;
  onSkip: () => void;
  onContinue: () => void;
}) {
  return (
    <div className="border-t-2 border-[#3d2818] bg-[#1a1108] px-4 py-3 md:px-6 md:py-4">
      {result === null ? (
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onSkip}
            className="flex-1 border-2 border-[#3d2818] bg-transparent py-3 text-sm tracking-widest text-[#8a6a3d] transition-colors hover:bg-[#2a1d11] active:translate-y-0.5 md:flex-none md:px-8"
          >
            건 너 뛰 기
          </button>
          <button
            onClick={onSubmit}
            disabled={!selected}
            className="flex-1 border-2 border-[#1a1108] bg-[#d9a04a] py-3 text-sm tracking-widest text-[#2a1d11] transition-transform hover:bg-[#e8b86b] active:translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 md:flex-none md:px-12"
          >
            추 리 제 출
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <p className="flex-1 text-sm tracking-wider md:text-base">
            {result === "correct" ? (
              <span className="text-[#8fbe70]">정답! +5 🪙</span>
            ) : (
              <span className="text-[#e87560]">
                오답... 정답은 "{NPC_TYPES[correctType].name}" -3 ⭐
              </span>
            )}
          </p>
          <button
            onClick={onContinue}
            className="border-2 border-[#1a1108] bg-[#d9a04a] px-6 py-3 text-sm tracking-widest text-[#2a1d11] transition-transform hover:bg-[#e8b86b] active:translate-y-0.5 md:px-10"
          >
            지 도 로 ▶
          </button>
        </div>
      )}
    </div>
  );
}
