import { useState } from "react";
import { useGameStore } from "../../store/useGameStore";
import { NPCS } from "../../constants/npcs";
import type { NpcType } from "../../types/game";
import Header from "../common/Header";
import Dossier from "../guess/Dossier";
import Archetypes from "../guess/Archetypes";
import ActionBar from "../guess/ActionBar";
import type { GuessResult } from "../guess/constants";

export default function GuessNpc() {
  const currentNpcId = useGameStore((s) => s.currentNpcId);
  const battleHistory = useGameStore((s) => s.battleHistory);
  const submitGuess = useGameStore((s) => s.submitGuess);
  const returnToMap = useGameStore((s) => s.returnToMap);

  const [selected, setSelected] = useState<NpcType | null>(null);
  const [result, setResult] = useState<GuessResult>(null);

  if (!currentNpcId) return null;
  const correctType = NPCS[currentNpcId].type;

  const handleSubmit = () => {
    if (!selected) return;
    const isCorrect = submitGuess(selected);
    setResult(isCorrect ? "correct" : "wrong");
  };

  const handleSkip = () => {
    submitGuess(null);
    returnToMap();
  };

  const handleContinue = () => {
    returnToMap();
  };

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#1A1208]">
      <Header />

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4 md:flex-row md:gap-6 md:p-6">
        <Dossier npcId={currentNpcId} history={battleHistory} />
        <Archetypes
          selected={selected}
          result={result}
          correctType={correctType}
          onSelect={setSelected}
        />
      </div>

      <ActionBar
        result={result}
        correctType={correctType}
        selected={selected}
        onSubmit={handleSubmit}
        onSkip={handleSkip}
        onContinue={handleContinue}
      />
    </div>
  );
}
