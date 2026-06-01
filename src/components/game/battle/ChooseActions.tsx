import { motion } from "motion/react";
import { CHOICE, type Choice } from "../../../types/game";

export default function ChooseActions({
  onChoose,
}: {
  onChoose: (c: Choice) => void;
}) {
  return (
    <div className="mt-4 flex gap-3">
      <motion.button
        onClick={() => onChoose(CHOICE.COOPERATE)}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.05, duration: 0.4, ease: "easeOut" }}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.95, y: 2 }}
        className="flex flex-1 flex-col items-center justify-center gap-1 border-2 border-[#1a1108] bg-[#4a7a3a] py-4 hover:bg-[#5c9050] md:py-6"
      >
        <span className="text-lg tracking-widest text-[#f5e6c8] md:text-xl">
          협 력
        </span>
        <span className="text-[10px] tracking-[0.3em] text-[#c8e0b0]">
          COOPERATE
        </span>
      </motion.button>
      <motion.button
        onClick={() => onChoose(CHOICE.DEFECT)}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.05, duration: 0.4, ease: "easeOut" }}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.95, y: 2 }}
        className="flex flex-1 flex-col items-center justify-center gap-1 border-2 border-[#1a1108] bg-[#8a2a1a] py-4 hover:bg-[#a83828] md:py-6"
      >
        <span className="text-lg tracking-widest text-[#f5e6c8] md:text-xl">
          배 신
        </span>
        <span className="text-[10px] tracking-[0.3em] text-[#f0c0b0]">
          BETRAY
        </span>
      </motion.button>
    </div>
  );
}
