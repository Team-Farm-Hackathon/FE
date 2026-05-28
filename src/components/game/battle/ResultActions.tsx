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
      <div className="mt-6 rounded-md border border-[#c9b48a] bg-[#f5e6c8] p-4">
        <p className="text-sm leading-relaxed text-[#3d2818] md:text-base">
          "{reaction}"
        </p>
        <p className="mt-2 text-right text-xs text-[#8a6a3d]">— {npc.name}</p>
      </div>

      <div className="mt-4 flex justify-center gap-3">
        <DeltaChip kind="gold" value={payoff.goldDelta} />
        <DeltaChip kind="rep" value={payoff.repDelta} />
      </div>

      <button
        onClick={onNext}
        className="mt-6 w-full border-2 border-[#1a1108] bg-[#d9a04a] py-4 text-sm tracking-widest text-[#2a1d11] transition-transform hover:bg-[#e8b86b] active:translate-y-0.5 md:py-5 md:text-base"
      >
        {isLastRound ? "추 리 하 기 ▶" : "다 음 ▶"}
      </button>
    </>
  );
}
