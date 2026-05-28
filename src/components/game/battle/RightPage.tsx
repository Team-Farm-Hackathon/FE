import type { Choice, Npc, PayoffResult, Round } from "../../../types/game";
import type { Phase } from "./constants";
import IntroActions from "./IntroActions";
import ChooseActions from "./ChooseActions";
import ResultActions from "./ResultActions";

export default function RightPage({
  npc,
  icon,
  tier,
  phase,
  history,
  payoff,
  isLastRound,
  introIdx,
  onIntroNext,
  onChoose,
  onNext,
}: {
  npc: Npc;
  icon: string;
  tier: "I" | "II" | "III";
  phase: Phase;
  history: Round[];
  payoff: PayoffResult | null;
  isLastRound: boolean;
  introIdx: number;
  onIntroNext: () => void;
  onChoose: (c: Choice) => void;
  onNext: () => void;
}) {
  const lastRound = history[history.length - 1];

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-y-auto p-6 md:p-10">
      <div className="mt-3 flex aspect-4/3 w-full items-center justify-center overflow-hidden rounded-md bg-linear-to-b from-[#8a9aa8] to-[#3d2818]">
        <img
          src={icon}
          alt={npc.name}
          className="h-40 w-40 object-contain md:h-56 md:w-56 lg:h-64 lg:w-64"
        />
      </div>

      <div className="mt-4 border-b border-[#c9b48a] pb-4">
        <p className="text-[10px] tracking-[0.3em] text-[#8a6a3d] md:text-xs">
          VILLAIN · TIER {tier}
        </p>
        <p className="mt-1 text-xl text-[#3d2818] md:text-2xl">{npc.name}</p>
      </div>

      {phase === "intro" && (
        <IntroActions
          intro={npc.intro}
          introIdx={introIdx}
          onNext={onIntroNext}
        />
      )}
      {phase === "choose" && <ChooseActions onChoose={onChoose} />}
      {phase === "result" && (
        <ResultActions
          npc={npc}
          lastRound={lastRound}
          payoff={payoff}
          isLastRound={isLastRound}
          onNext={onNext}
        />
      )}
    </div>
  );
}
