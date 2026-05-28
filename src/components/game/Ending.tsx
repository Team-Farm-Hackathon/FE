import { useGameStore } from "../../store/useGameStore";
import { ENDINGS } from "../../game/endings";
import EndingCard from "./ending/EndingCard";
import Epilogue from "./ending/Epilogue";
import FinalLedger from "./ending/FinalLedger";
import CollectionBar from "./ending/CollectionBar";

export default function Ending() {
  const currentEnding = useGameStore((s) => s.currentEnding);
  const unlockedEndings = useGameStore((s) => s.unlockedEndings);
  const gold = useGameStore((s) => s.gold);
  const reputation = useGameStore((s) => s.reputation);
  const coopCount = useGameStore((s) => s.coopCount);
  const defectCount = useGameStore((s) => s.defectCount);
  const guessAttempts = useGameStore((s) => s.guessAttempts);
  const guessCorrect = useGameStore((s) => s.guessCorrect);
  const reset = useGameStore((s) => s.reset);

  if (!currentEnding) return null;

  const ending = ENDINGS[currentEnding];
  const totalRounds = coopCount + defectCount;
  const coopRate =
    totalRounds === 0 ? 0 : Math.round((coopCount / totalRounds) * 100);

  return (
    <div
      className="relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0805]"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(232,184,107,0.18), transparent 60%), conic-gradient(from 180deg at 50% 50%, transparent 0deg, rgba(232,184,107,0.05) 90deg, transparent 180deg, rgba(232,184,107,0.05) 270deg, transparent 360deg)",
      }}
    >
      {/* 상단 헤더 */}
      <header className="relative border-b border-[#3d2818] bg-[#0a0805]/80 py-3 text-center">
        <p className="text-xs tracking-[0.6em] text-[#e8b86b]">
          ★ ENDING UNLOCKED ★
        </p>
      </header>

      {/* 메인 */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-y-auto p-6">
        <div className="flex w-full max-w-6xl flex-col items-center justify-center gap-6 lg:flex-row lg:items-stretch lg:gap-8">
          <Epilogue message={ending.message} />
          <EndingCard ending={ending} />
          <FinalLedger
            gold={gold}
            reputation={reputation}
            coopRate={coopRate}
            defectCount={defectCount}
            guessCorrect={guessCorrect}
            guessAttempts={guessAttempts}
          />
        </div>
      </div>

      {/* 하단 */}
      <footer className="relative flex items-center justify-between gap-4 border-t border-[#3d2818] bg-[#0a0805]/80 px-6 py-4">
        <CollectionBar
          unlockedEndings={unlockedEndings}
          currentEnding={currentEnding}
        />

        <button
          onClick={() => reset()}
          className="border-2 border-[#1a1108] bg-[#d9a04a] px-6 py-3 text-sm tracking-widest text-[#2a1d11] transition-transform hover:bg-[#e8b86b] active:translate-y-0.5"
        >
          ↻ 다 시 도 전
        </button>
      </footer>
    </div>
  );
}
