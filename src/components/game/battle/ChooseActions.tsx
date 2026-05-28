import { CHOICE, type Choice } from "../../../types/game";

export default function ChooseActions({
  onChoose,
}: {
  onChoose: (c: Choice) => void;
}) {
  return (
    <div className="mt-4 flex gap-3">
      <button
        onClick={() => onChoose(CHOICE.COOPERATE)}
        className="flex flex-1 flex-col items-center justify-center gap-1 border-2 border-[#1a1108] bg-[#4a7a3a] py-4 transition-transform hover:bg-[#5c9050] active:translate-y-0.5 md:py-6"
      >
        <span className="text-lg tracking-widest text-[#f5e6c8] md:text-xl">
          협 력
        </span>
        <span className="text-[10px] tracking-[0.3em] text-[#c8e0b0]">
          COOPERATE
        </span>
      </button>
      <button
        onClick={() => onChoose(CHOICE.DEFECT)}
        className="flex flex-1 flex-col items-center justify-center gap-1 border-2 border-[#1a1108] bg-[#8a2a1a] py-4 transition-transform hover:bg-[#a83828] active:translate-y-0.5 md:py-6"
      >
        <span className="text-lg tracking-widest text-[#f5e6c8] md:text-xl">
          배 신
        </span>
        <span className="text-[10px] tracking-[0.3em] text-[#f0c0b0]">
          BETRAY
        </span>
      </button>
    </div>
  );
}
