import Header from "./common/Header";
import { useGameStore } from "../store/useGameStore";
import { STAGES } from "../constants/stages";
import ContinueCard from "./home/ContinueCard";
import ReputationCard from "./home/ReputationCard";
import JournalCard from "./home/JournalCard";

const TOTAL_STAGES = STAGES.length;

export default function Home() {
  const setScreen = useGameStore((s) => s.setScreen);
  const reset = useGameStore((s) => s.reset);
  const currentStage = useGameStore((s) => s.currentStage);
  const reputation = useGameStore((s) => s.reputation);
  const coopCount = useGameStore((s) => s.coopCount);
  const defectCount = useGameStore((s) => s.defectCount);
  const guessCorrect = useGameStore((s) => s.guessCorrect);

  const stage =
    STAGES.find((s) => s.id === currentStage) ?? STAGES[STAGES.length - 1];
  const totalRounds = coopCount + defectCount;
  const coopRate =
    totalRounds > 0 ? Math.round((coopCount / totalRounds) * 100) : 0;
  const defectRate = totalRounds > 0 ? 100 - coopRate : 0;

  return (
    <>
      <Header />
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 md:p-6">
        <ContinueCard
          stage={stage}
          currentStage={currentStage}
          totalStages={TOTAL_STAGES}
          onContinue={() => setScreen("playing")}
          onRestart={() => reset()}
        />
        <ReputationCard
          reputation={reputation}
          coopRate={coopRate}
          defectRate={defectRate}
          totalRounds={totalRounds}
          guessCorrect={guessCorrect}
        />
        <JournalCard currentStage={currentStage} totalStages={TOTAL_STAGES} />
      </div>
    </>
  );
}
