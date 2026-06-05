import { CHOICE, type Round } from "../../types/game";
import ChoiceBadge from "./ChoiceBadge";

export default function RoundRow({ round }: { round: Round }) {
  const myCoop = round.myChoice === CHOICE.COOPERATE;
  const oppCoop = round.oppChoice === CHOICE.COOPERATE;

  return (
    <div className="flex items-center gap-3 rounded-sm border border-[#3d2818] bg-[#1a1108] px-3 py-1.5">
      <span className="flex gap-0.5 items-center justify-center text-[9px] leading-none tracking-widest text-[#8a6a3d]">
        <span>ROUND</span>
        <span className=" text-[#e8b86b]">{round.turn}</span>
      </span>
      <span className="text-[10px] text-[#8a6a3d]">나</span>
      <ChoiceBadge isCoop={myCoop} />
      <span className="text-[#8a6a3d]">→</span>
      <span className="text-[10px] text-[#8a6a3d]">상대</span>
      <ChoiceBadge isCoop={oppCoop} />
    </div>
  );
}
