import Modal from "../common/Modal";
import { ENDINGS } from "../../constants/endings";
import type { EndingId } from "../../types/game";

export default function EndingDetailModal({
  endingId,
  unlocked,
  onClose,
}: {
  endingId: EndingId | null;
  unlocked: boolean;
  onClose: () => void;
}) {
  const ending = endingId ? ENDINGS[endingId] : null;

  return (
    <Modal open={endingId !== null} onClose={onClose}>
      {ending && (
        <>
          <div className="flex items-center gap-4">
            <span className="text-5xl md:text-6xl">
              {unlocked ? ending.icon : "🔒"}
            </span>
            <div>
              <p className="text-[10px] tracking-[0.4em] text-[#8a6a3d]">
                ENDING
              </p>
              <h2 className="mt-1 text-2xl text-[#e8b86b] md:text-3xl">
                {unlocked ? ending.name : "???"}
              </h2>
              <p className="mt-1 text-xs text-[#a88a5a] italic md:text-sm">
                {unlocked ? ending.subtitle : "아직 걷지 않은 길."}
              </p>
            </div>
          </div>

          <hr className="my-5 border-[#3a2a1c]" />

          {unlocked ? (
            <p className="text-sm leading-relaxed text-[#d9c9a8] italic md:text-base">
              "{ending.message}"
            </p>
          ) : (
            <p className="text-sm leading-relaxed text-[#8a6a3d] italic md:text-base">
              아직 이 결말은 잠겨 있다. 다른 선택을 쌓아 새로운 길을 열어보라.
            </p>
          )}
        </>
      )}
    </Modal>
  );
}
