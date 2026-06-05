import { motion } from "motion/react";
import { ENDINGS, ENDING_ORDER } from "../../constants/endings";
import type { EndingId } from "../../types/game";

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
        {ENDING_ORDER.map((id, idx) => {
          const unlocked = unlockedEndings.includes(id);
          const isCurrent = id === currentEnding;

          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 1.0 + idx * 0.08,
                duration: 0.4,
                ease: "backOut",
              }}
              className={`flex h-20 w-20 flex-col items-center justify-center rounded-sm border-2 ${
                isCurrent
                  ? "border-[#e8b86b] bg-[#3d2818] shadow-[0_0_12px_rgba(232,184,107,0.4)]"
                  : unlocked
                    ? "border-[#8a6a3d] bg-[#2a1d11]"
                    : "border-[#3d2818] bg-[#1a1108]"
              }`}
            >
              <motion.span
                animate={
                  isCurrent
                    ? { scale: [1, 1.15, 1] }
                    : undefined
                }
                transition={
                  isCurrent
                    ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
                    : undefined
                }
                className="text-2xl"
              >
                {unlocked ? ENDINGS[id].icon : "?"}
              </motion.span>
              <span className="mt-1 text-[8px] tracking-widest text-[#8a6a3d]">
                {unlocked ? ENDINGS[id].name : "LOCKED"}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
