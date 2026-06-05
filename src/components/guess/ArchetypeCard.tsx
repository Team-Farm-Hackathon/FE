import { motion } from "motion/react";
import { NPC_TYPES } from "../../constants/npcs";
import type { NpcType } from "../../types/game";
import { TYPE_HINT } from "./constants";

export default function ArchetypeCard({
  typeId,
  selected,
  disabled,
  isCorrect,
  isWrongPick,
  onClick,
  index = 0,
}: {
  typeId: NpcType;
  selected: boolean;
  disabled: boolean;
  isCorrect: boolean;
  isWrongPick: boolean;
  onClick: () => void;
  index?: number;
}) {
  const info = NPC_TYPES[typeId];

  const borderColor = isCorrect
    ? "border-[#8fbe70]"
    : isWrongPick
      ? "border-[#e87560]"
      : selected
        ? "border-[#e8b86b]"
        : "border-[#3d2818]";

  const ringEffect = selected && !disabled ? "ring-2 ring-[#e8b86b]/30" : "";

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={
        isWrongPick
          ? { opacity: 1, y: 0, scale: 1, x: [0, -8, 8, -6, 6, 0] }
          : { opacity: 1, y: 0, scale: 1 }
      }
      transition={
        isWrongPick
          ? { duration: 0.5 }
          : { delay: 0.05 + index * 0.08, duration: 0.4, ease: "easeOut" }
      }
      whileHover={disabled ? undefined : { y: -3, scale: 1.01 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      className={`group relative flex flex-col gap-3 rounded-md border-2 bg-[#1a1108] p-4 text-left transition-colors hover:border-[#8a6a3d] disabled:cursor-not-allowed md:p-5 ${borderColor} ${ringEffect}`}
    >
      <div className="flex items-center gap-3">
        <motion.div
          animate={
            isCorrect
              ? { scale: [1, 1.2, 1], rotate: [0, -8, 8, 0] }
              : undefined
          }
          transition={isCorrect ? { duration: 0.6 } : undefined}
          className="flex h-12 w-12 items-center justify-center rounded-sm border border-[#3d2818] bg-[#2a1d11] text-2xl"
        >
          {info.icon}
        </motion.div>
        <div>
          <p className="text-[9px] tracking-[0.3em] text-[#8a6a3d]">ARCHETYPE</p>
          <p className="mt-0.5 text-lg text-[#e8b86b] md:text-xl">
            {info.name}
          </p>
        </div>
      </div>

      <p className="text-xs leading-relaxed text-[#a88a5a] md:text-sm">
        {info.description}
      </p>

      <div className="mt-auto flex items-center gap-2 rounded-sm border-l-2 border-[#8a6a3d] bg-[#2a1d11] px-3 py-2">
        <span className="text-[10px] text-[#8a6a3d]">▸</span>
        <span className="text-[10px] tracking-wider text-[#d9c9a8] md:text-xs">
          {TYPE_HINT[typeId]}
        </span>
      </div>
    </motion.button>
  );
}
