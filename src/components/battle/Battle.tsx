import { useState } from "react";
import { useGameStore } from "../../store/useGameStore";
import { STAGES } from "../../constants/stages";
import { NPCS, NPC_ICON } from "../../constants/npcs";
import { type Choice } from "../../types/game";
import Header from "../common/Header";
import { NPC_TIER, type Phase } from "../../constants/battle";
import LeftPage from "./LeftPage";
import RightPage from "./RightPage";

export default function Battle() {
  const currentStage = useGameStore((s) => s.currentStage);
  const currentNpcId = useGameStore((s) => s.currentNpcId);
  const battleHistory = useGameStore((s) => s.battleHistory);
  const currentEvent = useGameStore((s) => s.currentEvent);
  const lastRoundPayoff = useGameStore((s) => s.lastRoundPayoff);
  const playRound = useGameStore((s) => s.playRound);
  const prepareNextRound = useGameStore((s) => s.prepareNextRound);
  const setScreen = useGameStore((s) => s.setScreen);

  const [phase, setPhase] = useState<Phase>("intro");
  const [introIdx, setIntroIdx] = useState(0);

  const stage = STAGES.find((s) => s.id === currentStage);
  if (!stage || !currentNpcId) return null;

  const npc = NPCS[currentNpcId];
  const icon = NPC_ICON[currentNpcId];
  const tier = NPC_TIER[currentNpcId];

  const totalRounds = stage.rounds;
  const isLastRound = battleHistory.length >= totalRounds;

  const handleChoose = (choice: Choice) => {
    playRound(choice);
    setPhase("result");
  };

  const handleNext = () => {
    if (battleHistory.length >= totalRounds) {
      setScreen("guess");
    } else {
      prepareNextRound();
      setPhase("choose");
    }
  };

  const handleIntroNext = () => {
    if (introIdx >= npc.intro.length - 1) {
      setPhase("choose");
    } else {
      setIntroIdx((i) => i + 1);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#1A1208]">
      <Header />
      <div className="mx-4 my-4 flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg bg-[#e8d9b5] shadow-[0_0_40px_rgba(0,0,0,0.5)] md:mx-8 md:my-6 md:flex-row lg:mx-12">
        <LeftPage
          npc={npc}
          eventId={currentEvent?.id ?? null}
          history={battleHistory}
        />

        <div className="hidden w-px bg-[#c9b48a]/40 md:block" />

        <RightPage
          npc={npc}
          icon={icon}
          tier={tier}
          phase={phase}
          history={battleHistory}
          payoff={lastRoundPayoff}
          isLastRound={isLastRound}
          introIdx={introIdx}
          onIntroNext={handleIntroNext}
          onChoose={handleChoose}
          onNext={handleNext}
        />
      </div>
    </div>
  );
}
