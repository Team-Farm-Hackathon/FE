import { motion } from "motion/react";
import { CHOICE, type Round } from "../../../types/game";

export default function HistoryRow({
  round,
  npcName,
}: {
  round: Round;
  npcName: string;
}) {
  const myCoop = round.myChoice === CHOICE.COOPERATE;
  const oppCoop = round.oppChoice === CHOICE.COOPERATE;

  let label: string;
  let dot: "good" | "bad";
  if (myCoop && oppCoop) {
    label = "서로 협력";
    dot = "good";
  } else if (!myCoop && !oppCoop) {
    label = "서로 배신";
    dot = "bad";
  } else if (myCoop && !oppCoop) {
    label = `${npcName}이 배신`;
    dot = "bad";
  } else {
    label = "당신이 배신";
    dot = "bad";
  }

  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: -14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex items-center justify-between gap-3 text-[#5a4326]"
    >
      <div className="flex items-center gap-2">
        <span className="w-7 text-[10px] tracking-widest text-[#8a6a3d]">
          R{round.turn}
        </span>
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, duration: 0.3, ease: "backOut" }}
          className={`h-2 w-2 rounded-full ${
            dot === "good" ? "bg-[#4a7a3a]" : "bg-[#8a2a1a]"
          }`}
        />
        <span className="text-xs md:text-sm">{label}</span>
      </div>
    </motion.li>
  );
}
