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
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 md:p-6">
        {/* 이어하기 */}
        <section className="relative min-h-72 overflow-hidden rounded-lg border border-[#3a2a1c] bg-[#2a1d11] p-6 md:min-h-90 md:p-8 lg:p-10">
          <p className="text-[10px] tracking-[0.3em] text-[#6a4e2d] md:text-xs">
            이어 하기 · STAGE {currentStage} / {TOTAL_STAGES}
          </p>
          <h2 className="mt-3 text-2xl text-[#e8b86b] md:text-3xl">
            {stage.name}
          </h2>
          <p className="mt-3 max-w-[60%] text-xs leading-relaxed text-[#a88a5a] md:max-w-xs md:text-sm">
            {stage.areaLabel}의 거래. 라운드 1 / {stage.rounds}.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2 md:mt-8 md:gap-3">
            <button
              onClick={onContinue}
              disabled={!hasProgress}
              className="border-2 border-[#1a1108] bg-[#6a8a4a] px-4 py-2 text-xs tracking-widest text-[#1a1108] transition-transform hover:bg-[#7a9a5a] active:translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 md:px-6 md:py-3 md:text-sm"
            >
              여 정 잇 기
            </button>
            <button
              onClick={onRestart}
              className="border border-[#5a4a2a] px-4 py-2 text-xs text-[#c89a5a] transition-colors hover:border-[#e8b86b] hover:text-[#e8b86b] md:px-5 md:py-3 md:text-sm"
            >
              처음부터
            </button>
          </div>

          <img
            src={Player}
            alt="player"
            className="absolute right-4 bottom-4 size-28 rounded-md bg-[#1a1208]/40 object-contain p-2 md:right-6 md:bottom-6 md:size-40 lg:right-8 lg:bottom-8 lg:size-50"
          />
        </section>

        {/* 나의 평판 */}
        <section className="rounded-lg border border-[#3a2a1c] bg-[#2a1d11] p-6 md:min-h-90 md:p-8 lg:p-10">
          <p className="text-[10px] tracking-[0.3em] text-[#6a4e2d] md:text-xs">
            나의 평판
          </p>
          <p className="mt-3 text-4xl text-[#e8b86b] md:text-5xl">
            {reputation}
          </p>
          <p className="mt-2 text-xs text-[#a88a5a] md:text-sm">
            {reputation >= 70
              ? "믿을 만한 자라 불리기 시작했다."
              : reputation >= 40
                ? "이름이 조금씩 알려지고 있다."
                : "신뢰를 잃어가고 있다."}
          </p>

          <hr className="my-4 border-[#3a2a1c] md:my-5" />

          <div className="grid grid-cols-2 gap-y-4 md:gap-y-5">
            <div>
              <p className="text-[10px] tracking-widest text-[#6a4e2d] md:text-xs">
                협력률
              </p>
              <p className="mt-1 text-xl text-[#e8b86b] md:text-2xl">
                {coopRate}%
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-widest text-[#6a4e2d] md:text-xs">
                배신률
              </p>
              <p className="mt-1 text-xl text-[#e8b86b] md:text-2xl">
                {defectRate}%
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-widest text-[#6a4e2d] md:text-xs">
                총 라운드
              </p>
              <p className="mt-1 text-xl text-[#e8b86b] md:text-2xl">
                {totalRounds}회
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-widest text-[#6a4e2d] md:text-xs">
                정체 적중
              </p>
              <p className="mt-1 text-xl text-[#e8b86b] md:text-2xl">
                {guessCorrect}회
              </p>
            </div>
          </div>
        </section>

        {/* 새로 만난 자들 (도감) */}
        <section className="rounded-lg border border-[#3a2a1c] bg-[#2a1d11] p-6 md:col-span-2 md:p-8">
          <div className="mb-4 flex items-end justify-between md:mb-5">
            <p className="text-[10px] tracking-[0.3em] text-[#6a4e2d] md:text-xs">
              새로 만난 자들
            </p>
            <p className="text-[10px] tracking-[0.3em] text-[#6a4e2d] md:text-xs">
              DEX · {dexCleared} / {dexTotal}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {STAGES_ASC.map((stageItem) => {
              const repNpcId = stageItem.npcPool[0];
              const repNpc = NPCS[repNpcId];
              const unlocked = guessedTypes.includes(repNpc.type);
              const tier = STAGE_TIER[stageItem.id];

              return (
                <div
                  key={stageItem.id}
                  className={`relative flex flex-col rounded-md border p-3 transition-colors md:p-5 ${
                    unlocked
                      ? "border-[#3a2a1c] bg-[#1a1208]"
                      : "border-[#2a1f12] bg-[#1a1208]/60"
                  }`}
                >
                  <div className="flex h-28 w-full items-center justify-center md:h-40 lg:h-56">
                    {unlocked ? (
                      <img
                        src={NPC_ICON[repNpcId]}
                        alt={repNpc.name}
                        className="h-24 w-24 object-contain md:h-32 md:w-32 lg:h-44 lg:w-44"
                      />
                    ) : (
                      <span className="text-4xl text-[#5a4a2a] md:text-5xl">
                        🔒
                      </span>
                    )}
                  </div>
                  <div className="mt-2">
                    <p
                      className={`text-xs md:text-sm ${
                        unlocked ? "text-[#e8b86b]" : "text-[#5a4a2a]"
                      }`}
                    >
                      {unlocked ? repNpc.name : "???"}
                    </p>
                    <p className="mt-0.5 text-[9px] tracking-widest text-[#6a4e2d] md:text-[10px]">
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