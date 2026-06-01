import { motion } from "motion/react";
import type { Npc, PayoffResult, Round } from "../../../types/game";
import { reactionKeyOf } from "./constants";
import DeltaChip from "./DeltaChip";

export default function ResultActions({
  npc,
  lastRound,
  payoff,
  isLastRound,
  onNext,
}: {
  npc: Npc;
  lastRound: Round | undefined;
  payoff: PayoffResult | null;
  isLastRound: boolean;
  onNext: () => void;
}) {
  if (!lastRound || !payoff) return null;

  const reaction = npc.reactions[reactionKeyOf(lastRound.myChoice, lastRound.oppChoice)];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.35 }}
        className="mt-6 rounded-md border border-[#c9b48a] bg-[#f5e6c8] p-4"
      >
        <p className="text-sm leading-relaxed text-[#3d2818] md:text-base">
          "{reaction}"
        </p>
        <p className="mt-2 text-right text-xs text-[#8a6a3d]">— {npc.name}</p>
      </motion.div>

      <div className="mt-4 flex justify-center gap-3">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.7 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.45, ease: "backOut" }}
        >
          <DeltaChip kind="gold" value={payoff.goldDelta} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.7 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.45, duration: 0.45, ease: "backOut" }}
        >
          <DeltaChip kind="rep" value={payoff.repDelta} />
        </motion.div>
      </div>

      <motion.button
        onClick={onNext}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.35 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97, y: 2 }}
        className="mt-6 w-full border-2 border-[#1a1108] bg-[#d9a04a] py-4 text-sm tracking-widest text-[#2a1d11] hover:bg-[#e8b86b] md:py-5 md:text-base"
      >
        {isLastRound ? "추 리 하 기 ▶" : "다 음 ▶"}
      </motion.button>
    </>
  );
}
