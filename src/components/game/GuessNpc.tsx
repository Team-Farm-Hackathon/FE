import { useState } from "react";
import { useGameStore } from "../../store/useGameStore";
import { NPCS, NPC_TYPES } from "../../game/npcs";
import { CHOICE, type NpcType, type Round } from "../../types/game";
import Header from "../common/Header";

const TYPE_ORDER: NpcType[] = [
  "naiveType",
  "cheaterType",
  "avengerType",
  "jokerType",
];

export default function GuessNpc() {
  const currentNpcId = useGameStore((s) => s.currentNpcId);
  const battleHistory = useGameStore((s) => s.battleHistory);
  const submitGuess = useGameStore((s) => s.submitGuess);
  const returnToMap = useGameStore((s) => s.returnToMap);

  const [selected, setSelected] = useState<NpcType | null>(null);
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);

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
    <div className="flex h-screen w-full flex-col bg-[#1A1208]">
      <Header />

      <div className="flex-1 overflow-y-auto px-5 py-4">
        <h2 className="text-center text-lg tracking-widest text-[#e8b86b]">
          이 상인은 어떤 유형인가?
        </h2>

        <HistoryBox history={battleHistory} />

        <div className="mt-5 grid grid-cols-2 gap-3">
          {TYPE_ORDER.map((typeId) => (
            <TypeCard
              key={typeId}
              typeId={typeId}
              selected={selected === typeId}
              disabled={result !== null}
              isCorrect={result !== null && typeId === correctType}
              isWrongPick={
                result === "wrong" && typeId === selected && typeId !== correctType
              }
              onClick={() => setSelected(typeId)}
            />
          ))}
        </div>
      </div>

      <div className="border-t-2 border-[#3d2818] bg-[#1a1108] px-5 py-3">
        {result === null ? (
          <>
            <p className="mb-3 text-center text-xs tracking-widest text-[#8a6a3d]">
              정답 <span className="text-[#e8b86b]">+5 🪙</span> / 오답{" "}
              <span className="text-[#e87560]">-3 ⭐</span>
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleSkip}
                className="flex-1 border-2 border-[#3d2818] bg-transparent py-3 text-sm tracking-widest text-[#8a6a3d] hover:bg-[#2a1d11] active:translate-y-0.5"
              >
                건 너 뛰 기
              </button>
              <button
                onClick={handleSubmit}
                disabled={!selected}
                className="flex-1 border-2 border-[#1a1108] bg-[#d9a04a] py-3 text-sm tracking-widest text-[#2a1d11] transition-transform hover:bg-[#e8b86b] active:translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
              >
                추 리 제 출
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="mb-3 text-center text-sm tracking-widest">
              {result === "correct" ? (
                <span className="text-[#8fbe70]">정답! +5 🪙</span>
              ) : (
                <span className="text-[#e87560]">
                  오답... 정답은 "{NPC_TYPES[correctType].name}" -3 ⭐
                </span>
              )}
            </p>
            <button
              onClick={handleContinue}
              className="w-full border-2 border-[#1a1108] bg-[#d9a04a] py-3 text-sm tracking-widest text-[#2a1d11] transition-transform hover:bg-[#e8b86b] active:translate-y-0.5"
            >
              지 도 로 ▶
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function HistoryBox({ history }: { history: Round[] }) {
  return (
    <div className="mt-4 flex gap-3 rounded border-2 border-[#8a6a3d] bg-[#2a1d11] p-3">
      <div className="flex h-32 w-20 shrink-0 items-center justify-center border-2 border-[#3d2818] bg-[#1a1108]">
        <span className="text-3xl text-[#8a6a3d]">?</span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5">
        <span className="text-[10px] tracking-widest text-[#8a6a3d]">
          지난 행동 — 단서
        </span>
        {history.map((r) => (
          <div
            key={r.turn}
            className="flex items-center gap-2 text-[10px] tracking-wider text-[#d9c9a8]"
          >
            <span className="w-6 text-[#8a6a3d]">R{r.turn}</span>
            <span>나</span>
            <ChoicePixel choice={r.myChoice} />
            <span className="text-[#8a6a3d]">→</span>
            <span>상대</span>
            <ChoicePixel choice={r.oppChoice} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ChoicePixel({ choice }: { choice: Round["myChoice"] }) {
  const isCoop = choice === CHOICE.COOPERATE;
  return (
    <div
      className={`flex h-5 w-7 items-center justify-center border border-[#1a1108] ${
        isCoop ? "bg-[#4a7a3a]" : "bg-[#8a2a1a]"
      }`}
    >
      <span className="text-[10px] text-[#f5e6c8]">{isCoop ? "🤝" : "🗡"}</span>
    </div>
  );
}

function TypeCard({
  typeId,
  selected,
  disabled,
  isCorrect,
  isWrongPick,
  onClick,
}: {
  typeId: NpcType;
  selected: boolean;
  disabled: boolean;
  isCorrect: boolean;
  isWrongPick: boolean;
  onClick: () => void;
}) {
  const info = NPC_TYPES[typeId];

  const borderColor = isCorrect
    ? "border-[#8fbe70]"
    : isWrongPick
      ? "border-[#e87560]"
      : selected
        ? "border-[#e8b86b]"
        : "border-[#3d2818]";

  const bgColor = isCorrect
    ? "bg-[#2a3a1f]"
    : isWrongPick
      ? "bg-[#3a1f1f]"
      : "bg-[#2a1d11]";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-col gap-2 border-2 ${borderColor} ${bgColor} p-3 text-left transition-colors disabled:cursor-not-allowed`}
    >
      <div className="flex items-center gap-2">
        <span className="text-xl">{info.icon}</span>
        <span className="text-sm tracking-widest text-[#e8b86b]">
          {info.name}
        </span>
      </div>
      <p className="text-[10px] leading-relaxed text-[#8a6a3d]">
        {info.description}
      </p>
    </button>
  );
}
