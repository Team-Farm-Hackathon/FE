import { motion } from "motion/react";
import type { Stage } from "../../constants/stages";

type NodeStatus = "locked" | "current" | "cleared";

type StageNodeProps = {
  stage: Stage;
  status: NodeStatus;
  onClick: () => void;
  index?: number;
};

export default function StageNode({
  stage,
  status,
  onClick,
  index = 0,
}: StageNodeProps) {
  const disabled = status === "locked";

  const boxClass =
    status === "current"
      ? "bg-[#f5e6c8] border-[#3d2818]"
      : status === "cleared"
        ? "bg-[#d9c9a8] border-[#3d2818]"
        : "bg-[#2a1d11] border-[#1a1108] opacity-60";

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      initial={{ opacity: 0, y: 18, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: 0.15 + index * 0.06,
        duration: 0.45,
        ease: "backOut",
      }}
      whileHover={disabled ? undefined : { scale: 1.08, y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.94 }}
      className="flex flex-col items-center gap-2 disabled:cursor-not-allowed"
    >
      <motion.div
        animate={
          status === "current"
            ? {
                boxShadow: [
                  "3px 3px 0 #000, 0 0 0 rgba(232,184,107,0)",
                  "3px 3px 0 #000, 0 0 18px rgba(232,184,107,0.55)",
                  "3px 3px 0 #000, 0 0 0 rgba(232,184,107,0)",
                ],
              }
            : undefined
        }
        transition={
          status === "current"
            ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
            : undefined
        }
        className={`flex h-16 w-16 items-center justify-center border-4 ${boxClass} shadow-[3px_3px_0_#000]`}
      >
        <span className="text-3xl">{disabled ? "🔒" : stage.icon}</span>
      </motion.div>
      <div className="bg-[#1a1108] px-2 py-0.5 text-[10px] tracking-wider text-[#e8b86b]">
        STAGE {stage.id} {status === "cleared" ? "완료" : stage.name}
      </div>
    </motion.button>
  );
}
