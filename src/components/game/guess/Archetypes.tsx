import type { NpcType } from "../../../types/game";
import ArchetypeCard from "./ArchetypeCard";
import { TYPE_ORDER, type GuessResult } from "./constants";

export default function Archetypes({
  selected,
  result,
  correctType,
  onSelect,
}: {
  selected: NpcType | null;
  result: GuessResult;
  correctType: NpcType;
  onSelect: (t: NpcType) => void;
}) {
  return (
    <section className="flex flex-1 flex-col rounded-md border-2 border-[#3d2818] bg-[#2a1d11] p-5">
      <p className="text-[10px] tracking-[0.4em] text-[#8a6a3d]">
        + CHOOSE THE ARCHETYPE +
      </p>
      <h2 className="mt-2 text-2xl text-[#e8b86b] md:text-3xl">
        이 상인은 어떤 유형인가?
      </h2>
      <p className="mt-2 text-xs text-[#a88a5a] md:text-sm">
        패턴을 읽고 네 명 중 하나를 지목하라. 정답{" "}
        <span className="text-[#8fbe70]">+5 🪙</span> · 오답{" "}
        <span className="text-[#e87560]">-3 ⭐</span>
      </p>

      <div className="mt-5 grid flex-1 grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
        {TYPE_ORDER.map((typeId) => (
          <ArchetypeCard
            key={typeId}
            typeId={typeId}
            selected={selected === typeId}
            disabled={result !== null}
            isCorrect={result !== null && typeId === correctType}
            isWrongPick={
              result === "wrong" &&
              typeId === selected &&
              typeId !== correctType
            }
            onClick={() => onSelect(typeId)}
          />
        ))}
      </div>
    </section>
  );
}
