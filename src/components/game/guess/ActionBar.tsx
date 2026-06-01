import { AnimatePresence, motion } from "motion/react";
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
      <AnimatePresence mode="wait">
        {result === null ? (
          <motion.div
            key="pick"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex items-center justify-end gap-3"
          >
            <motion.button
              onClick={onSkip}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97, y: 2 }}
              className="flex-1 border-2 border-[#3d2818] bg-transparent py-3 text-sm tracking-widest text-[#8a6a3d] transition-colors hover:bg-[#2a1d11] md:flex-none md:px-8"
            >
              건 너 뛰 기
            </motion.button>
            <motion.button
              onClick={onSubmit}
              disabled={!selected}
              whileHover={selected ? { scale: 1.02 } : undefined}
              whileTap={selected ? { scale: 0.97, y: 2 } : undefined}
              className="flex-1 border-2 border-[#1a1108] bg-[#d9a04a] py-3 text-sm tracking-widest text-[#2a1d11] hover:bg-[#e8b86b] disabled:cursor-not-allowed disabled:opacity-50 md:flex-none md:px-12"
            >
              추 리 제 출
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex items-center gap-3"
          >
            <p className="flex-1 text-sm tracking-wider md:text-base">
              {result === "correct" ? (
                <motion.span
                  initial={{ scale: 0.7 }}
                  animate={{ scale: [0.7, 1.15, 1] }}
                  transition={{ duration: 0.5 }}
                  className="inline-block text-[#8fbe70]"
                >
                  정답! +5 🪙
                </motion.span>
              ) : (
                <motion.span
                  animate={{ x: [0, -6, 6, -4, 4, 0] }}
                  transition={{ duration: 0.45 }}
                  className="inline-block text-[#e87560]"
                >
                  오답... 정답은 "{NPC_TYPES[correctType].name}" -3 ⭐
                </motion.span>
              )}
            </p>
            <motion.button
              onClick={onContinue}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97, y: 2 }}
              className="border-2 border-[#1a1108] bg-[#d9a04a] px-6 py-3 text-sm tracking-widest text-[#2a1d11] hover:bg-[#e8b86b] md:px-10"
            >
              지 도 로 ▶
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
