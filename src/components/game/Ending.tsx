import { useGameStore } from "../../store/useGameStore";
import { ENDINGS, ENDING_ORDER } from "../../game/endings";

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
  const coopRate = totalRounds === 0 ? 0 : Math.round((coopCount / totalRounds) * 100);
  const guessAccuracy =
    guessAttempts === 0 ? 0 : Math.round((guessCorrect / guessAttempts) * 100);

  return (
    <div className="flex h-screen w-full flex-col bg-[#1A1208]">
      <div className="flex-1 overflow-y-auto px-5 py-5">
        <h2 className="text-center text-sm tracking-[0.4em] text-[#e8b86b]">
          ★ ENDING UNLOCKED ★
        </h2>

        <div className="mt-5 flex flex-col items-center gap-2 border-2 border-[#8a6a3d] bg-[#2a1d11] p-6">
          <span className="text-5xl">{ending.icon}</span>
          <h1 className="text-2xl tracking-widest text-[#e8b86b] drop-shadow-[2px_2px_0_#000]">
            {ending.name}
          </h1>
          <p className="text-xs text-[#8a6a3d]">{ending.subtitle}</p>
        </div>

        <div className="mt-3 rounded border-2 border-[#8a6a3d] bg-[#1a1108] p-4">
          <p className="text-sm leading-relaxed text-[#f5e6c8]">
            "{ending.message}"
          </p>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <StatBox label="최종 골드" value={`${gold} 🪙`} />
          <StatBox label="평판" value={`${reputation} ⭐`} />
          <StatBox label="협력률" value={`${coopRate}%`} />
          <StatBox label="추리 정확도" value={`${guessCorrect}/${guessAttempts}`} subtext={`${guessAccuracy}%`} />
        </div>

        <div className="mt-5">
          <p className="text-[10px] tracking-widest text-[#8a6a3d]">
            ENDING COLLECTION {unlockedEndings.length} / {ENDING_ORDER.length}
          </p>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {ENDING_ORDER.map((id) => {
              const unlocked = unlockedEndings.includes(id);
              const isCurrent = id === currentEnding;
              return (
                <div
                  key={id}
                  className={`flex aspect-square items-center justify-center border-2 ${
                    isCurrent
                      ? "border-[#e8b86b] bg-[#3d2818]"
                      : unlocked
                        ? "border-[#8a6a3d] bg-[#2a1d11]"
                        : "border-[#3d2818] bg-[#1a1108]"
                  }`}
                >
                  <span className="text-2xl">
                    {unlocked ? ENDINGS[id].icon : "?"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t-2 border-[#3d2818] bg-[#1a1108] p-3">
        <div className="flex gap-2">
          <button
            onClick={() => reset()}
            className="flex-1 border-2 border-[#1a1108] bg-[#d9a04a] py-3 text-sm tracking-widest text-[#2a1d11] transition-transform hover:bg-[#e8b86b] active:translate-y-0.5"
          >
            ↻ 다 시 도 전
          </button>
          <button
            disabled
            className="border-2 border-[#3d2818] bg-transparent px-5 py-3 text-sm tracking-widest text-[#8a6a3d] opacity-60"
          >
            공 유
          </button>
        </div>
      </div>
    </div>
  );
}

function StatBox({
  label,
  value,
  subtext,
}: {
  label: string;
  value: string;
  subtext?: string;
}) {
  return (
    <div className="border-2 border-[#3d2818] bg-[#2a1d11] p-3">
      <p className="text-[10px] tracking-widest text-[#8a6a3d]">{label}</p>
      <p className="mt-1 text-xl text-[#e8b86b]">{value}</p>
      {subtext && <p className="text-[10px] text-[#8a6a3d]">{subtext}</p>}
    </div>
  );
}
