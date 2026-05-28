import Header from "./common/Header";
import { Player } from "../assets";
import { useGameStore } from "../store/useGameStore";
import { STAGES } from "../game/stages";
import { NPCS, NPC_ICON } from "../game/npcs";

const TOTAL_STAGES = STAGES.length;
const STAGE_TIER: Record<number, "I" | "II" | "III"> = {
  1: "I",
  2: "II",
  3: "III",
  4: "III",
};
const STAGES_ASC = [...STAGES].sort((a, b) => a.id - b.id);

export default function Home() {
  const setScreen = useGameStore((s) => s.setScreen);
  const reset = useGameStore((s) => s.reset);
  const currentStage = useGameStore((s) => s.currentStage);
  const unlockedStage = useGameStore((s) => s.unlockedStage);
  const reputation = useGameStore((s) => s.reputation);
  const coopCount = useGameStore((s) => s.coopCount);
  const defectCount = useGameStore((s) => s.defectCount);
  const guessCorrect = useGameStore((s) => s.guessCorrect);
  const guessedTypes = useGameStore((s) => s.guessedTypes);

  const stage = STAGES.find((s) => s.id === currentStage) ?? STAGES[STAGES.length - 1];
  const totalRounds = coopCount + defectCount;
  const coopRate = totalRounds > 0 ? Math.round((coopCount / totalRounds) * 100) : 0;
  const defectRate = totalRounds > 0 ? 100 - coopRate : 0;
  const reputationDelta = reputation - 50;
  const dexCleared = guessedTypes.length;
  const dexTotal = 4;
  const hasProgress = unlockedStage > 1 || totalRounds > 0;

  const onContinue = () => setScreen("playing");
  const onRestart = () => {
    reset();
    setScreen("playing");
  };

  return (
    <>
      <Header />
      <div className="grid grid-cols-2 gap-4 p-6">
        {/* 이어하기 */}
        <section className="relative min-h-90 overflow-hidden rounded-lg border border-[#3a2a1c] bg-[#2a1d11] p-10">
          <p className="text-xs tracking-[0.3em] text-[#6a4e2d]">
            이어 하기 · STAGE {currentStage} / {TOTAL_STAGES}
          </p>
          <h2 className="mt-3 text-3xl text-[#e8b86b]">{stage.name}</h2>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#a88a5a]">
            {stage.areaLabel}의 거래. 라운드 1 / {stage.rounds}.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <button
              onClick={onContinue}
              disabled={!hasProgress}
              className="border-2 border-[#1a1108] bg-[#6a8a4a] px-6 py-3 text-sm tracking-widest text-[#1a1108] transition-transform hover:bg-[#7a9a5a] active:translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              여 정 잇 기
            </button>
            <button
              onClick={onRestart}
              className="border border-[#5a4a2a] px-5 py-3 text-sm text-[#c89a5a] transition-colors hover:border-[#e8b86b] hover:text-[#e8b86b]"
            >
              처음부터
            </button>
          </div>

          <img
            src={Player}
            alt="player"
            className="absolute right-8 bottom-8 size-50 rounded-md bg-[#1a1208]/40 object-contain p-2"
          />
        </section>

        {/* 나의 평판 */}
        <section className="min-h-90 rounded-lg border border-[#3a2a1c] bg-[#2a1d11] p-10">
          <p className="text-xs tracking-[0.3em] text-[#6a4e2d]">나의 평판</p>
          <p className="mt-3 text-5xl text-[#e8b86b]">
            {reputationDelta >= 0 ? "+" : ""}
            {reputationDelta}
          </p>
          <p className="mt-2 text-sm text-[#a88a5a]">
            {reputationDelta >= 10
              ? "믿을 만한 자라 불리기 시작했다."
              : reputationDelta >= 0
                ? "이름이 조금씩 알려지고 있다."
                : "신뢰를 잃어가고 있다."}
          </p>

          <hr className="my-5 border-[#3a2a1c]" />

          <div className="grid grid-cols-2 gap-y-5">
            <div>
              <p className="text-xs tracking-widest text-[#6a4e2d]">협력률</p>
              <p className="mt-1 text-2xl text-[#e8b86b]">{coopRate}%</p>
            </div>
            <div>
              <p className="text-xs tracking-widest text-[#6a4e2d]">배신률</p>
              <p className="mt-1 text-2xl text-[#e8b86b]">{defectRate}%</p>
            </div>
            <div>
              <p className="text-xs tracking-widest text-[#6a4e2d]">총 라운드</p>
              <p className="mt-1 text-2xl text-[#e8b86b]">{totalRounds}회</p>
            </div>
            <div>
              <p className="text-xs tracking-widest text-[#6a4e2d]">정체 적중</p>
              <p className="mt-1 text-2xl text-[#e8b86b]">{guessCorrect}회</p>
            </div>
          </div>
        </section>

        {/* 새로 만난 자들 (도감) */}
        <section className="col-span-2 rounded-lg border border-[#3a2a1c] bg-[#2a1d11] p-8">
          <div className="mb-5 flex items-end justify-between">
            <p className="text-xs tracking-[0.3em] text-[#6a4e2d]">새로 만난 자들</p>
            <p className="text-xs tracking-[0.3em] text-[#6a4e2d]">
              DEX · {dexCleared} / {dexTotal}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STAGES_ASC.map((stageItem) => {
              const repNpcId = stageItem.npcPool[0];
              const repNpc = NPCS[repNpcId];
              const unlocked = guessedTypes.includes(repNpc.type);
              const tier = STAGE_TIER[stageItem.id];

              return (
                <div
                  key={stageItem.id}
                  className={`relative flex flex-col rounded-md border p-5 transition-colors ${
                    unlocked
                      ? "border-[#3a2a1c] bg-[#1a1208]"
                      : "border-[#2a1f12] bg-[#1a1208]/60"
                  }`}
                >
                  <div className="flex h-56 w-full items-center justify-center">
                    {unlocked ? (
                      <img
                        src={NPC_ICON[repNpcId]}
                        alt={repNpc.name}
                        className="h-44 w-44 object-contain"
                      />
                    ) : (
                      <span className="text-5xl text-[#5a4a2a]">🔒</span>
                    )}
                  </div>
                  <div className="mt-2">
                    <p
                      className={`text-sm ${
                        unlocked ? "text-[#e8b86b]" : "text-[#5a4a2a]"
                      }`}
                    >
                      {unlocked ? repNpc.name : "???"}
                    </p>
                    <p className="mt-0.5 text-[10px] tracking-widest text-[#6a4e2d]">
                      TIER {tier}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}